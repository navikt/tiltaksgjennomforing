import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { pathTilAvtaleOversikt } from '../../paths';
import './KopierLenkeModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const KopierLenkeModal: React.FunctionComponent<Props> = props => (
    <Modal
        className="kopierlenke__modal"
        contentLabel="Del lenke modal"
        closeButton={true}
        isOpen={props.isOpen}
        onRequestClose={() => props.lukkModal()}
    >
        <Systemtittel className="kopierlenke__innholdstittel">
            Kopier lenken til arbeidsgiver og deltaker:
        </Systemtittel>
        <div className="kopierlenke__lenkedeling">
            <div className="kopierlenke__lenke">
                <Lenke href={pathTilAvtaleOversikt}>
                    {pathTilAvtaleOversikt}
                </Lenke>
            </div>
            <CopyToClipboard text={pathTilAvtaleOversikt}>
                <Hovedknapp className="kopierlenke__kopier-knapp">
                    Kopier lenke
                </Hovedknapp>
            </CopyToClipboard>
        </div>
        <Normaltekst className="kopierlenke__undertittel">
            For at arbeidsgiver og deltaker skal kunne fylle ut og godkjenne
            avtalen må du sende dem lenken vist over. De kan da logge seg inn i
            avtalen via ID-porten.
        </Normaltekst>
    </Modal>
);

export default KopierLenkeModal;
