import * as React from 'react';
import './DeltakerinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { medContext } from '../../../AvtaleContext';
import { Context } from '../../../AvtaleContext';
import LaasbartInput from '../../../komponenter/LaasbartInput/LaasbartInput';

const DeltakerinfoDel = (props: Context) => {
    return (
        <>
            <Systemtittel className="deltakerinfo__tittel">
                Informasjon om deltaker
            </Systemtittel>
            <LaasbartInput
                className="deltakerinfo__fnr"
                label="Fødselsnummer"
                verdi={props.avtale.deltakerFnr}
                disabled={true}
            />
            <div className="deltakerinfo__deltakernavn">
                <LaasbartInput
                    label="Fornavn"
                    className="deltakerinfo__deltakernavn__fornavn"
                    verdi={props.avtale.deltakerFornavn}
                    onChange={(event: any) => {
                        props.settAvtaleVerdi(
                            'deltakerFornavn',
                            event.target.value
                        );
                    }}
                />
                <LaasbartInput
                    className="deltakerinfo__deltakernavn__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.deltakerEtternavn}
                    onChange={(event: any) =>
                        props.settAvtaleVerdi(
                            'deltakerEtternavn',
                            event.target.value
                        )
                    }
                />
            </div>
            <LaasbartInput
                className="deltakerinfo__adresse"
                label="Adresse"
                verdi={props.avtale.deltakerAdresse}
                onChange={(event: any) =>
                    props.settAvtaleVerdi('deltakerAdresse', event.target.value)
                }
            />
            <div className="deltakerinfo__postwrapper">
                <LaasbartInput
                    className="deltakerinfo__postwrapper__postnummer"
                    label="Postnummer"
                    verdi={props.avtale.deltakerPostnummer}
                    onChange={(event: any) =>
                        props.settAvtaleVerdi(
                            'deltakerPostnummer',
                            event.target.value
                        )
                    }
                />
                <LaasbartInput
                    className="deltakerinfo__postwrapper__poststed"
                    label="Poststed"
                    verdi={props.avtale.deltakerPoststed}
                    onChange={(event: any) =>
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

export default medContext<{}>(DeltakerinfoDel);
