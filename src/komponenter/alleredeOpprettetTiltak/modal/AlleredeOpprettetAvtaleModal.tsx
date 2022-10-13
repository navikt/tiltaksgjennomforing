import React, { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Modal } from '@navikt/ds-react';
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

    /*
    const setModalElement = () => {
        if (document.getElementById('root')) return '#root';
        return 'body';
    };
    */

    if (typeof window !== 'undefined') {
        //Modal.setAppElement(setModalElement());
    }

    return (
        <div className={cls.className}>
            <Modal
                style={{ content: style }}
                open={modalIsOpen}
                className={cls.element('modal-container')}
                aria-label={'bekrefte valgt handling'}
                onClose={() => setModalIsOpen(false)}
                closeButton={true}
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
