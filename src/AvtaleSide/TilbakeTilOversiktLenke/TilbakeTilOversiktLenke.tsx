import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '../../paths';
import './TilbakeTilOversiktLenke.less';

const TilbakeTilOversiktLenke: FunctionComponent = () => (
    <Link to={pathTilOversikt} className="lenke">
        <VenstreChevron className="tilbaketiloversikt__chevron" />
        Tilbake til oversikt
    </Link>
);
export default TilbakeTilOversiktLenke;
