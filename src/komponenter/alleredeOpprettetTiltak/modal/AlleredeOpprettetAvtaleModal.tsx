import React, { CSSProperties, Dispatch, SetStateAction } from 'react';
import Modal from 'nav-frontend-modal';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtaleModal.less';

interface Props {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    style?: CSSProperties;
}

const AlleredeOpprettetAvtaleModal: React.FC<Props> = ({ modalIsOpen, setModalIsOpen, style, children }) => {
    const cls = BEMHelper('alleredeOpprettetAvtaleModal');

    const setModalElement = () => {
        if (document.getElementById('root')) return '#root';
        return 'body';
    };

    if (typeof window !== 'undefined') {
        Modal.setAppElement(setModalElement());
    }

    return (
        <div className={cls.className}>
            <Modal
                style={{ content: style }}
                isOpen={modalIsOpen}
                className={cls.element('modal-container')}
                contentLabel={'bekrefte valgt handling'}
                onRequestClose={() => setModalIsOpen(false)}
                closeButton={true}
                aria={{ modal: true, labelledby: 'Allerede registrerte tiltak for deltaker', describedby: '' }}
                ariaHideApp={true}
            >
                <div>
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80px'} height={'80px'} />
                    </div>
                    {children}
                </div>
            </Modal>
        </div>
    );
};
export default AlleredeOpprettetAvtaleModal;
