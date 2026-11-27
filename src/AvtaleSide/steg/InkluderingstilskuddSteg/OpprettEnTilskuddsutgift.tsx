import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { Button, Heading, Modal, VStack } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import TilskuddsutgiftSkjema from './TilskuddsutgiftSkjema';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    leggTilTilskuddsutgift: (
        navn: string,
        beløp: number,
        beskrivelse: string,
        type: InkluderingstilskuddsutgiftType,
    ) => void;
    totalBeløp: number;
    inkluderingstilskuddSats: number;
};

const OpprettEnTilskuddsutgift: FunctionComponent<Props> = ({
    iRegideringsmodus,
    setIRedigeringsmodus,
    leggTilTilskuddsutgift,
    totalBeløp,
    inkluderingstilskuddSats,
}) => {
    const [leggertilTilskuddsutgift, setLeggertilTilskuddsutgift] = useState(false);

    const lukkModal = () => {
        setLeggertilTilskuddsutgift(false);
        setIRedigeringsmodus(false);
    };

    return (
        <VStack gap="space-32" align="start">
            <Heading level="2" size="medium">
                Legg til utgift
            </Heading>
            <Button
                type="button"
                variant="secondary"
                disabled={iRegideringsmodus}
                onClick={() => {
                    setIRedigeringsmodus(true);
                    setLeggertilTilskuddsutgift(true);
                }}
            >
                Legg til utgift
            </Button>
            <Modal open={leggertilTilskuddsutgift} onClose={lukkModal} header={{ heading: 'Ny utgift' }} width="medium">
                {leggertilTilskuddsutgift && (
                    <Modal.Body>
                        <TilskuddsutgiftSkjema
                            leggTilTilskuddsutgift={leggTilTilskuddsutgift}
                            totalBeløp={totalBeløp}
                            inkluderingstilskuddSats={inkluderingstilskuddSats}
                            lagretekst="Lagre"
                            onLagret={lukkModal}
                            onAvbryt={lukkModal}
                        />
                    </Modal.Body>
                )}
            </Modal>
        </VStack>
    );
};

export default OpprettEnTilskuddsutgift;
