import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import './VersjonModal.less';
import { AltAvtaleinnhold } from '@/types/avtale';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avtaleInnhold: AltAvtaleinnhold;
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
            <Systemtittel className="versjon__innholdstittel">Oversikt over en versjon av avtale</Systemtittel>
            <OppsummeringArbeidstrening avtaleinnhold={props.avtaleInnhold} />
        </Modal>
    );
};

export default VersjonModal;
