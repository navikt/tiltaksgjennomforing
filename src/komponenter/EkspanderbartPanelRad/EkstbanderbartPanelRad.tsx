import React from 'react';
import TypografiBase, { Normaltekst, Element } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';
import BEMHelper from '../../utils/bem';

interface Props {
    svgIkon: React.ReactNode;
    headerTekst?: {
        tekst: string;
        typografiType?: string;
    };
}

const cls = BEMHelper('howto');

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {
    const { svgIkon, headerTekst, children } = props;
    const header = headerTekst ? (
        <TypografiBase
            type={
                headerTekst.typografiType
                    ? headerTekst.typografiType
                    : 'undertittel'
            }
        >
            {headerTekst.tekst}
        </TypografiBase>
    ) : null;

    return (
        <div className={cls.element('element')}>
            <div className={cls.element('icon')}>{svgIkon}</div>
            <div className={cls.element('tekst')}>
                {header}
                <Normaltekst>{children}</Normaltekst>
            </div>
        </div>
    );
};

export default EkstbanderbartPanelRad;
