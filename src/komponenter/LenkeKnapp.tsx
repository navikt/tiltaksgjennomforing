import React, { CSSProperties, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, ButtonProps } from '@navikt/ds-react';

type Props = {
    variant?: ButtonProps['variant'];
    path: string;
    style?: CSSProperties;
    icon?: React.ReactNode;
};

const LenkeKnapp: FunctionComponent<Props & RouteComponentProps> = (props) => (
    <Button
        style={props.style}
        variant={props.variant || 'primary'}
        onClick={() => props.history.push({ pathname: props.path, search: window.location.search })}
        icon={props.icon}
    >
        {props.children}
    </Button>
);

export default withRouter(LenkeKnapp);
