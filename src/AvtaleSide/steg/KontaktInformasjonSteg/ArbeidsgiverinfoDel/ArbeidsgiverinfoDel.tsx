import { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import styles from '../kontaktinfo.module.less';
import { Fieldset, Heading, HGrid, VStack } from '@navikt/ds-react';

const ArbeidsgiverinfoDel = () => {
    const { avtale, settAvtaleInnholdVerdi: settAvtaleVerdi } = useContext(AvtaleContext);

    return (
        <Fieldset
            className={styles.container}
            legend={
                <Heading level="2" size="medium">
                    Informasjon om arbeidsgiveren
                </Heading>
            }
        >
            <VStack gap="space-24">
                <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                    <VisueltDisabledInputFelt label="Bedriftens navn" tekst={avtale.gjeldendeInnhold.bedriftNavn} />
                    <VisueltDisabledInputFelt label="Virksomhetsnummer" tekst={avtale.bedriftNr} htmlSize={13} />
                </HGrid>
                <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                    <PakrevdInput
                        name="arbeidsgiverFornavn"
                        label="Fornavn"
                        verdi={avtale.gjeldendeInnhold.arbeidsgiverFornavn}
                        settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                    />
                    <PakrevdInput
                        name="arbeidsgiverEtternavn"
                        label="Etternavn"
                        verdi={avtale.gjeldendeInnhold.arbeidsgiverEtternavn}
                        settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                    />
                    <MobilnummerInput
                        label="Mobilnummer"
                        name="arbeidsgiverTlf"
                        verdi={avtale.gjeldendeInnhold.arbeidsgiverTlf}
                        settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                    />
                </HGrid>
            </VStack>
        </Fieldset>
    );
};

export default ArbeidsgiverinfoDel;
