import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { pathTilOversiktISelvbetjeningProd } from '@/paths';
import './KopierLenkeModal.less';
import BEMHelper from '@/utils/bem';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('kopierlenke');

const KopierLenkeModal: React.FunctionComponent<Props> = props => (
    <Modal
        className={cls.element('modal')}
        contentLabel="Del lenke modal"
        closeButton={true}
        isOpen={props.isOpen}
        onRequestClose={() => props.lukkModal()}
    >
        <Systemtittel className={cls.element('innholdstittel')}>
            Kopier lenken til arbeidsgiver og deltaker:
        </Systemtittel>
        <div className={cls.element('lenkedeling')}>
            <div className={cls.element('lenke')}>
                <Lenke href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Lenke>
            </div>
            <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                <Hovedknapp className={cls.element('kopier-knapp')}>Kopier lenke</Hovedknapp>
            </CopyToClipboard>
        </div>
        <Normaltekst className={cls.element('undertittel')}>
            For at arbeidsgiver og deltaker skal kunne fylle ut og godkjenne avtalen må du sende dem lenken vist over.
            De kan da logge seg inn i avtalen via ID-porten.
        </Normaltekst>
    </Modal>
);

export default KopierLenkeModal;
