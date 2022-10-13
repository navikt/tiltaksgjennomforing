import React from 'react';
import { Collapse, Expand } from '@navikt/ds-icons';

import './infoToggler.less';

interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    åpen?: boolean;
}

const InfoToggler = (props: Props) => {
    const { åpen = false, children, onToggle } = props;
    return (
        <button
            className={'infoToggler'}
            type="button"
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
                evt.preventDefault();
                onToggle();
            }}
            aria-expanded={åpen}
        >
            <span className={'infoToggler__label'}>{children}</span>
            <div style={{ display: 'inline-block' }}>{åpen ? <Collapse /> : <Expand />}</div>
        </button>
    );
};

export default InfoToggler;
