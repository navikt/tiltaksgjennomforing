import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { Locked } from '@navikt/ds-icons';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const AktsomhetModal = ({ open, setGodkjent }: { open: boolean; setGodkjent: (x: boolean) => void }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    return (
        <Modal
            ref={ref}
            open={open}
            header={{
                icon: <Locked title="Lås" />,
                heading: 'Deltaker har adressebeskyttelse',
            }}
            onClose={() => {
                navigate(-1);
            }}
        >
            <Modal.Body>
                <BodyLong>
                    Denne personen har hemmelig adresse og du må derfor utvise aktsomhet. Du skal kun gjøre oppslag
                    dersom det er nødvendig for å levere tjenesten til denne personen. Nav logger ditt navn og tidspunkt
                    for oppslaget.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    onClick={() => {
                        setGodkjent(true);
                    }}
                >
                    Vis avtale
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Avslutt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AktsomhetModal;
