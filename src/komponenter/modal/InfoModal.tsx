import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import BEMHelper from '@/utils/bem';
import { Modal } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import './InfoModal.less';
import LagreOgAvbrytKnapp from '../lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';

interface InfoModalProps {
    open: boolean;
    width: 'small' | 'medium';
    confirmText?: string;
    onConfirm?: () => void;
    onClose: () => void;
}

const InfoModal: FunctionComponent<PropsWithChildren<InfoModalProps>> = (props) => {
    const { children, width, open, confirmText, onConfirm, onClose } = props;
    const cls = BEMHelper('infomodal');
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <div className={cls.className}>
            <Modal
                ref={ref}
                open={open}
                onClose={onClose}
                width={width || 'medium'}
                aria-label="Informasjonsdialog"
                className={cls.element('modal-container')}
            >
                <Modal.Header>
                    <VarselTegnForModal className={cls.element('varsel')} width={'80px'} height={'80px'} />
                </Modal.Header>
                <Modal.Body>
                    {children}
                    {!!onConfirm && (
                        <LagreOgAvbrytKnapp
                            className={cls.element('knapper-container')}
                            lagreFunksjon={onConfirm}
                            lagretekst={confirmText ? confirmText : 'Bekreft'}
                            avbryt={() => {
                                ref.current?.close();
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default InfoModal;
