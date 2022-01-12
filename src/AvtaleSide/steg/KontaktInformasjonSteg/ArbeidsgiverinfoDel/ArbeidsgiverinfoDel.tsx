import {AvtaleContext} from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import {Input, SkjemaGruppe} from 'nav-frontend-skjema';
import React, {useContext} from 'react';


const ArbeidsgiverinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const {avtale, settAvtaleInnholdVerdi: settAvtaleVerdi} = useContext(AvtaleContext);
    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad')}>
                    <SkjemaTittel>Informasjon om arbeidsgiveren</SkjemaTittel>
                </div>
                <SkjemaGruppe title="Om bedriften" className={cls.element('skjemagruppe')}>
                    <div className={cls.element('rad')}>
                        <PakrevdInput
                            label="Bedriftens navn"
                            verdi={avtale.gjeldendeInnhold.bedriftNavn}
                            settVerdi={(verdi) => settAvtaleVerdi('bedriftNavn', verdi)}
                        />

                        <Input label="Bedriftsnummer" value={avtale.bedriftNr} disabled={true} />
                    </div>
                </SkjemaGruppe>
                <SkjemaGruppe title="Kontaktperson for avtalen" className={cls.element('skjemagruppe')}>
                    <div className={cls.element('rad')}>
                        <PakrevdInput
                            label="Arbeidsgiver sitt fornavn"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverFornavn}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                        />
                        <PakrevdInput
                            label="Arbeidsgiver sitt etternavn"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverEtternavn}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                        />
                    </div>

                    <div className={cls.element('rad')}>
                        <TelefonnummerInput
                            label="Arbeidsgiver sitt telefonnummer"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverTlf}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                        />
                    </div>
                </SkjemaGruppe>
            </div>
        </>
    );
};

export default ArbeidsgiverinfoDel;
