import { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import { Fieldset } from '@navikt/ds-react';

const ArbeidsgiverinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleInnholdVerdi: settAvtaleVerdi } = useContext(AvtaleContext);

    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Informasjon om arbeidsgiveren</SkjemaTittel>
                <Fieldset legend="" title="Om bedriften" className={cls.element('skjemagruppe')}>
                    <div className={cls.element('rad')}>
                        <VisueltDisabledInputFelt label="Bedriftens navn" tekst={avtale.gjeldendeInnhold.bedriftNavn} />
                        <VisueltDisabledInputFelt label="Virksomhetsnummer" tekst={avtale.bedriftNr} />
                    </div>
                </Fieldset>
                <Fieldset legend="" title="Kontaktperson for avtalen" className={cls.element('skjemagruppe')}>
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
