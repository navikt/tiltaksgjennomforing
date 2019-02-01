import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import './KnappMedIkon.less';
import redigerIkon from './rediger-penn.svg';
import slettIkon from './soppeldunk.svg';

type IkonType = 'blyant' | 'soppelkasse';

interface Props {
    ikonType: IkonType;
    label: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ikoner = {
    blyant: redigerIkon,
    soppelkasse: slettIkon,
};

const KnappMedIkon = (props: Props) => (
    <button type="button" onClick={props.onClick} className="knapp-med-ikon">
        <img src={ikoner[props.ikonType]} />
        <Normaltekst className="knapp-med-ikon__label">
            {props.label}
        </Normaltekst>
    </button>
);

export default KnappMedIkon;
