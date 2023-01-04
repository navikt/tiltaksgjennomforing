import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext } from 'react';

const DeltakerinfoDel: FunctionComponent = () => {
    const cls = BEMHelper('kontaktinfo');
    const avtaleContext = useContext(AvtaleContext);
    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Informasjon om deltakeren</SkjemaTittel>
                <div className={cls.element('rad', 'single')}>
                    <Input label="Fødselsnummer" value={avtaleContext.avtale.deltakerFnr} disabled={true} />
                </div>
                <VerticalSpacer rem={1} />

                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerFornavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerEtternavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerEtternavn', verdi)}
                    />
                </div>
                <VerticalSpacer rem={1} />
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.deltakerTlf}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('deltakerTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default DeltakerinfoDel;
