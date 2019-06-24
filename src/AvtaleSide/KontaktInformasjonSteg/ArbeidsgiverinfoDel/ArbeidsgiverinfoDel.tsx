import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '../../../komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtale } from '../../avtale';
import './ArbeidsgiverinfoDel.less';

const ArbeidsgiverinfoDel = (props: Context) => {
    const settAvtaleVerdi = (felt: keyof Avtale) => {
        return (verdi: string) => props.settAvtaleVerdi(felt, verdi);
    };

    return (
        <>
            <Systemtittel className="arbeidsgiver-tittel">
                Informasjon om arbeidsgiver
            </Systemtittel>

            <SkjemaGruppe title="Om bedriften">
                <div className="arbeidsgiverbedriftrad">
                    <PakrevdInput
                        className="arbeidsgiverbedriftrad__fornavn"
                        label="Bedriftens navn"
                        verdi={props.avtale.bedriftNavn}
                        settVerdi={settAvtaleVerdi('bedriftNavn')}
                    />
                    <Input
                        className="arbeidsgiverbedriftrad__bedriftnr"
                        label="Bedriftsnummer"
                        value={props.avtale.bedriftNr}
                        disabled={true}
                    />
                </div>
            </SkjemaGruppe>

            <SkjemaGruppe title="Kontaktperson for avtalen">
                <div className="arbeidsgiverkontaktpersonrad">
                    <PakrevdInput
                        className="arbeidsgiverkontaktpersonrad__fornavn"
                        label="Fornavn"
                        verdi={props.avtale.arbeidsgiverFornavn}
                        settVerdi={settAvtaleVerdi('arbeidsgiverFornavn')}
                    />
                    <PakrevdInput
                        className="arbeidsgiverkontaktpersonrad__etternavn"
                        label="Etternavn"
                        verdi={props.avtale.arbeidsgiverEtternavn}
                        settVerdi={settAvtaleVerdi('arbeidsgiverEtternavn')}
                    />
                </div>
                <div className="arbeidsgiverkontaktpersonrad">
                    <TelefonnummerInput
                        className="arbeidsgiverkontaktpersonrad__tlf"
                        label="Telefonnummer"
                        verdi={props.avtale.arbeidsgiverTlf}
                        settVerdi={settAvtaleVerdi('arbeidsgiverTlf')}
                    />
                </div>
            </SkjemaGruppe>
        </>
    );
};

export default medContext<{}>(ArbeidsgiverinfoDel);
