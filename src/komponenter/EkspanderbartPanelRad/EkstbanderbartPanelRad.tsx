import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';

interface Props {
    svgPath: React.ReactNode;
}

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {

    return (
        <div className="howto__element">
            {props.svgPath}
            <Normaltekst className="howto__tekst">{props.children}</Normaltekst>
        </div>
    );
};

export default EkstbanderbartPanelRad;
