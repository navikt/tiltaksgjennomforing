import { AvtaleContext } from '@/AvtaleProvider';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import { FunctionComponent, useContext } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import { Fieldset, Heading, HGrid } from '@navikt/ds-react';
import grid from '@/komponenter/layout/Grid.module.less';
import styles from '../kontaktinfo.module.less';

const DeltakerinfoDel: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    return (
        <Fieldset
            className={styles.container}
            legend={
                <Heading level="2" size="medium">
                    Informasjon om deltakeren
                </Heading>
            }
        >
            <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                <VisueltDisabledInputFelt
                    label="Fødselsnummer"
                    tekst={avtaleContext.avtale.deltakerFnr}
                    htmlSize={13}
                    className={grid.helRad}
                />
                <PakrevdInput
                    name="deltakerFornavn"
                    label="Fornavn"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerFornavn}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerFornavn', verdi)}
                />
                <PakrevdInput
                    name="deltakerEtternavn"
                    label="Etternavn"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerEtternavn}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerEtternavn', verdi)}
                />
                <MobilnummerInput
                    label="Mobilnummer"
                    name="deltakerTlf"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerTlf}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerTlf', verdi)}
                />
            </HGrid>
        </Fieldset>
    );
};

export default DeltakerinfoDel;
