import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '../../paths';
import './TilbakeTilOversiktLenke.less';
import { Context, medContext } from '../../AvtaleContext';
import { Avtale } from '../avtale';

const lagreHvisIAvtale = (props: Context) => {
    if (props.avtale) {
        props.tilOversiktLagring();
    }
};

const TilbakeTilOversiktLenke: FunctionComponent<Context> = props => (
    <Link
        to={pathTilOversikt}
        className="lenke"
        onClick={() => lagreHvisIAvtale(props)}
    >
        <VenstreChevron className="tilbaketiloversikt__chevron" />
        Tilbake til oversikt
    </Link>
);
export default medContext(TilbakeTilOversiktLenke);
