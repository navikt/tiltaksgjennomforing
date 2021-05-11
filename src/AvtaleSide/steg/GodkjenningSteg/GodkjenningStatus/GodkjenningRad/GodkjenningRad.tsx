import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import './GodkjenningRad.less';
import { formatterDato } from '@/utils/datoUtils';

interface Props {
    godkjentAvtale?: string;
    fornavn?: string;
    etternavn?: string;
    placeholderName: string;
    bedriftNavn?: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const godkjentStatus: string = props.godkjentAvtale
        ? 'Godkjent ' + formatterDato(props.godkjentAvtale)
        : 'Må godkjenne';

    const navn = [props.fornavn, props.etternavn].filter(Boolean).join(' ');

    const representerer = (() => {
        if (navn) {
            if (props.placeholderName === 'NAV') {
                return 'NAV';
            } else if (props.placeholderName === 'Arbeidsgiver') {
                return props.bedriftNavn;
            } else {
                return undefined;
            }
        }
    })();

    return (
        <div>
            <Normaltekst tag={'span'}>
                {representerer ? (
                    <>
                        {representerer}
                        <br />
                        v/ {navn}
                    </>
                ) : (
                    navn
                )}
            </Normaltekst>
            <span className="godkjenningsrad__status">
                <Element tag={'span'}>{godkjentStatus}</Element>
                <img
                    alt="Godkjenningsgrad"
                    className="godkjenningsrad__godkjenningIkon"
                    src={props.godkjentAvtale ? CheckIkon : VarselIkon}
                />
            </span>
        </div>
    );
};

export default GodkjenningRad;
