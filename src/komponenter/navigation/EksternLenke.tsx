import TilEkstern from '@/assets/ikoner/ekstern-lenke.svg?react';
import { Link } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';
import './EksternLenke.less';

interface EksternLenkeProps {
    href: string;
    target?: string;
    ariaLabel?: string;
    className?: string;
    onClick?: () => void;
}

const EksternLenke: React.FunctionComponent<PropsWithChildren<EksternLenkeProps>> = (props) => {
    return (
        <>
            <Link target="_blank" href={props.href}>
                {props.children}
                <TilEkstern className="ekstern-lenke-icon" />
            </Link>
        </>
    );
};

/*
const EksternLenke: React.FunctionComponent<Props> = (props) => {
    return (
        <>
            <Link target="_blank" {...props}>
                {props.children}
                <TilEkstern focusable="false" className="ekstern-lenke-icon" />
            </Link>
        </>
    );
};
*/

export default EksternLenke;
