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
        <Modal className={cls.element('modal')} open={props.isOpen} onClose={props.lukkModal}>
            <Modal.Content>
                <FordelAvtaleVeileder />
            </Modal.Content>
        </Modal>
    );
};

export default UfordeltModusModal;
