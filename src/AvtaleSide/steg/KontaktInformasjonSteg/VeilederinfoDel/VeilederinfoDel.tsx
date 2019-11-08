import * as _ from 'lodash';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import './VeilederinfoDel.less';
import { Veilederinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';

const VeilederinfoDel = (props: InputStegProps<Veilederinfo>) => (
    <>
        <Systemtittel className="veilederinfo__tittel">Kontaktperson i NAV</Systemtittel>
        <div className="veilederinfo__rad">
            <PakrevdInput
                className="veilederinfo__fornavn"
                label="Fornavn"
                verdi={props.avtale.veilederFornavn}
                settVerdi={_.partial(props.settAvtaleVerdi, 'veilederFornavn')}
            />
            <PakrevdInput
                className="veilederinfo__etternavn"
                label="Etternavn"
                verdi={props.avtale.veilederEtternavn}
                settVerdi={_.partial(props.settAvtaleVerdi, 'veilederEtternavn')}
            />
        </div>
        <div className="veilederinfo__rad">
            <TelefonnummerInput
                className="veilederinfo__tlf"
                label="Telefonnummer"
                verdi={props.avtale.veilederTlf}
                settVerdi={_.partial(props.settAvtaleVerdi, 'veilederTlf')}
            />
        </div>
    </>
);

export default VeilederinfoDel;
