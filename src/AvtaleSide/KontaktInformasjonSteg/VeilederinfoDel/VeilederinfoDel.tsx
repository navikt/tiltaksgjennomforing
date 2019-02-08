import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import './VeilederinfoDel.less';

const VeilederinfoDel = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    return (
        <>
            <Systemtittel className="veilederinfo__tittel">
                Kontaktperson i NAV
            </Systemtittel>
            <div className="veilederinfo__rad">
                <Input
                    className="veilederinfo__fornavn"
                    label="Fornavn"
                    defaultValue={props.avtale.veilederFornavn}
                    onChange={onChange('veilederFornavn')}
                />
                <Input
                    className="veilederinfo__etternavn"
                    label="Etternavn"
                    defaultValue={props.avtale.veilederEtternavn}
                    onChange={onChange('veilederEtternavn')}
                />
            </div>
            <div className="veilederinfo__rad">
                <Input
                    className="veilederinfo__tlf"
                    label="Telefonnummer"
                    defaultValue={props.avtale.veilederTlf}
                    onChange={onChange('veilederTlf')}
                />
            </div>
        </>
    );
};

export default medContext<{}>(VeilederinfoDel);
