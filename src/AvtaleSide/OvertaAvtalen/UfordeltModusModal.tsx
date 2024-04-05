import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import BEMHelper from '@/utils/bem';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import './UfordeltModusModal.less';

const cls = BEMHelper('ufordelt-modal');

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const UfordeltModusModal = (props: Props) => {
    return (
        <Modal
            aria-label="Modal for å overta avtale"
            className={cls.element('modal')}
            closeOnBackdropClick
            header={{ heading: 'Avtalen er ufordelt' }}
            onClose={props.lukkModal}
            open={props.isOpen}
        >
            <Modal.Body>
                <FordelAvtaleVeileder />
            </Modal.Body>
        </Modal>
    );
};

export default UfordeltModusModal;
