import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringInkluderingstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import OppsummeringVTAO from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringVTAO/OppsummeringVTAO';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import './VersjonModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avtaleInnhold: AvtaleVersjon;
    visInnholdFraEtterMigrering?: boolean;
    tiltakstype: TiltaksType;
}

const VersjonModal = (props: Props) => {
    const { avtaleInnhold, visInnholdFraEtterMigrering, tiltakstype, lukkModal, isOpen } = props;

    const oppsummeringType: { [key in TiltaksType]: JSX.Element } = {
        ARBEIDSTRENING: <OppsummeringArbeidstrening avtaleinnhold={avtaleInnhold} />,
        MIDLERTIDIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtaleInnhold} />,
        VARIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtaleInnhold} />,
        MENTOR: (
            <OppsummeringMentor
                avtaleinnhold={avtaleInnhold}
                visInnholdFraEtterMigrering={visInnholdFraEtterMigrering}
            />
        ),
        INKLUDERINGSTILSKUDD: <OppsummeringInkluderingstilskudd avtaleinnhold={avtaleInnhold} />,
        SOMMERJOBB: <OppsummeringLonnstilskudd avtaleinnhold={avtaleInnhold} />,
        VTAO: <OppsummeringVTAO avtaleinnhold={avtaleInnhold} />,
    };

    return (
        <Modal className="versjon__modal" aria-label="Versjon modal" open={isOpen} onClose={() => lukkModal()}>
            <Modal.Header>
                <SkjemaTittel>Versjon {avtaleInnhold.versjon}</SkjemaTittel>
            </Modal.Header>
            <Modal.Body>{oppsummeringType[tiltakstype]}</Modal.Body>
        </Modal>
    );
};

export default VersjonModal;
