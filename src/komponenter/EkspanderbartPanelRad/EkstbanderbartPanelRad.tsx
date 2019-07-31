import React from 'react';
import TypografiBase, { Normaltekst, Element } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';
import BEMHelper from '../../utils/bem';

interface Props {
    svgIkon: React.ReactNode;
    classname?: string;
    headerTekst?: {
        tekst: string;
        typografiType?: string;
    };
}

const cls = BEMHelper('howto');

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {
    const { svgIkon, headerTekst, classname, children } = props;
    const header = headerTekst ? (
        <TypografiBase
            type={
                headerTekst.typografiType
                    ? headerTekst.typografiType
                    : 'element'
            }
        >
            {headerTekst.tekst}
        </TypografiBase>
    ) : null;

    return (
        <div
            className={cls.element(
                classname ? `element ${classname}` : 'element'
            )}
        >
            <div className={cls.element('icon')}>{svgIkon}</div>
            <div className={cls.element('tekst')}>
                {header}
                <Normaltekst>{children}</Normaltekst>
            </div>
        </div>
    );
};

export default EkstbanderbartPanelRad;
