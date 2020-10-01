import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import Modal from 'nav-frontend-modal';
import React from 'react';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const UtkastModusModal = (props: Props) => {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.lukkModal} contentLabel={''}>
            <FordelAvtaleVeileder />
        </Modal>
    );
};

export default UtkastModusModal;
