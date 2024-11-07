import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Alert, Heading, Modal } from '@navikt/ds-react';
import React, { CSSProperties, ReactNode, useRef, useState } from 'react';
import LagreOgAvbrytKnapp from '../lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';
import VarselTegnForModal from './VarselTegnForModal';
import './bekreftelseModal.less';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    bekreftOnClick: () => Promise<any>;
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

    const bekreftKlikk = async () => {
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
                    </div>
                    {feilmelding && (
                        <Alert variant="warning" size="small">
                            {feilmelding}
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <LagreOgAvbrytKnapp
                        disabled={laster}
                        lagreFunksjon={() => bekreftKlikk()}
                        lagretekst={props.bekreftelseTekst}
                        avbryt={() => {
                            ref.current?.close();
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
