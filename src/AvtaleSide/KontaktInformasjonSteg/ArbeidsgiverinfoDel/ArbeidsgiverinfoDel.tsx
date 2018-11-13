import * as React from 'react';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { EndreAvtale } from '../../EndreAvtale';
import { Arbeidsgiverinfo, Bedriftinfo } from '../../avtale';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';

const ArbeidsgiverinfoDel = (
    props: Bedriftinfo & Arbeidsgiverinfo & EndreAvtale
) => {
    const onChange = (label: string) => {
        return (event: any) => props.endreVerdi(label, event.target.value);
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <Input
                className="bedriftinfo__navn"
                label="Bedriftens navn"
                defaultValue={props.bedriftNavn}
                onChange={onChange('bedriftNavn')}
            />
            <Input
                className="bedriftinfo__adresse"
                label="Adresse"
                defaultValue={props.bedriftAdresse}
                onChange={onChange('bedriftAdresse')}
            />
            <div className="bedriftinfo__postwrapper">
                <Input
                    className="bedriftinfo__postwrapper__postnummer"
                    label="Postnummer"
                    defaultValue={props.bedriftPostnummer}
                    onChange={onChange('bedriftPostnummer')}
                />
                <Input
                    className="bedriftinfo__postwrapper__poststed"
                    label="Poststed"
                    defaultValue={props.bedriftPoststed}
                    onChange={onChange('bedriftPoststed')}
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
                    defaultValue={props.arbeidsgiverFornavn}
                    onChange={onChange('arbeidsgiverFornavn')}
                />
                <Input
                    className="arbeidsgiverkontaktpersonrad__etternavn"
                    label="Etternavn"
                    defaultValue={props.arbeidsgiverEtternavn}
                    onChange={onChange('arbeidsgiverEtternavn')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <Input
                    className="arbeidsgiverkontaktpersonrad__epost"
                    label="Epost"
                    defaultValue={props.arbeidsgiverEpost}
                    onChange={onChange('arbeidsgiverEpost')}
                />
                <Input
                    className="arbeidsgiverkontaktpersonrad__tlf"
                    label="Telefonnummer"
                    defaultValue={props.arbeidsgiverTlf}
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
export default ArbeidsgiverinfoDel;
