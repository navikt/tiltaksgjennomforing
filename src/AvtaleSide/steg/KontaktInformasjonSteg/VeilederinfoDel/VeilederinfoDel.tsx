import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const VeilederinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext = useContext(AvtaleContext);
    const { navn } = useContext(InnloggetBrukerContext);

    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Kontaktperson i NAV</SkjemaTittel>
                {navn && <SkjemaTittel>Veileder navn: {navn}</SkjemaTittel>}
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.veilederFornavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('veilederFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.veilederEtternavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('veilederEtternavn', verdi)}
                    />
                </div>
                <VerticalSpacer rem={1} />
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.veilederTlf}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('veilederTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default VeilederinfoDel;
