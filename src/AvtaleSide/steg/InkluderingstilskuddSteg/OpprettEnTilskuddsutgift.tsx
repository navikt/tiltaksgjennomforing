import { Inkluderingstilskuddsutgift } from '@/types/avtale';
import { Button, Heading, Modal, VStack } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import TilskuddsutgiftSkjema, { TilskuddsutgiftSkjemaProps } from './TilskuddsutgiftSkjema';

type Props = Pick<
    TilskuddsutgiftSkjemaProps,
    'leggTilTilskuddsutgift' | 'ledigeInkluderingstilskuddtyper' | 'totalBeløp' | 'inkluderingstilskuddSats'
> & {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift[];
};

const OpprettEnTilskuddsutgift: FunctionComponent<Props> = ({
    iRegideringsmodus,
    setIRedigeringsmodus,
    tilskuddsutgift,
    ...skjemaProps
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
                Legg til ny utgift
            </Button>
            <Modal open={leggertilTilskuddsutgift} onClose={lukkModal} header={{ heading: 'Ny utgift' }} width="medium">
                {leggertilTilskuddsutgift && (
                    <Modal.Body>
                        <TilskuddsutgiftSkjema
                            {...skjemaProps}
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
