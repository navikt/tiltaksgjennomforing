import { ReactComponent as InfoIkonGul } from '@/assets/ikoner/info-ikon-gul.svg';
import classNames from 'classnames';
import Modal, { ModalProps } from 'nav-frontend-modal';
import React, { FunctionComponent } from 'react';
import './IkonModal.less';

const IkonModal: FunctionComponent<ModalProps> = props => (
    <Modal {...props} className={classNames('ikonmodal', props.className)}>
        <InfoIkonGul height="80px" width="80px" style={{ margin: '-72px auto 1rem auto' }} />
        {props.children}
    </Modal>
);

export default IkonModal;
