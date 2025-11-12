import React, { useContext, useEffect } from 'react';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ValutaInput from '@/komponenter/form/ValutaInput';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { storForbokstav } from '@/utils/stringUtils';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import { Alert, Heading, ReadMore } from '@navikt/ds-react';

interface Props {
    cls: BEMWrapper;
}

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

const Timeloenn: React.FC<Props> = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nyLonnstype = e.target.value as LonnType;
        const gammelLonnstype = avtale.gjeldendeInnhold.mentorValgtLonnstype!;
        const gammeltBelop = avtale.gjeldendeInnhold.mentorValgtLonnstypeBelop || 0;
        const nyttBelop = (gammeltBelop / HOURS_PER_UNIT[gammelLonnstype]) * HOURS_PER_UNIT[nyLonnstype];

        settOgKalkulerBeregningsverdier({
            mentorValgtLonnstype: nyLonnstype,
            mentorValgtLonnstypeBelop: Math.round(nyttBelop),
        });
    };

    useEffect(() => {
        if (!avtale.gjeldendeInnhold.mentorValgtLonnstype) {
            settOgKalkulerBeregningsverdier({ mentorValgtLonnstype: 'ÅRSLØNN' });
        }
    }, []);

    return (
        <>
            <Row>
                <Column md="7">
                    <SelectInput
                        label="Lønn per arbeidsavtale"
                        name="mentorLonnsType"
                        options={LONN_OPTIONS}
                        value={avtale.gjeldendeInnhold.mentorValgtLonnstype}
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
                        label={'Mentors ' + (avtale.gjeldendeInnhold.mentorValgtLonnstype || '').toLowerCase()}
                        autoComplete={'off'}
                        value={avtale.gjeldendeInnhold.mentorValgtLonnstypeBelop}
                        onChange={(e) =>
                            settOgKalkulerBeregningsverdier({
                                mentorValgtLonnstypeBelop: Math.round(parseFloat(e.target.value)),
                            })
                        }
                        min={0}
                    />
                </Column>
                {avtale.gjeldendeInnhold.mentorValgtLonnstype !== 'TIMELØNN' && (
                    <Column md="5">
                        <StillingsprosentInput
                            label="Stillingsprosent"
                            verdi={avtale.gjeldendeInnhold.stillingprosent}
                            settVerdi={(e) => settOgKalkulerBeregningsverdier({ stillingprosent: e })}
                        />
                    </Column>
                )}
            </Row>
            <VerticalSpacer rem={1.5} />
            {avtale.gjeldendeInnhold.mentorValgtLonnstype !== 'TIMELØNN' && (
                <Row>
                    <Column md="7">
                        <ValutaInput
                            value={avtale.gjeldendeInnhold.mentorTimelonn}
                            label="Beregnet timelønn"
                            readOnly
                        />
                    </Column>
                </Row>
            )}
            <VerticalSpacer rem={0.5} />
            {avtale.gjeldendeInnhold.mentorTimelonn > 750 && (
                <Alert variant="warning">
                    <Heading spacing size="small" level="3">
                        Viktig informasjon
                    </Heading>
                    Hvis du er Det finnes allerede registrerte tiltak for denne deltakeren:
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
