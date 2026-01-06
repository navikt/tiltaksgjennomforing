import React, { useContext, useEffect } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ValutaInput, { formaterValuta } from '@/komponenter/form/ValutaInput';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { storForbokstav } from '@/utils/stringUtils';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import { Alert, Heading, ReadMore, TextField } from '@navikt/ds-react';

const HOURS_PER_UNIT = Object.freeze({
    ÅRSLØNN: 1950,
    MÅNEDSLØNN: 1950 / 12,
    UKELØNN: 1950 / 52,
    DAGSLØNN: 1950 / 260,
    TIMELØNN: 1,
} as const);

type LonnType = keyof typeof HOURS_PER_UNIT;

const LONN_OPTIONS = (Object.keys(HOURS_PER_UNIT) as LonnType[]).map((unit) => ({
    label: storForbokstav(unit),
    value: unit,
}));

//  Timelønn som er 50% over det norske gjennomsnittet. Hentet fra SSB 2024
const TIMELONN_TERSKEL = 547.5;

const Timeloenn: React.FC = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const { mentorValgtLonnstype, mentorValgtLonnstypeBelop, stillingprosent, mentorTimelonn } =
        avtale.gjeldendeInnhold;

    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nyLonnstype = e.target.value as LonnType;
        const gammelLonnstype = mentorValgtLonnstype!;
        const gammeltBelop = mentorValgtLonnstypeBelop || 0;
        const nyttBelop = (gammeltBelop / HOURS_PER_UNIT[gammelLonnstype]) * HOURS_PER_UNIT[nyLonnstype];

        settOgKalkulerBeregningsverdier({
            mentorValgtLonnstype: nyLonnstype,
            mentorValgtLonnstypeBelop: Math.round(nyttBelop),
        });
    };

    useEffect(() => {
        if (!mentorValgtLonnstype) {
            settOgKalkulerBeregningsverdier({ mentorValgtLonnstype: 'ÅRSLØNN' });
        }
    }, []);

    const forHoyTimeLonn = (mentorTimelonn || 0) > TIMELONN_TERSKEL;

    return (
        <>
            <Row>
                <Column md="7">
                    <SelectInput
                        label="Lønn per arbeidsavtale"
                        name="mentorLonnsType"
                        options={LONN_OPTIONS}
                        value={mentorValgtLonnstype}
                        onChange={handleSelectedTypeChange}
                        children={''}
                    />
                </Column>
            </Row>
            <VerticalSpacer rem={1.5} />
            <Row>
                <Column md="7">
                    <ValutaInput
                        className="input"
                        name="mentorLonn"
                        label={'Mentors ' + (mentorValgtLonnstype || '').toLowerCase()}
                        autoComplete={'off'}
                        value={mentorValgtLonnstypeBelop}
                        onChange={(e) =>
                            settOgKalkulerBeregningsverdier({
                                mentorValgtLonnstypeBelop: Math.round(parseFloat(e.target.value)),
                            })
                        }
                        min={0}
                    />
                </Column>
                {mentorValgtLonnstype !== 'TIMELØNN' && (
                    <Column md="5">
                        <StillingsprosentInput
                            label="Stillingsprosent"
                            verdi={stillingprosent}
                            settVerdi={(e) => settOgKalkulerBeregningsverdier({ stillingprosent: e })}
                        />
                    </Column>
                )}
            </Row>
            <VerticalSpacer rem={1.5} />
            {mentorValgtLonnstype !== 'TIMELØNN' && (
                <Row>
                    <Column md="7">
                        <TextField value={formaterValuta(mentorTimelonn)} label="Beregnet timelønn" readOnly />
                    </Column>
                </Row>
            )}
            <VerticalSpacer rem={0.5} />
            {forHoyTimeLonn && (
                <Alert variant="warning" size="small">
                    <Heading size="xsmall">Kontroller at oppgitt timelønn er korrekt.</Heading>
                    Timelønnen er mer enn 50% over det norske gjennomsnittet. (2024)
                </Alert>
            )}
            <div>
                <ReadMore header={'Slik beregnes timelønn'} size={'small'}>
                    <TimeloennHjelpetekst />
                </ReadMore>
            </div>
            <VerticalSpacer rem={2} />
        </>
    );
};
export default Timeloenn;
