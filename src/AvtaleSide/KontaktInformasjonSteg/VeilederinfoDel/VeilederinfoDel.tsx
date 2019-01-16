import * as React from 'react';
import './VeilederinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import LaasbartInput from '../../../komponenter/LaasbartInput/LaasbartInput';

const VeilederinfoDel = (props: Context) => (
    <>
        <Systemtittel className="veilederinfo__tittel">
            Kontaktperson i NAV
        </Systemtittel>
        <LaasbartInput
            className="veilederinfo__navident"
            label="NAV-ident"
            verdi={props.avtale.veilederNavIdent}
            disabled={true}
        />
        <div className="veilederinfo__rad">
            <LaasbartInput
                className="veilederinfo__fornavn"
                label="Fornavn"
                verdi={props.avtale.veilederFornavn}
                onChange={event =>
                    props.settAvtaleVerdi('veilederFornavn', event.target.value)
                }
            />
            <LaasbartInput
                className="veilederinfo__etternavn"
                label="Etternavn"
                verdi={props.avtale.veilederEtternavn}
                onChange={event =>
                    props.settAvtaleVerdi(
                        'veilederEtternavn',
                        event.target.value
                    )
                }
            />
        </div>
        <div className="veilederinfo__rad">
            <LaasbartInput
                className="veilederinfo__epost"
                label="Epost"
                verdi={props.avtale.veilederEpost}
                onChange={event =>
                    props.settAvtaleVerdi('veilederEpost', event.target.value)
                }
            />
            <LaasbartInput
                className="veilederinfo__tlf"
                label="Telefonnummer"
                verdi={props.avtale.veilederTlf}
                onChange={event =>
                    props.settAvtaleVerdi('veilederTlf', event.target.value)
                }
            />
        </div>
    </>
);

export default medContext<{}>(VeilederinfoDel);
