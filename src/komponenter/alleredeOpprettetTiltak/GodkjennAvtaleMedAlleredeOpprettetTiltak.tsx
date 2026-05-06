import React from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import InfoModal from '@/komponenter/modal/InfoModal';
import { Alert, Heading } from '@navikt/ds-react';
import AlleredeOpprettetAvtale from './innholdsvisning/AlleredeOpprettetAvtale';
import { FeilkodeError } from '@/types';
import InnsatsbehovVarselModal from '@/AvtaleSide/steg/GodkjenningSteg/InnsatsbehovVarselModal/InnsatsbehovVarselModal';
import { useAvtale } from '@/AvtaleProvider';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLagre: () => Promise<void>;
    onLukk: () => void;
    isApen: boolean;
}

const GodkjennMedAlleredeOpprettetTiltak = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLagre, onLukk } = props;
    const { hentAvtale } = useAvtale();
    const [innsatsbehovVarselModalIsOpen, setInnsatsbehovVarselModalIsOpen] = React.useState(false);

    const handleLagre = async () => {
        try {
            await onLagre();
        } catch (err) {
            if (err instanceof FeilkodeError && err.message === 'OPPFOLGINGSTATUS_ENDRET') {
                setInnsatsbehovVarselModalIsOpen(true);
            } else {
                throw err;
            }
        }
    };

    return (
        <InfoModal width="medium" open={isApen} confirmText="Godkjenn avtale" onConfirm={handleLagre} onClose={onLukk}>
            <Heading size="medium" spacing id="Allerede registrerte tiltak for deltaker">
                Godkjenning av avtale
            </Heading>
            <Alert variant="info" size="small">
                Du er i ferd med å godkjenne en avtale som har overlappende tidsrom, og/eller har påbegynte avtale(r) på
                deltaker sitt fødselsnummer.
            </Alert>
            <AlleredeOpprettetAvtale alleredeRegistrertAvtale={alleredeRegistrertAvtale} />
            {innsatsbehovVarselModalIsOpen && (
                <InnsatsbehovVarselModal
                    isOpen={innsatsbehovVarselModalIsOpen}
                    onClose={() => {
                        setInnsatsbehovVarselModalIsOpen(false);
                        hentAvtale();
                    }}
                />
            )}
        </InfoModal>
    );
};
export default GodkjennMedAlleredeOpprettetTiltak;
