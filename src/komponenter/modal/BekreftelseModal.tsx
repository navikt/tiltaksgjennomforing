import React from 'react';
import Modal from 'nav-frontend-modal';
import BEMHelper from '../../utils/bem';
import './bekreftelseModal.less';
import VarselTegnForModal from './VarselTegnForModal';
import Lukknapp from 'nav-frontend-lukknapp';
import KnappBase from 'nav-frontend-knapper';
import Ingress from 'nav-frontend-typografi/lib/ingress';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    radTilSletting: any;
    slettOnClick: (rad: any) => Promise<any>;
    lukkModal: () => void;
}

const BekreftelseModal = ({
    modalIsOpen,
    slettOnClick,
    radTilSletting,
    lukkModal,
}: Props) => {
    if (typeof window !== 'undefined') {
        Modal.setAppElement('body');
    }

    const slettRad = () => {
        return slettOnClick(radTilSletting);
    };

    return (
        <div className={cls.className}>
            <Modal
                isOpen={modalIsOpen}
                className="modal--overflow-visible"
                contentLabel={'test'}
                onRequestClose={lukkModal}
                closeButton={false}
            >
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>
                <div className={cls.element('body')}>
                    <div className={cls.element('knappRad')}>
                        <Lukknapp onClick={lukkModal} />
                    </div>
                    <div className={cls.element('innhold')}>
                        <Ingress>
                            Du er i ferd med å slette innholdet i raden. Er du
                            sikker på at du vil fortsette?
                        </Ingress>
                    </div>
                    <div className={cls.element('knapper')}>
                        <KnappBase
                            type={'fare'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={slettRad}
                        >
                            slett innholdet
                        </KnappBase>
                        <KnappBase
                            type={'hoved'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={lukkModal}
                        >
                            angre valget
                        </KnappBase>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
