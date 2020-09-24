import { pathTilOversikt } from '@/paths';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './TilbakeTilOversiktLenke.less';

type Props = {
    onClick?: () => void;
};

const TilbakeTilOversiktLenke: FunctionComponent<Props> = props => {
    return (
        <Link
            to={{ pathname: pathTilOversikt, search: window.location.search }}
            className="lenke"
            onClick={props.onClick}
        >
            <VenstreChevron className="tilbaketiloversikt__chevron" />
            Tilbake til oversikt
        </Link>
    );
};

export default TilbakeTilOversiktLenke;
