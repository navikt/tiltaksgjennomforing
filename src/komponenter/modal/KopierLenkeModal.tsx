import React from 'react';
import Modal from 'nav-frontend-modal';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Hovedknapp } from 'nav-frontend-knapper';
import { pathTilAvtaleOversikt } from '../../paths';
import './KopierLenkeModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const beskrivelseTekst = (
    <Normaltekst className="kopierlenke__undertittel">
        For at arbeidsgiver og deltaker skal kunne logge seg inn og fylle ut
        avtalen må du sende dem lenken vist over. De kan da kunne logge seg inn
        i avtalen via ID-porten.
    </Normaltekst>
);

const KopierLenkeModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
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
            {beskrivelseTekst}
        </Modal>
    );
};

export default KopierLenkeModal;
