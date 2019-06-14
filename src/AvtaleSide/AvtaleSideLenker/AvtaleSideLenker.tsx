import Lenke from 'nav-frontend-lenker';
import { pathTilOversikt } from '../../paths';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
const cls = BEMHelper('avtalesidelenker');
const AvtaleSideLenker: FunctionComponent = () => {
    return (
        <div className={cls.element('tilbake')}>
            <Lenke
                href={pathTilOversikt}
                className="avtalesidelenker__tilbake "
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <VenstreChevron className={cls.element('chevron')} />

                <Normaltekst>Tilbake til oversikt</Normaltekst>
            </Lenke>
        </div>
    );
};
export default AvtaleSideLenker;
