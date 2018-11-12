import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';

const KontaktinformasjonSeksjon = (props: AvtaleProps) => {
    const deltakerInformasjon = (
        <SkjemaGruppe title={'Informasjon om deltaker'}>
            <Input
                label="Fornavn"
                defaultValue={props.form.deltakerFornavn}
                onChange={event =>
                    props.endreVerdi('deltakerFornavn', event.target.value)
                }
            />
            <Input
                label="Etternavn"
                defaultValue={props.form.deltakerEtternavn}
                onChange={event =>
                    props.endreVerdi('deltakerEtternavn', event.target.value)
                }
            />
            <Input
                label="Adresse"
                defaultValue={props.form.deltakerAdresse}
                onChange={event =>
                    props.endreVerdi('deltakerAdresse', event.target.value)
                }
            />
            <Input
                label="Postnummer"
                defaultValue={props.form.deltakerPostnummer}
                onChange={event =>
                    props.endreVerdi('deltakerPostnummer', event.target.value)
                }
            />
            <Input
                label="Poststed"
                defaultValue={props.form.deltakerPoststed}
                onChange={event =>
                    props.endreVerdi('deltakerPoststed', event.target.value)
                }
            />
        </SkjemaGruppe>
    );

    return <>{deltakerInformasjon}</>;
};

export default KontaktinformasjonSeksjon;
