import BEMHelper from '@/utils/bem';
import TypografiBase, { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import './EkspanderbartPanelRad.less';

interface Props {
    svgIkon: React.ReactNode;
    classname?: string;
    headerTekst?: {
        tekst: string;
        typografiType?: string;
    };
}

const cls = BEMHelper('howto');

const EkspanderbartPanelRad: React.FunctionComponent<Props> = props => {
    const { svgIkon, headerTekst, classname, children } = props;
    const header = headerTekst ? (
        <TypografiBase type={headerTekst.typografiType ? headerTekst.typografiType : 'element'}>
            {headerTekst.tekst}
        </TypografiBase>
    ) : null;

    return (
        <div className={cls.element(classname ? `element ${classname}` : 'element')}>
            <div className={cls.element('ikon')}>{svgIkon}</div>
            <div className={cls.element('tekst')}>
                {header}
                <Normaltekst>{children}</Normaltekst>
            </div>
        </div>
    );
};

export default EkspanderbartPanelRad;
