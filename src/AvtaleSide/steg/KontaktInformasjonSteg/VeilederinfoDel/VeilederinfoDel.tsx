import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Veilederinfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { useContext } from 'react';

const VeilederinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext: InputStegProps<Veilederinfo> = useContext(AvtaleContext);

    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Kontaktperson i NAV</SkjemaTittel>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Veileder sitt fornavn"
                        verdi={avtaleContext.avtale.veilederFornavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Veileder sitt etternavn"
                        verdi={avtaleContext.avtale.veilederEtternavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederEtternavn', verdi)}
                    />
                </div>
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Veileder sitt telefonnummer"
                        verdi={avtaleContext.avtale.veilederTlf}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default VeilederinfoDel;
