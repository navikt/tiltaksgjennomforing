import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import './KontaktinformasjonSteg.less';

const KontaktinformasjonSeksjon = (props: AvtaleProps) => {
    const deltakerInformasjon = (
        <SkjemaGruppe title="Informasjon om deltaker">
            <div className="kontaktinformasjon__deltakernavn">
                <Input
                    className="kontaktinformasjon__deltakernavn__fornavn"
                    label="Fornavn"
                    defaultValue={props.form.deltakerFornavn}
                    onChange={event =>
                        props.endreVerdi('deltakerFornavn', event.target.value)
                    }
                />
                <Input
                    className="kontaktinformasjon__deltakernavn__etternavn"
                    label="Etternavn"
                    defaultValue={props.form.deltakerEtternavn}
                    onChange={event =>
                        props.endreVerdi(
                            'deltakerEtternavn',
                            event.target.value
                        )
                    }
                />
            </div>
            <Input
                className="kontaktinformasjon__adresse"
                label="Adresse"
                defaultValue={props.form.deltakerAdresse}
                onChange={event =>
                    props.endreVerdi('deltakerAdresse', event.target.value)
                }
            />
            <div className="kontaktinformasjon__postwrapper">
                <Input
                    className="kontaktinformasjon__postwrapper__postnummer"
                    label="Postnummer"
                    defaultValue={props.form.deltakerPostnummer}
                    onChange={event =>
                        props.endreVerdi(
                            'deltakerPostnummer',
                            event.target.value
                        )
                    }
                />
                <Input
                    className="kontaktinformasjon__postwrapper__poststed"
                    label="Poststed"
                    defaultValue={props.form.deltakerPoststed}
                    onChange={event =>
                        props.endreVerdi('deltakerPoststed', event.target.value)
                    }
                />
            </div>
        </SkjemaGruppe>
    );

    return <div className="kontaktinformasjon">{deltakerInformasjon}</div>;
};

export default KontaktinformasjonSeksjon;
