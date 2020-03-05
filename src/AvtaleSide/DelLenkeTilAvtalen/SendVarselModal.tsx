import Modal from 'nav-frontend-modal';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import './SendVarselModal.less';
import BEMHelper from '@/utils/bem';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import RestService from '@/services/rest-service';
import { Context, medContext } from '@/AvtaleContext';
import Lenke from 'nav-frontend-lenker';
import { pathTilOversiktISelvbetjeningProd } from '@/paths';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('kopierlenke');

const SendVarselModal: React.FunctionComponent<Props & Context> = props => (
    <Modal
        className={cls.element('modal')}
        contentLabel="Del lenke modal"
        closeButton={true}
        isOpen={props.isOpen}
        onRequestClose={() => props.lukkModal()}
    >
        <Systemtittel>Del lenke til avtalen</Systemtittel>
        <VerticalSpacer sixteenPx={true} />
        <Ingress>
            Lenke til avtalen kan sendes på SMS hvis telefonnummer er registrert på avtalen. Hvis det er ønskelig å
            sende lenke til avtalen via andre kanaler, for eksempel Aktivitetsplanen eller epost, er det adressen under
            som må benyttes.
        </Ingress>

        <VerticalSpacer thirtyTwoPx={true} />

        <Undertittel>Send lenke på SMS</Undertittel>
        <VerticalSpacer eightPx={true} />
        <LagreKnapp
            label="Send til arbeidsgiver"
            lagre={() => RestService.delAvtaleMedAvtalepart(props.avtale.id, 'ARBEIDSGIVER')}
            suksessmelding="SMS sendt til arbeidsgiver"
            knapptype={'standard'}
        />
        <VerticalSpacer eightPx={true} />
        <LagreKnapp
            label="Send til deltaker"
            lagre={() => RestService.delAvtaleMedAvtalepart(props.avtale.id, 'DELTAKER')}
            suksessmelding="SMS sendt til deltaker"
            knapptype={'standard'}
        />

        <VerticalSpacer thirtyTwoPx={true} />

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

export default medContext(SendVarselModal);
