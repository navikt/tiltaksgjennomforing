import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtaleparter, Deltakerinfo } from '@/types/avtale';
import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import BEMHelper from '@/utils/bem';

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
                        label="Fornavn"
                        verdi={avtaleContext.avtale.deltakerFornavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.deltakerEtternavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerEtternavn', verdi)}
                    />
                </div>

                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Telefonnummer"
                        verdi={avtaleContext.avtale.deltakerTlf}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default DeltakerinfoDel;
