import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '../../paths';
import './TilbakeTilOversiktLenke.less';

type Props = {
    onClick?: () => void;
};

const TilbakeTilOversiktLenke: FunctionComponent<Props> = props => (
    <Link to={pathTilOversikt} className="lenke" onClick={props.onClick}>
        <VenstreChevron className="tilbaketiloversikt__chevron" />
        Tilbake til oversikt
    </Link>
);
export default TilbakeTilOversiktLenke;
