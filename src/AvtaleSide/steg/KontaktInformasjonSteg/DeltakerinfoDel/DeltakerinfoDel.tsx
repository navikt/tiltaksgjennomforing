import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtaleparter, Deltakerinfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext } from 'react';

const DeltakerinfoDel: FunctionComponent = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext: InputStegProps<Deltakerinfo & Avtaleparter> = useContext(AvtaleContext);
    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Informasjon om deltakeren</SkjemaTittel>
                <div className={cls.element('rad', 'single')}>
                    <Input label="Fødselsnummer" value={avtaleContext.avtale.deltakerFnr} disabled={true} />
                </div>

                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Deltaker sitt fornavn"
                        verdi={avtaleContext.avtale.deltakerFornavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Deltaker sitt etternavn"
                        verdi={avtaleContext.avtale.deltakerEtternavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerEtternavn', verdi)}
                    />
                </div>

                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Deltaker sitt telefonnummer"
                        verdi={avtaleContext.avtale.deltakerTlf}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default DeltakerinfoDel;
