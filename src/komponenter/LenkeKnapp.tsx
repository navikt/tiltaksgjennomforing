import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type Props = {
    type?: KnappBaseProps['type'];
    path: string;
    tekst: string;
};

const LenkeKnapp: FunctionComponent<Props & RouteComponentProps> = props => (
    <Knapp
        type={props.type || 'hoved'}
        onClick={() => props.history.push({ pathname: props.path, search: window.location.search })}
    >
        {props.tekst}
    </Knapp>
);

export default withRouter(LenkeKnapp);
