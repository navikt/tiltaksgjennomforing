import { AvtaleContext } from '@/AvtaleProvider';
import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    aktiv: boolean;
    url: string;
    id: string;
}

const StegmenyLenke: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);

    let className = 'stegmenylenke';
    if (props.aktiv) {
        className += ' aktiv';
    }

    return (
        <Link
            to={{ pathname: props.url, search: window.location.search }}
            className={className}
            onClick={avtaleContext.endretSteg}
            role="menuitem"
            id={props.id}
            aria-labelledby={props.id}
        >
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default StegmenyLenke;
