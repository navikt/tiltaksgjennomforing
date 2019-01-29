import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import checkIkon from '../check-circle.svg';
import problemIkon from '../report-problem-circle.svg';
import './GodkjenningRad.less';

interface Props {
    godkjentAvtale: boolean;
    fornavn: string;
    etternavn: string;
    placeholderName: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const godkjentStatus: string = props.godkjentAvtale
        ? 'Avtale godkjent'
        : 'Venter på godkjenning';

    const fulltNavn = () => {
        return (
            [props.fornavn, props.etternavn].filter(Boolean).join(' ') ||
            props.placeholderName
        );
    };

    return (
        <div>
            <Normaltekst tag={'span'}>{fulltNavn()}</Normaltekst>
            <span className="godkjenningsrad__status">
                <Element tag={'span'}>{godkjentStatus}</Element>
                <img
                    className="godkjenningsrad__godkjenningIkon"
                    src={props.godkjentAvtale ? checkIkon : problemIkon}
                />
            </span>
        </div>
    );
};

export default GodkjenningRad;
