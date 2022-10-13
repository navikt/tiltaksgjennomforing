import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { Tag } from '@navikt/ds-react';
const SjekkOmVerdiEksisterer: FunctionComponent<{
    verdi?: string;
    formatertVerdi?: JSX.Element | string;
    clsName?: string;
    label?: string;
    ariaLabel?: string;
}> = (props) => {
    if (props.verdi) {
        return (
            <Normaltekst aria-label={props.ariaLabel}>
                {props.label} {props.formatertVerdi ? props.formatertVerdi : props.verdi}
            </Normaltekst>
        );
    }
    return (
        <div>
            <Tag variant="warning">Ikke fylt ut</Tag>
        </div>
    );
};

export default SjekkOmVerdiEksisterer;
