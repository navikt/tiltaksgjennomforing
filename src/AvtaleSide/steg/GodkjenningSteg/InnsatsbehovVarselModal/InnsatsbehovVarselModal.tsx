import { Box, Button, LocalAlert, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const InnsatsbehovVarselModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
    return (
        <Box paddingBlock="space-64">
            <Modal header={{ heading: 'Avtalen må signeres på nytt' }} open={isOpen} onClose={onClose}>
                <Modal.Body style={{ marginTop: '1.5rem', width: '100%' }}>
                    Deltakers innsatsbehov har endret seg, og avtalen må derfor signeres på nytt av alle parter.
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={onClose}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default InnsatsbehovVarselModal;
