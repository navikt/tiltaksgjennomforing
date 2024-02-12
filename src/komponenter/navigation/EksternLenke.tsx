import TilEkstern from '@/assets/ikoner/ekstern-lenke.svg?react';
import amplitude from '@/utils/amplitude';
import { Link } from '@navikt/ds-react';
import React, {PropsWithChildren} from 'react';
import './EksternLenke.less';

interface EksternLenkeProps {
    href: string;
    target?: string;
    ariaLabel?: string;
    className?: string;
    onClick?: () => void,
}

const EksternLenke: React.FunctionComponent<PropsWithChildren<EksternLenkeProps>> = (props) => {
    const onClick = (event: any) => {
        amplitude.logEvent('#tiltak-ekstern-lenke-klikket', {
            url: event.target.href,
        });
    };
    return (
        <>
            <Link target="_blank" onClick={onClick} href={props.href}>
                {props.children}
                <TilEkstern className="ekstern-lenke-icon" />
            </Link>
        </>
    );
};

/*
const EksternLenke: React.FunctionComponent<Props> = (props) => {
    const onClick = (event: any) => {
        amplitude.logEvent('#tiltak-ekstern-lenke-klikket', {
            url: event.target.href,
        });
    };
    return (
        <>
            <Link target="_blank" onClick={onClick} {...props}>
                {props.children}
                <TilEkstern focusable="false" className="ekstern-lenke-icon" />
            </Link>
        </>
    );
};
*/

export default EksternLenke;
