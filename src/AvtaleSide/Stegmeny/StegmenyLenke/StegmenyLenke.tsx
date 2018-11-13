import * as React from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
}

const StegmenyLenke = (props: Props) => {
    const statusIkon = props.ferdig ? 'ja' : 'nei';
    return (
        <Link to={props.url} className="stegmenylenke">
            {statusIkon}
            {props.label}
        </Link>
    );
};

export default StegmenyLenke;
