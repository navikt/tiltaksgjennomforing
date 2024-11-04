import React from 'react';
import { Heading } from '@navikt/ds-react';

import AlleredeOpprettetAvtale from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtale';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import InfoModal from '@/komponenter/modal/InfoModal';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLukk: () => void;
    isApen: boolean;
}

const OpprettAvtaleMedAlleredeOpprettetTiltak: React.FC<Props> = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLukk } = props;

    return (
        <InfoModal width="medium" onClose={onLukk} open={isApen}>
            <Heading size="medium" id="Allerede registrerte tiltak for deltaker">
                Allerede registrerte tiltak for deltaker
            </Heading>
            <AlleredeOpprettetAvtale alleredeRegistrertAvtale={alleredeRegistrertAvtale} />
        </InfoModal>
    );
};
export default OpprettAvtaleMedAlleredeOpprettetTiltak;
