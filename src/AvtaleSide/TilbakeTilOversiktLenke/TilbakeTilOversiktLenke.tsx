import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent } from 'react';
import { pathTilOversikt } from '../../paths';
import './TilbakeTilOversiktLenke.less';

const TilbakeTilOversiktLenke: FunctionComponent = () => (
    <div className="tilbaketiloversikt">
        <Lenke href={pathTilOversikt}>
            <VenstreChevron className="tilbaketiloversikt__chevron" />
            Tilbake til oversikt
        </Lenke>
    </div>
);
export default TilbakeTilOversiktLenke;
