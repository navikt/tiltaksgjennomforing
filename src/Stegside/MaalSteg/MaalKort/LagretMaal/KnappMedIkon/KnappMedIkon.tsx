import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './KnappMedIkon.less';

interface Props {
    ikon: any;
    label: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const KnappMedIkon = (props: Props) => (
    <button type="button" onClick={props.onClick} className="knapp-med-ikon">
        <img src={props.ikon} />
        <Normaltekst className="knapp-med-ikon__label">
            {props.label}
        </Normaltekst>
    </button>
);

export default KnappMedIkon;
