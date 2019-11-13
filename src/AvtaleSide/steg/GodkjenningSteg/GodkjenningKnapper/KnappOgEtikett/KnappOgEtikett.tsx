import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import EtikettBase from 'nav-frontend-etiketter';
import './KnappOgEtikett.less';

interface Props {
    godkjent: boolean;
    knappTekst: string;
    onClick: () => void;
}

const KnappOgEtikett = (props: Props) => {
    const etikettType = props.godkjent ? 'suksess' : 'fokus';
    const etikettTekst = props.godkjent ? 'Godkjent' : 'Venter på godkjenning';
    return (
        <div className="knapp-og-etikett">
            <Knapp
                className="knapp-og-etikett__knapp"
                disabled={props.godkjent}
                onClick={props.onClick}
                htmlType="button"
            >
                {props.knappTekst}
            </Knapp>
            <EtikettBase type={etikettType} className="knapp-og-etikett__etikett">
                {etikettTekst}
            </EtikettBase>
        </div>
    );
};

export default KnappOgEtikett;
