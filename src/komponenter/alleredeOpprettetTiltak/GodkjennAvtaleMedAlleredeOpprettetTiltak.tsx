import React, { Dispatch, SetStateAction, useContext } from 'react';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import GodkjenningsInnhold from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/GodkjenningsInnhold';
import { godkjennAvtale } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Button } from '@navikt/ds-react';

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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginLeft: '-3.5rem' }}>
                    <LagreKnapp lagre={() => godkjennAvtale({ godkjenn, setModalIsOpen })} label="Godkjenn avtale" />
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                        Avbryt
                    </Button>
                </div>
            </GodkjenningsInnhold>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default GodkjennAvtaleMedAlleredeOpprettetTiltak;
