import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './EksbanderbartPanelRad.less';

interface Props {
    svgPath: string;
}

const EkstbanderbartPanelRad: React.FunctionComponent<Props> = props => {
    return (
        <div className="howto__element">
            <img src={props.svgPath} />
            <Normaltekst className="howto__tekst">{props.children}</Normaltekst>
        </div>
    );
};

export default EkstbanderbartPanelRad;
