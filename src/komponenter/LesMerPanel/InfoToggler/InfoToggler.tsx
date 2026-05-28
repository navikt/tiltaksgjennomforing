import React from 'react';
import './infoToggler.less';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

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
            <div style={{ display: 'inline-block' }}>{åpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
        </button>
    );
};

export default InfoToggler;
