import React from 'react';
import Modal from 'nav-frontend-modal';
import BEMHelper from '@/utils/bem';
import './bekreftelseModal.less';
import VarselTegnForModal from './VarselTegnForModal';
import KnappBase from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    radTilSletting: any;
    slettOnClick: (rad: any) => Promise<any>;
    lukkModal: () => void;
    navn: string;
    varselTekst: string;
    oversiktTekst: string;
    bekreftelseTekst: string;
    avbrytelseTekst: string;
}

const BekreftelseModal = ({
    modalIsOpen,
    slettOnClick,
    radTilSletting,
    lukkModal,
    navn,
    varselTekst,
    oversiktTekst,
    bekreftelseTekst,
    avbrytelseTekst,
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
                    <div className={cls.element('knappRad')} />
                    <div className={cls.element('innhold')}>
                        <div className={cls.element('tittel')}>
                            <Systemtittel>
                                {oversiktTekst} {navn}
                            </Systemtittel>
                        </div>
                        <Normaltekst className={cls.element('varselTekst')}>
                            {varselTekst}
                        </Normaltekst>
                    </div>
                    <div className={cls.element('knapper')}>
                        <KnappBase
                            type={'hoved'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={slettRad}
                        >
                            {bekreftelseTekst} {navn}
                        </KnappBase>
                        <KnappBase
                            type={'flat'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={lukkModal}
                        >
                            {avbrytelseTekst}
                        </KnappBase>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
