import React, { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './lenkeknapp.less';

type Props = {
    variant?: ButtonProps['variant'];
    path: string;
    style?: CSSProperties;
    icon?: React.ReactNode;
};

const LenkeKnapp: FunctionComponent<PropsWithChildren & Props> = (props) => {
    const navigate = useNavigate();

    const cls = BEMHelper('lenke-knapp');
    return (
        <Button
            className={cls.className}
            style={props.style}
            variant={props.variant || 'primary'}
            onClick={() => navigate({ pathname: props.path, search: window.location.search })}
            icon={props.icon}
        >
            {props.children}
        </Button>
    );
};
export default LenkeKnapp;
