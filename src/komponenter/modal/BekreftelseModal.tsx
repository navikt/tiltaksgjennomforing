import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import LagreOgAvbrytKnapp from '../lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';
import VarselTegnForModal from './VarselTegnForModal';
import './bekreftelseModal.less';
import { Status } from '@/types/nettressurs';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    bekreftOnClick?: () => Promise<any>;
    lukkModal: () => void;
    children?: ReactNode;
    oversiktTekst: string;
    bekreftelseTekst: string;
    avbrytelseTekst: string;
    descripedby?: string;
    style?: CSSProperties;
}

const BekreftelseModal: React.FunctionComponent<Props> = (props) => {
    const [feilmelding, setFeilmelding] = useState<string>();
    const [laster, setLaster] = useState<boolean>(false);
    const ref = useRef<HTMLDialogElement>(null);
    const refFeil = useRef<HTMLDivElement>(null);

    const bekreftKlikk = async () => {
        if (props.bekreftOnClick === undefined) return;
        setFeilmelding(undefined);
        try {
            setLaster(true);
            await props.bekreftOnClick();
            setLaster(false);
        } catch (error: any) {
            try {
                setLaster(false);
                handterFeil(error, setFeilmelding);
            } catch (err) {
                setLaster(false);
                setFeilmelding('Det har skjedd en uventet feil');
                throw err;
            }
        }
    };

    useEffect(() => {
        if (feilmelding && refFeil.current) {
            refFeil.current.scrollIntoView();
            refFeil.current.focus();
        }
    }, [feilmelding, refFeil]);

    return (
        <div className={cls.className}>
            <Modal
                ref={ref}
                style={props.style}
                open={props.modalIsOpen}
                className={cls.element('modal-container')}
                aria-label={'bekrefte valgt handling'}
                onClose={props.lukkModal}
            >
                <Modal.Header>
                    <VarselTegnForModal className={cls.element('varsel')} width={'80px'} height={'80px'} />
                </Modal.Header>
                <Modal.Body>
                    <div className={cls.element('body')}>
                        <div className={cls.element('knappRad')} />
                        <div className={cls.element('innhold')}>
                            <div className={cls.element('tittel')}>
                                <Heading level="2" size="medium" id={props.oversiktTekst}>
                                    {props.oversiktTekst}
                                </Heading>
                            </div>
                            <div className={cls.element('varselTekst')}>{props.children}</div>
                        </div>
                        {feilmelding && (
                            <Alert ref={refFeil} variant="warning" size="small">
                                {feilmelding}
                            </Alert>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {props.bekreftOnClick !== undefined ? (
                        <LagreOgAvbrytKnapp
                            disabled={laster}
                            lagreFunksjon={() => bekreftKlikk()}
                            lagretekst={props.bekreftelseTekst}
                            avbrytelsetekst={props.avbrytelseTekst}
                            avbryt={() => {
                                ref.current?.close();
                            }}
                        />
                    ) : (
                        <Button
                            variant="secondary"
                            className={cls.element('knapp')}
                            onClick={() => ref.current?.close()}
                        >
                            {props.avbrytelseTekst || 'Lukk'}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
