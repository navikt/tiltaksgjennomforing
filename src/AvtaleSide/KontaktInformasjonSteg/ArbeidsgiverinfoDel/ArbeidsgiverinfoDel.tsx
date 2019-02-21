import * as React from 'react';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <PakrevdInput
                className="bedriftinfo__navn"
                label="Bedriftens navn"
                verdi={props.avtale.bedriftNavn}
                onChange={onChange('bedriftNavn')}
            />
            <div className="bedriftinfo__orgwrapper">
                <PakrevdInput
                    className="bedriftinfo__orgwrapper__orgnr"
                    label="Organisasjonsnummer"
                    verdi={props.avtale.orgNr}
                    onChange={onChange('orgNr')}
                />
                <PakrevdInput
                    className="bedriftinfo__orgwrapper__bedriftnr"
                    label="Bedriftsnummer"
                    verdi={props.avtale.bedriftNr}
                    onChange={onChange('bedriftNr')}
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
