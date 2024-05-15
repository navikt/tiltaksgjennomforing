import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilOversiktISelvbetjeningProd } from '@/paths';
import { delAvtaleMedAvtalepart } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Heading, Link, Modal, Button, BodyLong, List } from '@navikt/ds-react';
import React, { useContext } from 'react';
import { copyTextToClipboard } from '@/utils/copyTextToClipboard';
import './SendVarselModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('kopierlenke');

const SendVarselModal: React.FunctionComponent<Props> = (props) => {
    const { avtale } = useContext(AvtaleContext);

    return (
        <Modal
            className={cls.element('modal')}
            aria-label="Del lenke modal"
            open={props.isOpen}
            onClose={() => props.lukkModal()}
            aria-modal={props.isOpen}
        >
            <Modal.Header>
                <Heading level="2" size="medium">
                    Del lenke til avtalen med mentor
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <VerticalSpacer rem={1} />
                <List>
                    <List.Item>
                        Lenke til avtalen kan sendes på SMS til mentor hvis telefonnummer er registrert i avtalen
                    </List.Item>
                    <List.Item>Arbeidsgiver får automatisk varsling på Min side Arbeidsgiver</List.Item>
                    <List.Item>Deltaker får vaslinger på Min side Personbruker</List.Item>
                    <List.Item>
                        Hvis det er ønskelig å sende lenke til avtalen via andre kanaler, for eksempel aktivitetsplanen
                        eller e-post, er det adressen under som må benyttes.
                    </List.Item>
                </List>
                <VerticalSpacer rem={2} />
                <Heading level="2" size="small">
                    Send lenke på SMS
                </Heading>
                <VerticalSpacer rem={1} />
                <LagreKnapp
                    label="Send til mentor"
                    lagre={() => delAvtaleMedAvtalepart(avtale.id, 'MENTOR')}
                    suksessmelding="SMS sendt til mentor"
                    variant={'primary'}
                />
                <VerticalSpacer rem={1.5} />

                <Heading level="2" size="small">
                    Send lenke manuelt
                </Heading>
                <div className={cls.element('lenkedeling')}>
                    <div className={cls.element('lenke')}>
                        <Link href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Link>
                    </div>
                    <Button
                        variant="secondary"
                        size="small"
                        className={cls.element('kopierKnapp')}
                        onClick={() => copyTextToClipboard(pathTilOversiktISelvbetjeningProd)}
                    >
                        Kopier lenke
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SendVarselModal;
