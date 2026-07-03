import TilEkstern from '@/assets/ikoner/ekstern-lenke.svg?react';
import { Link } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';
import './EksternLenke.less';

interface EksternLenkeProps {
    href: string;
    target?: string;
    ariaLabel?: string;
    className?: string;
}

const EksternLenke: React.FunctionComponent<PropsWithChildren<EksternLenkeProps>> = (props) => {
    return (
        <Link
            target="_blank"
            href={props.href}
            rel="noopener noreferrer"
            className={props.className}
            aria-label={props.ariaLabel}
        >
            {props.children}
            <TilEkstern className="ekstern-lenke-icon" />
        </Link>
    );
};

export default EksternLenke;
