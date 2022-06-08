import { Nettressurs, Status } from '@/types/nettressurs';
import { handterFeil } from '@/utils/apiFeilUtils';
import _ from 'lodash';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import KnappBase, { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';

type Props = {
    lagreFunksjon: () => Promise<any>;
    avbryt: () => void;
    lagretekst: string;
} & HTMLAttributes<HTMLDivElement>;

const LagreOgAvbrytKnapp: FunctionComponent<Props & KnappBaseProps> = (props) => {
    const [oppslag, setOppslag] = useState<Nettressurs<any>>({ status: Status.IkkeLastet });
    const [feilmelding, setFeilmelding] = useState('');

    // Fjerner ikke-standard knapp-props før de spreades inn i KnappBase.
    const knappBaseProps: KnappBaseProps = _.omit(props, ['lagreFunksjon', 'avbryt', 'lagreTekst']);

    const feilRef = useRef<HTMLDivElement>(null);

    const onClick = async () => {
        try {
            setOppslag({ status: Status.LasterInn });
            await props.lagreFunksjon().then(() => setOppslag({ status: Status.Sendt }));
        } catch (error: any) {
            setOppslag({ status: Status.Feil, error: error.feilmelding ?? 'Uventet feil' });
            handterFeil(error, setFeilmelding);
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            // feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <div className="TEST_TEST_TEST">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <KnappBase
                    //  spinner={oppslag.status === Status.LasterInn}
                    //   disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    type="hoved"
                    {...knappBaseProps}
                >
                    {props.lagretekst}
                </KnappBase>
                <Knapp onClick={props.avbryt}>Avbryt</Knapp>
            </div>
            {oppslag.status === Status.Feil && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <AlertStripeAdvarsel>
                        <div ref={feilRef} aria-live="polite">
                            {feilmelding}
                        </div>
                    </AlertStripeAdvarsel>
                </>
            )}
        </div>
    );
};

export default LagreOgAvbrytKnapp;
