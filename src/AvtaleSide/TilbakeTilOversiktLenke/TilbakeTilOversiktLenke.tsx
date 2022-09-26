import { pathTilOversikt } from '@/paths';
import { Back } from '@navikt/ds-icons';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './TilbakeTilOversiktLenke.less';
import BEMHelper from '@/utils/bem';

type Props = {
    onClick?: () => void;
    tekst?: string;
};

const TilbakeTilOversiktLenke: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('tilbaketiloversikt');
    return (
        <Link
            to={{ pathname: pathTilOversikt, search: window.location.search }}
            className={cls.element('lenke')}
            onClick={props.onClick}
            role="menuitem"
        >
            <div aria-hidden={true}>
                <Back className={cls.element('chevron')} />
            </div>
            {props.tekst || 'Tilbake til oversikt'}
        </Link>
    );
};

export default TilbakeTilOversiktLenke;
