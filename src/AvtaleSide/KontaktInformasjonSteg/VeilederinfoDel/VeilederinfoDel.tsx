import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import './VeilederinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';

const VeilederinfoDel = (props: Context) => (
    <>
        <Systemtittel className="veilederinfo__tittel">
            Kontaktperson i NAV
        </Systemtittel>
        <Input
            className="veilederinfo__navident"
            label="NAV-ident"
            value={props.avtale.veilederNavIdent}
            disabled={true}
        />
        <div className="veilederinfo__rad">
            <Input
                className="veilederinfo__fornavn"
                label="Fornavn"
                defaultValue={props.avtale.veilederFornavn}
                onChange={event =>
                    props.settAvtaleVerdi('veilederFornavn', event.target.value)
                }
            />
            <Input
                className="veilederinfo__etternavn"
                label="Etternavn"
                defaultValue={props.avtale.veilederEtternavn}
                onChange={event =>
                    props.settAvtaleVerdi(
                        'veilederEtternavn',
                        event.target.value
                    )
                }
            />
        </div>
        <div className="veilederinfo__rad">
            <Input
                className="veilederinfo__epost"
                label="Epost"
                defaultValue={props.avtale.veilederEpost}
                onChange={event =>
                    props.settAvtaleVerdi('veilederEpost', event.target.value)
                }
            />
            <Input
                className="veilederinfo__tlf"
                label="Telefonnummer"
                defaultValue={props.avtale.veilederTlf}
                onChange={event =>
                    props.settAvtaleVerdi('veilederTlf', event.target.value)
                }
            />
        </div>
    </>
);

export default medContext(VeilederinfoDel);
