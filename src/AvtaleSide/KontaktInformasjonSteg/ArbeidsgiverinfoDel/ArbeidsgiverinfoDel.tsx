import * as React from 'react';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <Input
                className="bedriftinfo__navn"
                label="Bedriftens navn"
                defaultValue={props.avtale.bedriftNavn}
                onChange={onChange('bedriftNavn')}
            />
            <div className="bedriftinfo__orgwrapper">
                <Input
                    className="bedriftinfo__orgwrapper__orgnr"
                    label="Organisasjonsnummer"
                    defaultValue={props.avtale.orgNr}
                    onChange={onChange('orgNr')}
                />
                <Input
                    className="bedriftinfo__orgwrapper__bedriftnr"
                    label="Bedriftsnummer"
                    defaultValue={props.avtale.bedriftNr}
                    onChange={onChange('bedriftNr')}
                />
            </div>
        </SkjemaGruppe>
    );

    const arbeidsgiverInfo = (
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <div className="arbeidsgiverkontaktpersonrad">
                <Input
                    className="arbeidsgiverkontaktpersonrad__fornavn"
                    label="Fornavn"
                    defaultValue={props.avtale.arbeidsgiverFornavn}
                    onChange={onChange('arbeidsgiverFornavn')}
                />
                <Input
                    className="arbeidsgiverkontaktpersonrad__etternavn"
                    label="Etternavn"
                    defaultValue={props.avtale.arbeidsgiverEtternavn}
                    onChange={onChange('arbeidsgiverEtternavn')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <Input
                    className="arbeidsgiverkontaktpersonrad__tlf"
                    label="Telefonnummer"
                    defaultValue={props.avtale.arbeidsgiverTlf}
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
