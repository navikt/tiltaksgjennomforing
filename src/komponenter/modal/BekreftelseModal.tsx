import { ApiError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import BEMHelper from '@/utils/bem';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import './bekreftelseModal.less';
import VarselTegnForModal from './VarselTegnForModal';
import { setDomAttribute } from '@/utils/domAttributeUtils';

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
    const modalClassName = 'modal--overflow-visible';
    const [feilmelding, setFeilmelding] = useState<string>();
    setDomAttribute({ className: modalClassName, attribute: 'aria-modal', value: props.modalIsOpen });

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
                            <Systemtittel title={props.oversiktTekst} aria-label="tittel">
                                {props.oversiktTekst}
                            </Systemtittel>
                        </div>
                        <div
                            className={cls.element('varselTekst')}
                            aria-label="tekst boks"
                            aria-labelledby={'informasjon om valg'}
                        >
                            {props.varselTekst}
                        </div>
                    </div>
                    <div
                        className={cls.element('knapper')}
                        aria-label="Knapp"
                        aria-labelledby={'bekrefte valg av'.concat(props.oversiktTekst)}
                    >
                        <KnappBase
                            role="button"
                            type="hoved"
                            className={cls.element('knapp lenkeknapp')}
                            onClick={() => bekreftKlikk()}
                        >
                            {props.bekreftelseTekst}
                        </KnappBase>
                        <KnappBase
                            role="button"
                            aria-label="Knapp"
                            aria-labelledby={'Lukker dialog for'.concat(props.oversiktTekst)}
                            type="flat"
                            className={cls.element('knapp lenkeknapp')}
                            onClick={props.lukkModal}
                        >
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
