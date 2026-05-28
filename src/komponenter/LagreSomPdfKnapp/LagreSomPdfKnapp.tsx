import { FileIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import type { FunctionComponent } from 'react';

const LagreSomPdfKnapp: FunctionComponent<{ avtaleId: string }> = (props) => {
    const href = `/tiltaksgjennomforing/api/avtaler/${props.avtaleId}/pdf`;
    return (
        <Button
            variant="secondary"
            onClick={() => {
                window.open(href);
            }}
            style={{ padding: '0.75rem 0.75rem' }}
        >
            <FileIcon style={{ display: 'inline-block', marginRight: '0.5rem', scale: '1.5' }} />
            <span>Lagre som PDF</span>
        </Button>
    );
};

export default LagreSomPdfKnapp;
