import * as _ from 'lodash';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '../../../komponenter/TelefonnummerInput/TelefonnummerInput';
import './DeltakerinfoDel.less';

const DeltakerinfoDel = (props: Context) => (
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
            <PakrevdInput
                label="Fornavn"
                className="deltakerinfo__deltakernavn__fornavn"
                verdi={props.avtale.deltakerFornavn}
                settVerdi={_.partial(props.settAvtaleVerdi, 'deltakerFornavn')}
            />
            <PakrevdInput
                className="deltakerinfo__deltakernavn__etternavn"
                label="Etternavn"
                verdi={props.avtale.deltakerEtternavn}
                settVerdi={_.partial(
                    props.settAvtaleVerdi,
                    'deltakerEtternavn'
                )}
            />
        </div>
        <TelefonnummerInput
            label="Telefonnummer"
            className="deltakerinfo__telefonnummer"
            verdi={props.avtale.deltakerTlf}
            settVerdi={_.partial(props.settAvtaleVerdi, 'deltakerTlf')}
        />
    </>
);

export default medContext(DeltakerinfoDel);
