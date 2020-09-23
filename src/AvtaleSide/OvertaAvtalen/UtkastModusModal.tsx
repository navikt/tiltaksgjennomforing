import React from 'react';
import Modal from 'nav-frontend-modal';
import { AksepterUtkast } from '@/AvtaleSide/steg/GodkjenningSteg/AksepterUtkast';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const UtkastModusModal = (props: Props) => {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.lukkModal} contentLabel={''}>
            <AksepterUtkast />
        </Modal>
    );
};

export default UtkastModusModal;
