import StegFullfortIkon from '@/assets/ikoner/check.svg?react';
import StegIkkeFullfortIkon from '@/assets/ikoner/steg-ikke-fullfort.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
    id: string;
}

const StegmenyLenke: FunctionComponent<Props> = props => {
    const Ikon = props.ferdig ? StegFullfortIkon : StegIkkeFullfortIkon;
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
            <Ikon className="hidden" title="status" />
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default StegmenyLenke;
