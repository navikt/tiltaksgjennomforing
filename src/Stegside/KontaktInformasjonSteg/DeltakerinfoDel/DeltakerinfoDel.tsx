import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import './DeltakerinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { medContext } from '../../AvtaleContext';
import { Context } from '../../AvtaleContext';

const DeltakerinfoDel = (props: Context) => {
    return (
        <>
            <Systemtittel className="deltakerinfo__tittel">
                Informasjon om deltaker
            </Systemtittel>
            <Input
                className="deltakerinfo__fnr"
                label="Fødselsnummer"
                value={props.avtale.deltakerFnr}
                disabled={true}
            />
            <div className="deltakerinfo__deltakernavn">
                <Input
                    className="deltakerinfo__deltakernavn__fornavn"
                    label="Fornavn"
                    defaultValue={props.avtale.deltakerFornavn}
                    onChange={event => {
                        props.settAvtaleVerdi(
                            'deltakerFornavn',
                            event.target.value
                        );
                    }}
                />
                <Input
                    className="deltakerinfo__deltakernavn__etternavn"
                    label="Etternavn"
                    defaultValue={props.avtale.deltakerEtternavn}
                    onChange={event =>
                        props.settAvtaleVerdi(
                            'deltakerEtternavn',
                            event.target.value
                        )
                    }
                />
            </div>
            <Input
                className="deltakerinfo__adresse"
                label="Adresse"
                defaultValue={props.avtale.deltakerAdresse}
                onChange={event =>
                    props.settAvtaleVerdi('deltakerAdresse', event.target.value)
                }
            />
            <div className="deltakerinfo__postwrapper">
                <Input
                    className="deltakerinfo__postwrapper__postnummer"
                    label="Postnummer"
                    defaultValue={props.avtale.deltakerPostnummer}
                    onChange={event =>
                        props.settAvtaleVerdi(
                            'deltakerPostnummer',
                            event.target.value
                        )
                    }
                />
                <Input
                    className="deltakerinfo__postwrapper__poststed"
                    label="Poststed"
                    defaultValue={props.avtale.deltakerPoststed}
                    onChange={event =>
                        props.settAvtaleVerdi(
                            'deltakerPoststed',
                            event.target.value
                        )
                    }
                />
            </div>
        </>
    );
};

export default medContext(DeltakerinfoDel);
