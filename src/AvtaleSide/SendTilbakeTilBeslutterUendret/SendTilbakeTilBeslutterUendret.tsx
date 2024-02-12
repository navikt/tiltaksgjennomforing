import CancelIkon from '@/assets/ikoner/cancel.svg?react';
import SendTilbakeModal from '@/komponenter/modal/SendTilbakeModal';
import { Link } from '@navikt/ds-react';
import React, { useState } from 'react';
import './SendTilbakeTilBeslutterUendret.less';

const SendTilbakeTilBeslutterUendret = () => {
    const [sendTilbakeModalIsOpen, setSendTilbakeModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="sendtilbake">
                <Link
                    onClick={() => setSendTilbakeModalIsOpen(true)}
                    href="#"
                    className="sendtilbake__lenke"
                    aria-label="Send tilbake til beslutter uendret"
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <CancelIkon />
                    </div>
                    Send tilbake til beslutter uendret
                </Link>
            </div>
            {sendTilbakeModalIsOpen && (
                <div aria-hidden={!sendTilbakeModalIsOpen}>
                    <SendTilbakeModal isOpen={sendTilbakeModalIsOpen} lukkModal={() => setSendTilbakeModalIsOpen(false)} />
                </div>
            )}
        </>
    );
};

export default SendTilbakeTilBeslutterUendret;
