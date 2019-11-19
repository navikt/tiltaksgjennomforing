import React from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as TilEkstern } from '@/assets/ikoner/external-link.svg';
import './EksternLenke.less';
import amplitude from '@/utils/amplitude';

const EksternLenke: React.FunctionComponent<Props> = props => {
    const onClick = (event: any) => {
        amplitude.logEvent('ekstern-lenke-klikket', {
            url: event.target.href,
        });
    };
    return (
        <Lenke target="_blank" onClick={onClick} {...props}>
            {props.children}
            <TilEkstern className="ekstern-lenke-icon" />
        </Lenke>
    );
};

export default EksternLenke;
