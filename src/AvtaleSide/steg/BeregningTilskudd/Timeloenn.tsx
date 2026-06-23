import React from 'react';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formaterValuta } from '@/komponenter/form/ValutaInput';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';
import { storForbokstav } from '@/utils/stringUtils';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import { Alert, Heading, HGrid, ReadMore, TextField, VStack } from '@navikt/ds-react';
import KronerInput from '@/AvtaleSide/steg/BeregningTilskudd/KronerInput';
import styles from './Timeloenn.module.less';

type TimeloennProps = {
    stillingsprosent: number | undefined;
    mentorValgtLonnstype: LonnType;
    mentorValgtLonnstypeBelop: number | undefined;
    mentorTimelonn: number | undefined;
    onChange: (value: {
        stillingprosent?: number;
        mentorValgtLonnstype?: LonnType;
        mentorValgtLonnstypeBelop?: number;
    }) => void;
};

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

const Timeloenn: React.FC<TimeloennProps> = ({
    stillingsprosent,
    mentorValgtLonnstype,
    mentorValgtLonnstypeBelop,
    mentorTimelonn,
    onChange,
}) => {
    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nyLonnstype = e.target.value as LonnType;

        const gammelLonnstype = mentorValgtLonnstype;
        const gammeltBelop = mentorValgtLonnstypeBelop ?? 0;
        const nyttBelop = (gammeltBelop / HOURS_PER_UNIT[gammelLonnstype]) * HOURS_PER_UNIT[nyLonnstype];

        onChange({
            mentorValgtLonnstype: nyLonnstype,
            mentorValgtLonnstypeBelop: Math.round(nyttBelop),
        });
    };

    const forHoyTimeLonn = (mentorTimelonn || 0) > TIMELONN_TERSKEL;

    return (
        <VStack gap="space-16">
            <SelectInput
                label="Lønn per arbeidsavtale"
                className={styles.limitMaxWidth}
                name="mentorLonnsType"
                options={LONN_OPTIONS}
                value={mentorValgtLonnstype}
                onChange={handleSelectedTypeChange}
                children={''}
            />
            <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                <KronerInput
                    label={'Mentors ' + (mentorValgtLonnstype || '').toLowerCase()}
                    verdi={mentorValgtLonnstypeBelop}
                    settVerdi={(nyVerdi) => onChange({ mentorValgtLonnstypeBelop: nyVerdi })}
                />
                {mentorValgtLonnstype !== 'TIMELØNN' && (
                    <>
                        <StillingsprosentInput
                            label="Stillingsprosent"
                            verdi={stillingsprosent}
                            settVerdi={(nyVerdi) => onChange({ stillingprosent: nyVerdi })}
                        />
                    </>
                )}
            </HGrid>
            {mentorValgtLonnstype !== 'TIMELØNN' && (
                <>
                    <TextField
                        className={styles.limitMaxWidth}
                        value={formaterValuta(mentorTimelonn)}
                        label="Beregnet timelønn"
                        readOnly
                    />
                </>
            )}
            {forHoyTimeLonn && (
                <>
                    <Alert variant="warning" size="small">
                        <Heading size="xsmall">Kontroller at oppgitt timelønn er korrekt.</Heading>
                        Timelønnen er mer enn 50% over det norske gjennomsnittet. (2024)
                    </Alert>
                </>
            )}
            <ReadMore header={'Slik beregnes timelønn'} size={'small'}>
                <TimeloennHjelpetekst />
            </ReadMore>
            <VerticalSpacer rem={1} />
        </VStack>
    );
};
export default Timeloenn;
