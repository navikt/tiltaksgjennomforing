import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';

type Props = {
    type?: KnappBaseProps['type'];
    path: string;
    tekst: string;
};

const LenkeKnapp: FunctionComponent<Props & RouteComponentProps> = props => (
    <Knapp type={props.type || 'hoved'} onClick={() => props.history.push(props.path)}>
        Opprett ny avtale
    </Knapp>
);

export default withRouter(LenkeKnapp);
