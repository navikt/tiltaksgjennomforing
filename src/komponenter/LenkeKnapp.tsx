import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import * as React from 'react';
import { CSSProperties, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type Props = {
    type?: KnappBaseProps['type'];
    path: string;
    style?: CSSProperties;
};

const LenkeKnapp: FunctionComponent<Props & RouteComponentProps> = props => (
    <Knapp
        style={props.style}
        type={props.type || 'hoved'}
        onClick={() => props.history.push({ pathname: props.path, search: window.location.search })}
    >
        {props.children}
    </Knapp>
);

export default withRouter(LenkeKnapp);
