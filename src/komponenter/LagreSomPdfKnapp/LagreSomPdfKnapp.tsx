import { File } from '@navikt/ds-icons/cjs';
import { Button } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

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
            <File style={{ display: 'inline-block', marginRight: '0.5rem' }} />
            <span>Lagre som PDF</span>
        </Button>
    );
};

export default LagreSomPdfKnapp;
