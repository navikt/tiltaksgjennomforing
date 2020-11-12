import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import BEMHelper from '@/utils/bem';
import Modal from 'nav-frontend-modal';
import React from 'react';
import './UfordeltModusModal.less';
import { setDomAttribute } from '@/utils/domAttributeUtils';

const cls = BEMHelper('ufordelt-modal');

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const UfordeltModusModal = (props: Props) => {
    setDomAttribute({ className: cls.element('modal'), attribute: 'aria-modal', value: props.isOpen });
    return (
        <Modal
            className={cls.element('modal')}
            isOpen={props.isOpen}
            onRequestClose={props.lukkModal}
            contentLabel={''}
        >
            <FordelAvtaleVeileder />
        </Modal>
    );
};

export default UfordeltModusModal;
