import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Fieldset, TextField } from '@navikt/ds-react';

import React, { useContext } from 'react';

const ArbeidsgiverinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleInnholdVerdi: settAvtaleVerdi } = useContext(AvtaleContext);
    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad')}>
                    <SkjemaTittel>Informasjon om arbeidsgiveren</SkjemaTittel>
                </div>
                <Fieldset
                    legend="Informasjon om bedriften"
                    title="Om bedriften"
                    className={cls.element('skjemagruppe')}
                >
                    <div className={cls.element('rad')}>
                        <PakrevdInput
                            label="Bedriftens navn"
                            verdi={avtale.gjeldendeInnhold.bedriftNavn}
                            settVerdi={(verdi) => settAvtaleVerdi('bedriftNavn', verdi)}
                        />

                        <TextField label="Virksomhetsnummer" value={avtale.bedriftNr} disabled={true} />
                    </div>
                </Fieldset>
                <Fieldset
                    legend="Informasjon om kontaktperson"
                    title="Kontaktperson for avtalen"
                    className={cls.element('skjemagruppe')}
                >
                    <div className={cls.element('rad')}>
                        <PakrevdInput
                            label="Fornavn"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverFornavn}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                        />
                        <PakrevdInput
                            label="Etternavn"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverEtternavn}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                        />
                    </div>

                    <div className={cls.element('rad')}>
                        <TelefonnummerInput
                            label="Mobilnummer"
                            verdi={avtale.gjeldendeInnhold.arbeidsgiverTlf}
                            settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                        />
                    </div>
                </Fieldset>
            </div>
        </>
    );
};

export default ArbeidsgiverinfoDel;
