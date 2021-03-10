import { File } from '@navikt/ds-icons/cjs';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';

const LagreSomPdfKnapp: FunctionComponent<{ avtaleId: string }> = props => {
    const href = `/tiltaksgjennomforing/api/avtaler/${props.avtaleId}/pdf`;
    return (
        <Knapp
            onClick={() => {
                window.open(href);
            }}
            style={{ padding: '0 20px' }}
        >
            <File style={{ display: 'inline-block' }} />
            <span>Lagre som PDF</span>
        </Knapp>
    );
};

export default LagreSomPdfKnapp;
