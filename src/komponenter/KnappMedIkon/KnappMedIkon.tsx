import avbruttIkon from '@/assets/ikoner/stop.svg?react';
import classNames from 'classnames';
import * as React from 'react';
import { BodyShort } from '@navikt/ds-react';
import './KnappMedIkon.less';
import redigerIkon from './rediger-penn.svg?react';
import slettIkon from './soppeldunk.svg?react';

type IkonType = 'blyant' | 'soppelkasse' | 'avbrutt';

interface Props {
    ikonType: IkonType;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    backgroundColor?: string;
    disabled?: boolean;
}

const ikoner = {
    blyant: redigerIkon,
    soppelkasse: slettIkon,
    avbrutt: avbruttIkon,
};

const KnappMedIkon = (props: Props) => {
    const Ikon = ikoner[props.ikonType];

    return (
        <button
            disabled={props.disabled}
            type="button"
            onClick={props.onClick}
            className={classNames('knapp-med-ikon', {
                'knapp-med-ikon__backgroundColor': props.backgroundColor !== null,
            })}
        >
            <Ikon title={props.ikonType} />
            <BodyShort size="small" className="knapp-med-ikon__label">
                {props.label}
            </BodyShort>
        </button>
    );
};

export default KnappMedIkon;
