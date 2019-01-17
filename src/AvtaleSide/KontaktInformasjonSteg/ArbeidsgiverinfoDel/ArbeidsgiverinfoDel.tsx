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
            <Input
                className="bedriftinfo__adresse"
                label="Adresse"
                defaultValue={props.avtale.bedriftAdresse}
                onChange={onChange('bedriftAdresse')}
            />
            <div className="bedriftinfo__postwrapper">
                <Input
                    className="bedriftinfo__postwrapper__postnummer"
                    label="Postnummer"
                    defaultValue={props.avtale.bedriftPostnummer}
                    onChange={onChange('bedriftPostnummer')}
                />
                <Input
                    className="bedriftinfo__postwrapper__poststed"
                    label="Poststed"
                    defaultValue={props.avtale.bedriftPoststed}
                    onChange={onChange('bedriftPoststed')}
                />
            </div>
        </SkjemaGruppe>
    );

    const arbeidsgiverInfo = (
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <div className="arbeidsgiverkontaktpersonrad">
                <Input
                    className="arbeidsgiverkontaktpersonrad__fnr"
                    label="Fødselsnummer"
                    defaultValue={props.avtale.arbeidsgiverFnr}
                    onChange={onChange('arbeidsgiverFnr')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <Input
                    className="arbeidsgiverkontaktpersonrad__epost"
                    label="Epost"
                    defaultValue={props.avtale.arbeidsgiverEpost}
                    onChange={onChange('arbeidsgiverEpost')}
                />
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
