import Modal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import './KopierLenkeModal.less';
import BEMHelper from '@/utils/bem';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import RestService from '@/services/rest-service';
import { Context, medContext } from '@/AvtaleContext';

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
        <Systemtittel className={cls.element('innholdstittel')}>Send lenke til avtalen på SMS:</Systemtittel>
        <LagreKnapp
            label="Send til arbeidsgiver"
            lagre={() => RestService.delAvtaleMedAvtalepart(props.avtale.id, 'ARBEIDSGIVER')}
            suksessmelding="Varsel sendt til arbeidsgiver"
        />
        <VerticalSpacer thirtyTwoPx={true} />
        <LagreKnapp
            label="Send til deltaker"
            lagre={() => RestService.delAvtaleMedAvtalepart(props.avtale.id, 'DELTAKER')}
            suksessmelding="Varsel sendt til deltaker"
        />
        <Normaltekst className={cls.element('undertittel')}>
            Arbeidsgiver og deltaker vil motta en lenke på SMS, og de kan da logge seg inn i avtalen via ID-porten.
        </Normaltekst>
    </Modal>
);

export default medContext(SendVarselModal);
