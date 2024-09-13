import React from 'react';

import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import GodkjenningsInnhold from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/GodkjenningsInnhold';
import BEMHelper from '@/utils/bem';
import LagreOgAvbrytKnapp from '@/komponenter/lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';
import { AlleredeRegistrertAvtale } from '@/types/avtale';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLagre: () => Promise<void>;
    onLukk: () => void;
    isApen: boolean;
}

const GodkjennMedAlleredeOpprettetTiltak = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLagre, onLukk } = props;

    const cls = BEMHelper('godkjenn-alleredeOpprettet');

    return (
        <AlleredeOpprettetAvtaleModal isApen={isApen} onLukk={onLukk}>
            <GodkjenningsInnhold alleredeRegistrertAvtale={alleredeRegistrertAvtale}>
                <div className={cls.element('knapp-container')}>
                    <LagreOgAvbrytKnapp lagreFunksjon={onLagre} avbryt={onLukk} lagretekst="Godkjenn avtale" />
                </div>
            </GodkjenningsInnhold>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default GodkjennMedAlleredeOpprettetTiltak;
