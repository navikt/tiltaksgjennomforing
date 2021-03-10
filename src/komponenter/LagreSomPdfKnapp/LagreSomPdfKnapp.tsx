import * as React from 'react';
import { FunctionComponent } from 'react';
import { File } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';

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
