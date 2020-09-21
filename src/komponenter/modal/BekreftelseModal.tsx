import { ApiError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import BEMHelper from '@/utils/bem';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import './bekreftelseModal.less';
import VarselTegnForModal from './VarselTegnForModal';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    bekreftOnClick: () => Promise<any>;
    lukkModal: () => void;
    varselTekst: string | JSX.Element;
    oversiktTekst: string;
    bekreftelseTekst: string;
    avbrytelseTekst: string;
}

const BekreftelseModal: React.FunctionComponent<Props> = props => {
    const [feilmelding, setFeilmelding] = useState<string>();
    if (typeof window !== 'undefined') {
        Modal.setAppElement('body');
    }

    const bekreftKlikk = async () => {
        setFeilmelding(undefined);
        try {
            await props.bekreftOnClick();
        } catch (error) {
            if (error instanceof FeilkodeError) {
                setFeilmelding(Feilmeldinger[error.message as Feilkode]);
            } else if (error instanceof ApiError || error instanceof UfullstendigError) {
                setFeilmelding(error.message);
            } else {
                throw error;
            }
        }
    };

    return (
        <div className={cls.className}>
            <Modal
                isOpen={props.modalIsOpen}
                className="modal--overflow-visible"
                contentLabel={'bekrefte valgt handling'}
                onRequestClose={props.lukkModal}
                closeButton={false}
            >
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>
                <div className={cls.element('body')}>
                    <div className={cls.element('knappRad')} />
                    <div className={cls.element('innhold')}>
                        <div className={cls.element('tittel')}>
                            <Systemtittel>{props.oversiktTekst}</Systemtittel>
                        </div>
                        <Normaltekst className={cls.element('varselTekst')}>{props.varselTekst}</Normaltekst>
                    </div>
                    <div className={cls.element('knapper')}>
                        <KnappBase
                            type={'hoved'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={() => bekreftKlikk()}
                        >
                            {props.bekreftelseTekst}
                        </KnappBase>
                        <KnappBase type={'flat'} className={cls.element('knapp lenkeknapp')} onClick={props.lukkModal}>
                            {props.avbrytelseTekst}
                        </KnappBase>
                    </div>
                </div>
                {feilmelding && <AlertStripeAdvarsel>{feilmelding}</AlertStripeAdvarsel>}
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
