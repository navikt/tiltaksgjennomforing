import { ReactComponent as TilEkstern } from '@/assets/ikoner/ekstern-lenke.svg';
import amplitude from '@/utils/amplitude';
import Lenke, { Props } from 'nav-frontend-lenker';
import React from 'react';
import './EksternLenke.less';

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
