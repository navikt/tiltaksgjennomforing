import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Alert, Modal } from '@navikt/ds-react';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { CSSProperties, useEffect, useState } from 'react';
import LagreOgAvbrytKnapp from '../lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';
import './bekreftelseModal.less';
import VarselTegnForModal from './VarselTegnForModal';

const cls = BEMHelper('bekreftelseModal');

interface Props {
    modalIsOpen: boolean;
    bekreftOnClick: () => Promise<any>;
    lukkModal: () => void;
    modalInnhold: string | JSX.Element;
    oversiktTekst: string;
    bekreftelseTekst: string;
    avbrytelseTekst: string;
    descripedby?: string;
    style?: CSSProperties;
}

const BekreftelseModal: React.FunctionComponent<Props> = (props) => {
    const [feilmelding, setFeilmelding] = useState<string>();
    const [varselInnhold, setVarselInnhold] = useState<string | JSX.Element>(<div />);

    useEffect(() => {
        setVarselInnhold(props.modalInnhold);
    }, [props.modalInnhold]);

    const setModalElement = () => {
        if (document.getElementById('root')) {
            return '#root';
        }
        return 'body';
    };

    if (typeof window !== 'undefined') {
        Modal.setAppElement!(setModalElement());
    }

    const bekreftKlikk = async () => {
        setFeilmelding(undefined);
        try {
            await props.bekreftOnClick();
        } catch (error: any) {
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
                open={props.modalIsOpen}
                className={cls.element('modal-container')}
                aria-label={'bekrefte valgt handling'}
                onClose={props.lukkModal}
                closeButton={false}
            >
                <Modal.Content>
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80px'} height={'80px'} />
                    </div>
                    <div className={cls.element('body')}>
                        <div className={cls.element('knappRad')} />
                        <div className={cls.element('innhold')}>
                            <div className={cls.element('tittel')}>
                                <Systemtittel id={props.oversiktTekst}>{props.oversiktTekst}</Systemtittel>
                            </div>
                            <div className={cls.element('varselTekst')}>{varselInnhold}</div>
                        </div>
                        <div className={cls.element('knapper')}>
                            <LagreOgAvbrytKnapp
                                lagreFunksjon={() => bekreftKlikk()}
                                lagretekst={props.bekreftelseTekst}
                                avbryt={() => props.lukkModal()}
                            />
                        </div>
                    </div>
                    {feilmelding && <Alert variant="warning">{feilmelding}</Alert>}
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
