import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { CSSProperties, useState } from 'react';
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
    descripedby?: string;
    style?: CSSProperties;
}

const BekreftelseModal: React.FunctionComponent<Props> = props => {
    const [feilmelding, setFeilmelding] = useState<string>();
    const setModalElement = () => {
        if (document.getElementById('root')) {
            return '#root';
        }
        return 'body';
    };

    if (typeof window !== 'undefined') {
        Modal.setAppElement(setModalElement());
    }

    const bekreftKlikk = async () => {
        setFeilmelding(undefined);
        try {
            await props.bekreftOnClick();
        } catch (error) {
            try {
                handterFeil(error, setFeilmelding);
            } catch (err) {
                setFeilmelding('Det har skjedd en uventet feil');
                throw err;
            }
        }
    };

    return (
        <div className={cls.className}>
            <Modal
                style={{ content: props.style }}
                isOpen={props.modalIsOpen}
                className="modal--overflow-visible"
                contentLabel={'bekrefte valgt handling'}
                onRequestClose={props.lukkModal}
                closeButton={false}
                aria={{ modal: true, labelledby: props.oversiktTekst, describedby: props.descripedby }}
                ariaHideApp={true}
            >
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>
                <div className={cls.element('body')}>
                    <div className={cls.element('knappRad')} />
                    <div className={cls.element('innhold')}>
                        <div className={cls.element('tittel')}>
                            <Systemtittel id={props.oversiktTekst}>{props.oversiktTekst}</Systemtittel>
                        </div>
                        <div className={cls.element('varselTekst')}>{props.varselTekst}</div>
                    </div>
                    <div className={cls.element('knapper')}>
                        <KnappBase
                            className={cls.element('knapp lenkeknapp')}
                            onClick={() => bekreftKlikk()}
                            role="button"
                            type="hoved"
                        >
                            {props.bekreftelseTekst}
                        </KnappBase>
                        <KnappBase
                            role="button"
                            aria-label={props.avbrytelseTekst.concat(' og lukk modalen')}
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
