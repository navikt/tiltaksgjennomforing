import React, { Dispatch, SetStateAction, useContext } from 'react';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import GodkjenningsInnhold from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/GodkjenningsInnhold';
import { Knapp } from 'nav-frontend-knapper';
import { godkjennAvtale } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';

interface Props {
    godkjenn: () => Promise<void>;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const GodkjennAvtaleMedAlleredeOpprettetTiltak: React.FC<Props> = ({ godkjenn, setModalIsOpen, modalIsOpen }) => {
    const { alleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);

    return (
        <AlleredeOpprettetAvtaleModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
            <GodkjenningsInnhold alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}>
                <div>
                    <LagreKnapp lagre={() => godkjennAvtale({ godkjenn, setModalIsOpen })} label="Godkjenn avtale" />
                    <Knapp onClick={() => setModalIsOpen(false)}>Avbryt</Knapp>
                </div>
            </GodkjenningsInnhold>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default GodkjennAvtaleMedAlleredeOpprettetTiltak;
