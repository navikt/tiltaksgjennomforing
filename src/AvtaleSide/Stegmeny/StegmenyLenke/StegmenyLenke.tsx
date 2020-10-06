import stegFullfortIkon from '@/assets/ikoner/check.svg';
import stegIkkeFullfortIkon from '@/assets/ikoner/steg-ikke-fullfort.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
}

const StegmenyLenke: FunctionComponent<Props> = props => {
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
        >
            <img src={props.ferdig ? stegFullfortIkon : stegIkkeFullfortIkon} className="hidden" alt="status" />
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default StegmenyLenke;
