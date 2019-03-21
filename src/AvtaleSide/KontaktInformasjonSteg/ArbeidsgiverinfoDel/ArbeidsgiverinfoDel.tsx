import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import { validerOrgnr } from '../../../utils/orgnrUtils';
import { useState } from 'react';

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const [feil, setFeil] = useState<string | undefined>(undefined);

    const orgnrOnChange = (label: string) => {
        return (event: any) => {
            if (
                event.target.value &&
                !validerOrgnr(event.target.value.replace(/\s/g, ''))
            ) {
                setFeil('Ugyldig bedriftsnummer');
            } else {
                setFeil(undefined);
            }
            props.settAvtaleVerdi(label, event.target.value);
        };
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <div className="arbeidsgiverbedriftrad">
                <PakrevdInput
                    className="arbeidsgiverbedriftrad__fornavn"
                    label="Bedriftens navn"
                    verdi={props.avtale.bedriftNavn}
                    onChange={onChange('bedriftNavn')}
                />

                <PakrevdInput
                    className="arbeidsgiverbedriftrad__bedriftnr"
                    label="Bedriftsnummer"
                    verdi={props.avtale.bedriftNr}
                    onChange={orgnrOnChange('bedriftNr')}
                    feilmelding={feil}
                    ekstraValidering={true}
                />
            </div>
        </SkjemaGruppe>
    );

    const arbeidsgiverInfo = (
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <div className="arbeidsgiverkontaktpersonrad">
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__fornavn"
                    label="Fornavn"
                    verdi={props.avtale.arbeidsgiverFornavn}
                    onChange={onChange('arbeidsgiverFornavn')}
                />
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.arbeidsgiverEtternavn}
                    onChange={onChange('arbeidsgiverEtternavn')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__tlf"
                    label="Telefonnummer"
                    verdi={props.avtale.arbeidsgiverTlf}
                    onChange={onChange('arbeidsgiverTlf')}
                />
            </div>
        </SkjemaGruppe>
    );

    return (
        <>
            <Systemtittel className="arbeidsgiver-tittel">
                Informasjon om arbeidsgiver
            </Systemtittel>
            {bedriftInfo}
            {arbeidsgiverInfo}
        </>
    );
};

export default medContext<{}>(ArbeidsgiverinfoDel);
