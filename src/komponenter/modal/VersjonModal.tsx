import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import './VersjonModal.less';
import Oppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Oppsummering';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avtaleInnhold: AvtaleVersjon;
    visInnholdFraEtterMigrering?: boolean;
    tiltakstype: TiltaksType;
}

const VersjonModal = (props: Props) => {
    const { avtaleInnhold, visInnholdFraEtterMigrering, tiltakstype, lukkModal, isOpen } = props;

    return (
        <Modal className="versjon__modal" aria-label="Versjon modal" open={isOpen} onClose={() => lukkModal()}>
            <Modal.Header>
                <SkjemaTittel>Versjon {avtaleInnhold.versjon}</SkjemaTittel>
            </Modal.Header>
            <Modal.Body>
                <Oppsummering
                    tiltakstype={tiltakstype}
                    avtaleInnhold={avtaleInnhold}
                    visInnholdFraEtterMigrering={visInnholdFraEtterMigrering ?? true}
                />
            </Modal.Body>
        </Modal>
    );
};

export default VersjonModal;
