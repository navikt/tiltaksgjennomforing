import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import './DeltakerinfoDel.less';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';

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
                <PakrevdInput
                    label="Fornavn"
                    className="deltakerinfo__deltakernavn__fornavn"
                    verdi={props.avtale.deltakerFornavn}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        props.settAvtaleVerdi(
                            'deltakerFornavn',
                            event.currentTarget.value
                        );
                    }}
                />
                <PakrevdInput
                    className="deltakerinfo__deltakernavn__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.deltakerEtternavn}
                    onChange={event =>
                        props.settAvtaleVerdi(
                            'deltakerEtternavn',
                            event.target.value
                        )
                    }
                />
            </div>
            <PakrevdInput
                label="Telefonnummer"
                className="deltakerinfo__telefonnummer"
                verdi={props.avtale.deltakerTlf}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.settAvtaleVerdi(
                        'deltakerTlf',
                        event.currentTarget.value
                    );
                }}
            />
        </>
    );
};

export default medContext<{}>(DeltakerinfoDel);
