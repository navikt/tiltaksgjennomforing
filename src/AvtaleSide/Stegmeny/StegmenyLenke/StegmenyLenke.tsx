import * as React from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';
import stegFullfortIkon from './steg-fullfort.svg';
import stegIkkeFullfortIkon from './steg-ikke-fullfort.svg';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
}

const StegmenyLenke = (props: Props) => {
    const statusIkon = props.ferdig ? (
        <img src={stegFullfortIkon} />
    ) : (
        <img src={stegIkkeFullfortIkon} />
    );

    let className = 'stegmenylenke';
    if (props.aktiv) {
        className += ' aktiv';
    }

    return (
        <Link to={props.url} className={className}>
            {/* {statusIkon} */}
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default StegmenyLenke;
