import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringInkluderingstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import './VersjonModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avtaleInnhold: AvtaleVersjon;
    tiltakstype: TiltaksType;
}

const VersjonModal: React.FunctionComponent<Props> = (props) => {
    const oppsummeringType: { [key in TiltaksType]: JSX.Element } = {
        ARBEIDSTRENING: <OppsummeringArbeidstrening avtaleinnhold={props.avtaleInnhold} />,
        MIDLERTIDIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={props.avtaleInnhold} />,
        VARIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={props.avtaleInnhold} />,
        MENTOR: <OppsummeringMentor avtaleinnhold={props.avtaleInnhold} />,
        INKLUDERINGSTILSKUDD: <OppsummeringInkluderingstilskudd avtaleinnhold={props.avtaleInnhold} />,
        SOMMERJOBB: <OppsummeringLonnstilskudd avtaleinnhold={props.avtaleInnhold} />,
    };

    return (
        <Modal
            className="versjon__modal"
            aria-label="Versjon modal"
            open={props.isOpen}
            onClose={() => props.lukkModal()}
        >
            <Modal.Header>
                <SkjemaTittel>Versjon {props.avtaleInnhold.versjon}</SkjemaTittel>
            </Modal.Header>
            <Modal.Body>
           
                {oppsummeringType[props.tiltakstype]}
            </Modal.Body>
        </Modal>
    );
};

export default VersjonModal;
