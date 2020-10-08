import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import './GodkjenningRad.less';

interface Props {
    godkjentAvtale: boolean;
    fornavn?: string;
    etternavn?: string;
    placeholderName: string;
    bedriftNavn?: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const godkjentStatus: string = props.godkjentAvtale ? 'Avtale godkjent' : 'Må godkjenne';

    const fulltNavn = () => {
        const navn = [props.fornavn, props.etternavn].filter(Boolean).join(' ');

        if (navn) {
            if (props.placeholderName === 'Veileder i NAV') {
                return 'NAV v/ ' + navn;
            } else if (props.placeholderName === 'Arbeidsgiver') {
                return props.bedriftNavn + ' v/ ' + navn;
            } else {
                return navn;
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
                    alt="Godkjenningsgrad"
                    className="godkjenningsrad__godkjenningIkon"
                    src={props.godkjentAvtale ? CheckIkon : VarselIkon}
                />
            </span>
        </div>
    );
};

export default GodkjenningRad;
