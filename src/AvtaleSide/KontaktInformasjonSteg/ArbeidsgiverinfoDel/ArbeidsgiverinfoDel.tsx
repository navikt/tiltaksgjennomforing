import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import { validerOrgnr } from '../../../utils/orgnrUtils';
import { useState } from 'react';
import { Avtale } from '../../avtale';

const telefonnummerRegex = /^\+?\d{0,}$/;

export const validereTelefonNrOnchange = (
    label: keyof Avtale,
    settAvtaleFelt: (label: keyof Avtale, data: any) => void
) => (event: any) => {
    if (telefonnummerRegex.test(event.target.value)) {
        settAvtaleFelt(label, event.target.value);
    }
};

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: keyof Avtale) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const [feilmelding, setFeilmelding] = useState<string | undefined>(
        undefined
    );

    const validereOrganisasjonsNrOnchange = (label: keyof Avtale) => {
        return (event: any) => {
            if (
                event.target.value &&
                !validerOrgnr(event.target.value.replace(/\s/g, ''))
            ) {
                setFeilmelding('Ugyldig bedriftsnummer');
            } else {
                setFeilmelding(undefined);
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
                    onChange={validereOrganisasjonsNrOnchange('bedriftNr')}
                    feilmelding={feilmelding}
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
                    onChange={validereTelefonNrOnchange(
                        'arbeidsgiverTlf',
                        props.settAvtaleVerdi
                    )}
                    inputType="tel"
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
