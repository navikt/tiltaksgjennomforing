import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../../AvtaleContext';
import './DeltakerinfoDel.less';

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
                    label="Fornavn"
                    className="deltakerinfo__deltakernavn__fornavn"
                    defaultValue={props.avtale.deltakerFornavn}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
        </>
    );
};

export default medContext<{}>(DeltakerinfoDel);
