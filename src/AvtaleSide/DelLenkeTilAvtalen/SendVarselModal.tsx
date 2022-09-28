import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilOversiktISelvbetjeningProd } from '@/paths';
import { delAvtaleMedAvtalepart } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Knapp } from 'nav-frontend-knapper';
import { Link, Modal } from '@navikt/ds-react';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
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
            closeButton={true}
            open={props.isOpen}
            onClose={() => props.lukkModal()}
            aria-modal={props.isOpen}
        >
            <Modal.Content>
                <Systemtittel>Del lenke til avtalen</Systemtittel>
                <VerticalSpacer rem={1} />
                <Ingress>
                    Lenke til avtalen kan sendes på SMS hvis telefonnummer er registrert i avtalen. Hvis det er ønskelig
                    å sende lenke til avtalen via andre kanaler, for eksempel aktivitetsplanen eller e-post, er det
                    adressen under som må benyttes.
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
                {avtale.tiltakstype === 'MENTOR' && (
                    <LagreKnapp
                        label="Send til mentor"
                        lagre={() => delAvtaleMedAvtalepart(avtale.id, 'MENTOR')}
                        suksessmelding="SMS sendt til mentor"
                        knapptype={'standard'}
                    />
                )}

                <VerticalSpacer rem={2} />

                <Undertittel>Send lenke manuelt</Undertittel>
                <div className={cls.element('lenkedeling')}>
                    <div className={cls.element('lenke')}>
                        <Link href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Link>
                    </div>
                    <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                        <Knapp mini={true} className={cls.element('kopier-knapp')}>
                            Kopier lenke
                        </Knapp>
                    </CopyToClipboard>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default SendVarselModal;
