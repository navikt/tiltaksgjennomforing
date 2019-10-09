import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';
import stegFullfortIkon from '@/assets/ikoner/steg-fullfort.svg';
import stegIkkeFullfortIkon from '@/assets/ikoner/steg-ikke-fullfort.svg';
import { Context, medContext } from '@/AvtaleContext';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
}

const StegmenyLenke: FunctionComponent<Context & Props> = props => {
    let className = 'stegmenylenke';
    if (props.aktiv) {
        className += ' aktiv';
    }
    return (
        <Link to={props.url} className={className} onClick={props.endretSteg}>
            <img
                src={props.ferdig ? stegFullfortIkon : stegIkkeFullfortIkon}
                className="hidden"
                alt="status"
            />
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default medContext(StegmenyLenke);
