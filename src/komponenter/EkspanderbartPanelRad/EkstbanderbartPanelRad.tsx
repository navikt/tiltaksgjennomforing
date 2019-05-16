import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';
import BEMHelper from '../../utils/bem';

interface Props {
    svgIkon?: React.ReactNode;
    headerTekst?: string;
    svgSmaaIkon?: React.ReactNode;
    motherDiv?: React.ReactNode;
}

const cls = BEMHelper('howto');

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {
    const { svgIkon, svgSmaaIkon, headerTekst, children, motherDiv } = props;
    const header = headerTekst ? <Element>{headerTekst}</Element> : null;
    return (
        <div>
            <div className={cls.element('element')}>
                {motherDiv}
                <div className={cls.element('icon')}>{svgIkon}</div>
                <div className={cls.element('tekst')}>
                    {header}
                    <Normaltekst>{children}</Normaltekst>
                </div>
            </div>
            <div className={cls.element('smaaicon')}>{svgSmaaIkon}</div>
        </div>
    );
};

export default EkstbanderbartPanelRad;
