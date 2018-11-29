import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import EtikettBase from 'nav-frontend-etiketter';
import './KnappOgEtikett.less';

interface Props {
    godkjent: boolean;
    rolle: string;
    onClick: () => void;
}

const KnappOgEtikett = (props: Props) => {
    const knappTekst = props.godkjent
        ? `${props.rolle}: godkjent`
        : `${props.rolle}: godkjenn`;
    const etikettType = props.godkjent ? 'suksess' : 'fokus';
    const etikettTekst = props.godkjent ? 'Godkjent' : 'Venter på godkjenning';
    return (
        <div className="knapp-og-etikett">
            <Knapp
                disabled={props.godkjent}
                onClick={props.onClick}
                htmlType="button"
            >
                {knappTekst}
            </Knapp>
            <EtikettBase type={etikettType}>{etikettTekst}</EtikettBase>
        </div>
    );
};

export default KnappOgEtikett;
