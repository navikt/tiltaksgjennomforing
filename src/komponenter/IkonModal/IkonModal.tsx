import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel-ikon.svg';
import classNames from 'classnames';
import Modal, { ModalProps } from 'nav-frontend-modal';
import React, { FunctionComponent } from 'react';
import './IkonModal.less';

const IkonModal: FunctionComponent<ModalProps> = props => (
    <Modal {...props} className={classNames('ikonmodal', props.className)}>
        <VarselIkon style={{ margin: '-72px auto 1rem auto' }} />
        {props.children}
    </Modal>
);

export default IkonModal;
