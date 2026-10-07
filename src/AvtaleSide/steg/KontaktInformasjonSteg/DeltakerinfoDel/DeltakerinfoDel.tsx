import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent, useContext } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import { HGrid } from '@navikt/ds-react';
import grid from '@/komponenter/layout/Grid.module.less';

const DeltakerinfoDel: FunctionComponent = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext = useContext(AvtaleContext);
    return (
        <div className={cls.element('container')}>
            <SkjemaTittel>Informasjon om deltakeren</SkjemaTittel>
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
        </div>
    );
};

export default DeltakerinfoDel;
