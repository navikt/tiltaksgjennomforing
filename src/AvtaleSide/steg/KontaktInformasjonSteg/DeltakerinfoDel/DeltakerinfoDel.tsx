import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import BEMHelper from '@/utils/bem';
import { FunctionComponent, useContext } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';

const DeltakerinfoDel: FunctionComponent = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext = useContext(AvtaleContext);
    return (
        <div className={cls.element('container')}>
            <SkjemaTittel>Informasjon om deltakeren</SkjemaTittel>
            <div className={cls.element('rad')}>
                <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.deltakerFnr} />
            </div>
            <div className={cls.element('rad')}>
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
            </div>
            <div className={cls.element('rad')}>
                <MobilnummerInput
                    label="Mobilnummer"
                    name="deltakerTlf"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerTlf}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerTlf', verdi)}
                />
            </div>
        </div>
    );
};

export default DeltakerinfoDel;
