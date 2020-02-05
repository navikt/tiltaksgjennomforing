import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { ArbeidstreningAvtaleinnhold, AvtaleVersjon } from '@/types/avtale';
import Modal from 'nav-frontend-modal';
import React from 'react';
import './VersjonModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avtaleInnhold: AvtaleVersjon<ArbeidstreningAvtaleinnhold>;
}

const VersjonModal: React.FunctionComponent<Props> = props => {
    return (
        <Modal
            className="versjon__modal"
            contentLabel="Versjon modal"
            closeButton={true}
            isOpen={props.isOpen}
            onRequestClose={() => props.lukkModal()}
        >
            <SkjemaTittel>Versjon {props.avtaleInnhold.versjon}</SkjemaTittel>
            <OppsummeringArbeidstrening avtaleinnhold={props.avtaleInnhold} />
        </Modal>
    );
};

export default VersjonModal;
