import { Box, Button, Modal } from '@navikt/ds-react';
import './InnsatsbehovVarselModal.less';

interface Props {
    onClose: () => void;
}

const InnsatsbehovVarselModal = ({ onClose }: Props) => {
    return (
        <Box paddingBlock="space-64">
            <Modal header={{ heading: 'Avtalen må signeres på nytt' }} open onClose={onClose}>
                <Modal.Body className="innsatsbehovVarselModal__body">
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
