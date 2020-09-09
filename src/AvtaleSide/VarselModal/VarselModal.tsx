import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useEffect, useState } from 'react';

type Props = {
    varsler: JSX.Element[];
};

const VarselModal: FunctionComponent<Props> = props => {
    const [varselModalApen, setVarselModalApen] = useState(false);

    useEffect(() => {
        props.varsler.length && setVarselModalApen(true);
    }, []);
    return (
        <Modal
            isOpen={varselModalApen}
            onRequestClose={() => setVarselModalApen(false)}
            closeButton={true}
            contentLabel="Hendelseloggmodal"
        >
            <Systemtittel>Hendelselogg</Systemtittel>
            <VerticalSpacer rem={1} />
            {props.varsler}
        </Modal>
    );
};

export default VarselModal;
