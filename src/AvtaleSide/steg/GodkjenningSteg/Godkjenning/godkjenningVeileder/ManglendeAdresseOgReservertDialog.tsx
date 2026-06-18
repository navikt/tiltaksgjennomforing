import { Button, Dialog } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';

export const MANGLER_ADRESSE_OG_RESERVERT_FEILKODE = 'KAN_IKKE_SENDE_POST_MANGLER_ADRESSE_OG_RESERVERT';

interface Props {
    open: boolean;
    onClose: () => void;
}

const ManglendeAdresseOgReservertDialog = ({ open, onClose }: Props) => (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} size="small">
        <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
            <Dialog.Header>
                <Dialog.Title>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ExclamationmarkTriangleIcon aria-hidden fontSize="1.5rem" />
                        <span>Brev sendes ikke automatisk</span>
                    </span>
                </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <p>Brukeren har ingen registrert kontaktadresse og er reservert mot digital kommunikasjon</p>
                <p>
                    Brukeren vil derfor ikke motta et varsel, og vedtaket som journalføres i Gosys må skrives ut og
                    leveres på en annen måte.
                </p>
            </Dialog.Body>
            <Dialog.Footer>
                <Button type="button" onClick={onClose}>
                    OK
                </Button>
            </Dialog.Footer>
        </Dialog.Popup>
    </Dialog>
);

export default ManglendeAdresseOgReservertDialog;
