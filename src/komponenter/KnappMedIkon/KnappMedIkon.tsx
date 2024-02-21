import classNames from 'classnames';
import { BodyShort } from '@navikt/ds-react';

import AvbruttIkon from '@/assets/ikoner/stop.svg?react';

import './KnappMedIkon.less';
import RedigerIkon from './rediger-penn.svg?react';
import SlettIkon from './soppeldunk.svg?react';

type IkonType = 'blyant' | 'soppelkasse' | 'avbrutt';

interface Props {
    ikonType: IkonType;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    backgroundColor?: string;
    disabled?: boolean;
}

const KnappMedIkon = (props: Props) => {
    const { disabled, backgroundColor, ikonType, onClick, label } = props;

    return (
        <button
            disabled={disabled}
            type="button"
            onClick={onClick}
            className={classNames('knapp-med-ikon', {
                'knapp-med-ikon__backgroundColor': backgroundColor !== null,
            })}
        >
            {ikonType === 'soppelkasse' && <SlettIkon title="Slett" />}
            {ikonType === 'blyant' && <RedigerIkon title="Rediger" />}
            {ikonType === 'avbrutt' && <AvbruttIkon title="Avbryt" />}
            <BodyShort size="small" className="knapp-med-ikon__label">
                {label}
            </BodyShort>
        </button>
    );
};

export default KnappMedIkon;
