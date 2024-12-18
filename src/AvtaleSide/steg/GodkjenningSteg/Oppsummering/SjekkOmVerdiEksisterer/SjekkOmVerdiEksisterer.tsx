import React, { FunctionComponent } from 'react';
import { BodyShort, Tag } from '@navikt/ds-react';
const SjekkOmVerdiEksisterer: FunctionComponent<{
    verdi?: string | number;
    formatertVerdi?: JSX.Element | string;
    clsName?: string;
    label?: string;
    ariaLabel?: string;
}> = (props) => {
    if (props.verdi) {
        return (
            <BodyShort size="small" aria-label={props.ariaLabel}>
                {props.label} {props.formatertVerdi ? props.formatertVerdi : props.verdi}
            </BodyShort>
        );
    }
    return (
        <div>
            <Tag variant="warning">Ikke fylt ut</Tag>
        </div>
    );
};

export default SjekkOmVerdiEksisterer;
