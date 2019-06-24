import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '../../../komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtale } from '../../avtale';
import './DeltakerinfoDel.less';

const DeltakerinfoDel = (props: Context) => {
    const settAvtaleVerdi = (felt: keyof Avtale) => {
        return (verdi: string) => props.settAvtaleVerdi(felt, verdi);
    };

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
                <PakrevdInput
                    label="Fornavn"
                    className="deltakerinfo__deltakernavn__fornavn"
                    verdi={props.avtale.deltakerFornavn}
                    settVerdi={settAvtaleVerdi('deltakerFornavn')}
                />
                <PakrevdInput
                    className="deltakerinfo__deltakernavn__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.deltakerEtternavn}
                    settVerdi={settAvtaleVerdi('deltakerEtternavn')}
                />
            </div>
            <TelefonnummerInput
                label="Telefonnummer"
                className="deltakerinfo__telefonnummer"
                verdi={props.avtale.deltakerTlf}
                settVerdi={settAvtaleVerdi('deltakerTlf')}
            />
        </>
    );
};

export default medContext<{}>(DeltakerinfoDel);
