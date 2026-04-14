import React from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import InfoModal from '@/komponenter/modal/InfoModal';
import { Alert, Heading, LocalAlert } from '@navikt/ds-react';
import AlleredeOpprettetAvtale from './innholdsvisning/AlleredeOpprettetAvtale';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import VerticalSpacer from '../layout/VerticalSpacer';
import { FeilkodeError } from '@/types';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLagre: () => Promise<void>;
    onLukk: () => void;
    isApen: boolean;
}

const GodkjennMedAlleredeOpprettetTiltak = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLagre, onLukk } = props;
    const [error, setError] = React.useState<FeilkodeError | undefined>();

    const handleLagre = async () => {
        try {
            await onLagre();
        } catch (err) {
            if (err instanceof FeilkodeError) {
                setError(err);
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
            {error?.message === 'OPPFOLGINGSTATUS_ENDRET' && (
                <LocalAlert status="error" style={{ marginBottom: '2rem' }}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>Avtalen må signeres på nytt</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        Deltakers innsatsbehov har endret seg, og avtalen må derfor signeres på nytt av alle parter.
                    </LocalAlert.Content>
                </LocalAlert>
            )}
        </InfoModal>
    );
};
export default GodkjennMedAlleredeOpprettetTiltak;
