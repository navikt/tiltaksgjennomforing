import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { slettemerkAvtale } from '@/services/rest-service';
import { Alert } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import LagreKnapp from './LagreKnapp/LagreKnapp';
import VerticalSpacer from './layout/VerticalSpacer';
import { AvtaleContext } from '@/AvtaleProvider';

const Slettemerk: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const [suksess, setSuksess] = useState(false);

    const slettemerk = () => {
        return slettemerkAvtale(avtale).then(() => {
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
