import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';
import BEMHelper from '../../utils/bem';

interface Props {
    svgPath: React.ReactNode;
    headerTekst?: string;
}

const cls = BEMHelper('howto');

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {
    const { svgPath, headerTekst, children } = props;
    const header = headerTekst ? <Element>{headerTekst}</Element> : null;
    return (
        <div className={cls.element('element')}>
            <div className={cls.element('icon')}>{svgPath}</div>
            <div className={cls.element('tekst')}>
                {header}
                <Normaltekst>{children}</Normaltekst>
            </div>
        </div>
    );
};

export default EkstbanderbartPanelRad;
