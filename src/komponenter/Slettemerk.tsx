import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { slettemerkAvtale } from '@/services/rest-service';
import { Alert } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import LagreKnapp from './LagreKnapp/LagreKnapp';
import VerticalSpacer from './layout/VerticalSpacer';

const Slettemerk: FunctionComponent = () => {
    const [suksess, setSuksess] = useState(false);
    const { avtaleId } = useParams<any>();

    const slettemerk = () => {
        return slettemerkAvtale(avtaleId!).then(() => {
            setSuksess(true);
        });
    };

    return (
        <>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <LagreKnapp lagre={slettemerk}>Slettemerk avtale</LagreKnapp>
                <VerticalSpacer rem={2} />
                {suksess && (
                    <>
                        <Alert variant="success">Avtalen er slettemerket og ikke lenger synlig</Alert>
                        <VerticalSpacer rem={1} />
                        <TilbakeTilOversiktLenke />
                    </>
                )}
            </div>
        </>
    );
};

export default Slettemerk;
