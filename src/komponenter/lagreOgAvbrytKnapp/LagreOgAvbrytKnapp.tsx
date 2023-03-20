import { Nettressurs, Status } from '@/types/nettressurs';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Alert } from '@navikt/ds-react';
import _ from 'lodash';
import { Button, ButtonProps } from '@navikt/ds-react';
import { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './lagreOgAvbrytKnapp.less';

type Props = {
    lagreFunksjon: () => Promise<any>;
    avbryt: () => void;
    lagretekst: string;
} & HTMLAttributes<HTMLDivElement>;

const LagreOgAvbrytKnapp: FunctionComponent<Props & ButtonProps> = (props) => {
    const cls = BEMHelper('lagre-og-avbryt-knapp');
    const [oppslag, setOppslag] = useState<Nettressurs<any>>({ status: Status.IkkeLastet });
    const [feilmelding, setFeilmelding] = useState('');

    // Fjerner ikke-standard knapp-props før de spreades inn i KnappBase.
    const knappBaseProps: ButtonProps = _.omit(props, ['lagreFunksjon', 'avbryt', 'lagreTekst']);

    const feilRef = useRef<HTMLDivElement>(null);

    const onClick = async () => {
        try {
            setOppslag({ status: Status.LasterInn });

            await props.lagreFunksjon();
            setOppslag({ status: Status.Sendt });
        } catch (error: any) {
            setOppslag({ status: Status.Feil, error: error.feilmelding ?? 'Uventet feil' });
            handterFeil(error, setFeilmelding);
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <div className={cls.className}>
            {oppslag.status === Status.Feil && (
                <div className={cls.element('alert')}>
                    <Alert variant="warning">
                        <div ref={feilRef} aria-live="polite">
                            {feilmelding}
                        </div>
                    </Alert>
                </div>
            )}
            <div className={cls.element('container')}>
                <Button
                    loading={oppslag.status === Status.LasterInn}
                    disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    variant="primary"
                    {...knappBaseProps}
                >
                    {props.lagretekst}
                </Button>
                <Button onClick={props.avbryt}>Avbryt</Button>
            </div>
        </div>
    );
};

export default LagreOgAvbrytKnapp;
