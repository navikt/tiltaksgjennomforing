import { AlleredeRegistrertAvtale } from '@/types/avtale';
import InfoModal from '@/komponenter/modal/InfoModal';
import { Alert, Heading } from '@navikt/ds-react';
import AlleredeOpprettetAvtale from './innholdsvisning/AlleredeOpprettetAvtale';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLagre: () => Promise<void>;
    onLukk: () => void;
    isApen: boolean;
}

const GodkjennMedAlleredeOpprettetTiltak = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLagre, onLukk } = props;

    return (
        <InfoModal width="medium" open={isApen} confirmText="Godkjenn avtale" onConfirm={onLagre} onClose={onLukk}>
            <Heading size="medium" spacing id="Allerede registrerte tiltak for deltaker">
                Godkjenning av avtale
            </Heading>
            <Alert variant="info" size="small">
                Du er i ferd med å godkjenne en avtale som har overlappende tidsrom, og/eller har påbegynte avtale(r) på
                deltaker sitt fødselsnummer.
            </Alert>
            <AlleredeOpprettetAvtale alleredeRegistrertAvtale={alleredeRegistrertAvtale} />
        </InfoModal>
    );
};
export default GodkjennMedAlleredeOpprettetTiltak;
