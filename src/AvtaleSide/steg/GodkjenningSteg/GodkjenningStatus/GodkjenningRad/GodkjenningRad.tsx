import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import './GodkjenningRad.less';
import { formatterDato } from '@/utils/datoUtils';

interface Props {
    godkjentAvtale?: string;
    navn: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const godkjentStatus: string = props.godkjentAvtale
        ? 'Godkjent ' + formatterDato(props.godkjentAvtale)
        : 'Må godkjenne';

    const navn = props.navn;

    return (
        <div>
            <Normaltekst tag={'span'}>{navn}</Normaltekst>
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
