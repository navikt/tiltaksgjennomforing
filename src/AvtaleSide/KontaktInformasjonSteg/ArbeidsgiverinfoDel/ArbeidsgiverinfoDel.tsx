import * as _ from 'lodash';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '../../../komponenter/TelefonnummerInput/TelefonnummerInput';
import './ArbeidsgiverinfoDel.less';

const ArbeidsgiverinfoDel = (props: Context) => (
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
                    settVerdi={_.partial(props.settAvtaleVerdi, 'bedriftNavn')}
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
                    settVerdi={_.partial(
                        props.settAvtaleVerdi,
                        'arbeidsgiverFornavn'
                    )}
                />
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.arbeidsgiverEtternavn}
                    settVerdi={_.partial(
                        props.settAvtaleVerdi,
                        'arbeidsgiverEtternavn'
                    )}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <TelefonnummerInput
                    className="arbeidsgiverkontaktpersonrad__tlf"
                    label="Telefonnummer"
                    verdi={props.avtale.arbeidsgiverTlf}
                    settVerdi={_.partial(
                        props.settAvtaleVerdi,
                        'arbeidsgiverTlf'
                    )}
                />
            </div>
        </SkjemaGruppe>
    </>
);

export default medContext<{}>(ArbeidsgiverinfoDel);
