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
    bedriftNavn?: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const godkjentStatus: string = props.godkjentAvtale
        ? 'Avtale godkjent'
        : 'Venter på godkjenning';

    const fulltNavn = () => {
        const fulltNavn = [props.fornavn, props.etternavn]
            .filter(Boolean)
            .join(' ');

        if (fulltNavn) {
            if (props.placeholderName === 'Veileder i NAV') {
                return 'NAV v/ ' + fulltNavn;
            } else if (props.placeholderName === 'Arbeidsgiver') {
                return props.bedriftNavn + ' v/ ' + fulltNavn;
            } else {
                return fulltNavn;
            }
        } else {
            return props.placeholderName;
        }
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
