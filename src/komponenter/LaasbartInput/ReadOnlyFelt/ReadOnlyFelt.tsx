import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './ReadOnlyFelt.less';

interface Props {
    label: React.ReactNode;
    tekst: string;
    className?: string;
}

const ReadOnlyFelt = (props: Props) => {
    return (
        <div className={['read-only-felt', props.className].join(' ')}>
            <Normaltekst className="read-only-felt__label">
                {props.label}
            </Normaltekst>
            <Normaltekst className="read-only-felt__verdi">
                {props.tekst || ''}
            </Normaltekst>
        </div>
    );
};

export default ReadOnlyFelt;
