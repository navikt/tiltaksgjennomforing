import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '../../../komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtale } from '../../avtale';
import './VeilederinfoDel.less';

const VeilederinfoDel = (props: Context) => {
    const settAvtaleVerdi = (felt: keyof Avtale) => {
        return (verdi: string) => props.settAvtaleVerdi(felt, verdi);
    };

    return (
        <>
            <Systemtittel className="veilederinfo__tittel">
                Kontaktperson i NAV
            </Systemtittel>
            <div className="veilederinfo__rad">
                <PakrevdInput
                    className="veilederinfo__fornavn"
                    label="Fornavn"
                    verdi={props.avtale.veilederFornavn}
                    settVerdi={settAvtaleVerdi('veilederFornavn')}
                />
                <PakrevdInput
                    className="veilederinfo__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.veilederEtternavn}
                    settVerdi={settAvtaleVerdi('veilederEtternavn')}
                />
            </div>
            <div className="veilederinfo__rad">
                <TelefonnummerInput
                    className="veilederinfo__tlf"
                    label="Telefonnummer"
                    verdi={props.avtale.veilederTlf}
                    settVerdi={settAvtaleVerdi('veilederTlf')}
                />
            </div>
        </>
    );
};

export default medContext<{}>(VeilederinfoDel);
