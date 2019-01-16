import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import LaasbartInput from '../../../komponenter/LaasbartInput/LaasbartInput';

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <LaasbartInput
                className="bedriftinfo__navn"
                label="Bedriftens navn"
                verdi={props.avtale.bedriftNavn}
                onChange={onChange('bedriftNavn')}
            />
            <LaasbartInput
                className="bedriftinfo__adresse"
                label="Adresse"
                verdi={props.avtale.bedriftAdresse}
                onChange={onChange('bedriftAdresse')}
            />
            <div className="bedriftinfo__postwrapper">
                <LaasbartInput
                    className="bedriftinfo__postwrapper__postnummer"
                    label="Postnummer"
                    verdi={props.avtale.bedriftPostnummer}
                    onChange={onChange('bedriftPostnummer')}
                />
                <LaasbartInput
                    className="bedriftinfo__postwrapper__poststed"
                    label="Poststed"
                    verdi={props.avtale.bedriftPoststed}
                    onChange={onChange('bedriftPoststed')}
                />
            </div>
        </SkjemaGruppe>
    );

    const arbeidsgiverInfo = (
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <div className="arbeidsgiverkontaktpersonrad">
                <LaasbartInput
                    className="arbeidsgiverkontaktpersonrad__fnr"
                    label="Fødselsnummer"
                    verdi={props.avtale.arbeidsgiverFnr}
                    onChange={onChange('arbeidsgiverFnr')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <LaasbartInput
                    className="arbeidsgiverkontaktpersonrad__epost"
                    label="Epost"
                    verdi={props.avtale.arbeidsgiverEpost}
                    onChange={onChange('arbeidsgiverEpost')}
                />
                <LaasbartInput
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
