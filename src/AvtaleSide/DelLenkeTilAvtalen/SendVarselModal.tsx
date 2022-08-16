import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilOversiktISelvbetjeningProd } from '@/paths';
import { delAvtaleMedAvtalepart } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './SendVarselModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('kopierlenke');

const SendVarselModal: React.FunctionComponent<Props> = props => {
    const { avtale } = useContext(AvtaleContext);

    return (
        <Modal
            className={cls.element('modal')}
            contentLabel="Del lenke modal"
            closeButton={true}
            isOpen={props.isOpen}
            onRequestClose={() => props.lukkModal()}
            aria={{ modal: props.isOpen }}
            ariaHideApp={props.isOpen}
        >
            <Systemtittel>Del lenke til avtalen</Systemtittel>
            <VerticalSpacer rem={1} />
            <Ingress>
                Lenke til avtalen kan sendes på SMS hvis telefonnummer er registrert i avtalen. Hvis det er ønskelig å
                sende lenke til avtalen via andre kanaler, for eksempel aktivitetsplanen eller e-post, er det adressen
                under som må benyttes.
            </Ingress>

            <VerticalSpacer rem={2} />

            <Undertittel>Send lenke på SMS</Undertittel>
            <VerticalSpacer rem={0.5} />
            <LagreKnapp
                label="Send til arbeidsgiveren"
                lagre={() => delAvtaleMedAvtalepart(avtale.id, 'ARBEIDSGIVER')}
                suksessmelding="SMS sendt til arbeidsgiveren"
                knapptype={'standard'}
            />
            <VerticalSpacer rem={0.5} />
            <LagreKnapp
                label="Send til deltakeren"
                lagre={() => delAvtaleMedAvtalepart(avtale.id, 'DELTAKER')}
                suksessmelding="SMS sendt til deltakeren"
                knapptype={'standard'}
            />

            <VerticalSpacer rem={0.5} />
            {avtale.tiltakstype === 'MENTOR' &&
                <LagreKnapp
                    label="Send til mentor"
                    lagre={() => delAvtaleMedAvtalepart(avtale.id, 'MENTOR')}
                    suksessmelding="SMS sendt til mentor"
                    knapptype={'standard'}
                />
            }

            <VerticalSpacer rem={2} />

            <Undertittel>Send lenke manuelt</Undertittel>
            <div className={cls.element('lenkedeling')}>
                <div className={cls.element('lenke')}>
                    <Lenke href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Lenke>
                </div>
                <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                    <Knapp mini={true} className={cls.element('kopier-knapp')}>
                        Kopier lenke
                    </Knapp>
                </CopyToClipboard>
            </div>
        </Modal>
    );
};

export default SendVarselModal;
