import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { EndreAvtale } from '../../EndreAvtale';
import { Deltakerinfo } from '../../avtale';
import './DeltakerinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { medContext } from '../../avtaleContext';

const DeltakerinfoDel = (props: Deltakerinfo & EndreAvtale) => (
    <>
        <Systemtittel className="deltakerinfo__tittel">
            Informasjon om deltaker
        </Systemtittel>
        <div className="deltakerinfo__deltakernavn">
            <Input
                className="deltakerinfo__deltakernavn__fornavn"
                label="Fornavn"
                defaultValue={props.deltakerFornavn}
                onChange={event =>
                    props.endreVerdi('deltakerFornavn', event.target.value)
                }
            />
            <Input
                className="deltakerinfo__deltakernavn__etternavn"
                label="Etternavn"
                defaultValue={props.deltakerEtternavn}
                onChange={event =>
                    props.endreVerdi('deltakerEtternavn', event.target.value)
                }
            />
        </div>
        <Input
            className="deltakerinfo__adresse"
            label="Adresse"
            defaultValue={props.deltakerAdresse}
            onChange={event =>
                props.endreVerdi('deltakerAdresse', event.target.value)
            }
        />
        <div className="deltakerinfo__postwrapper">
            <Input
                className="deltakerinfo__postwrapper__postnummer"
                label="Postnummer"
                defaultValue={props.deltakerPostnummer}
                onChange={event =>
                    props.endreVerdi('deltakerPostnummer', event.target.value)
                }
            />
            <Input
                className="deltakerinfo__postwrapper__poststed"
                label="Poststed"
                defaultValue={props.deltakerPoststed}
                onChange={event =>
                    props.endreVerdi('deltakerPoststed', event.target.value)
                }
            />
        </div>
    </>
);

export default medContext(DeltakerinfoDel);
