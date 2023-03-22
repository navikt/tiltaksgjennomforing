import React, { Dispatch, SetStateAction, useContext } from 'react';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import GodkjenningsInnhold from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/GodkjenningsInnhold';
import { godkjennAvtalePaVegneAv } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import BEMHelper from '@/utils/bem';
import LagreOgAvbrytKnapp from '@/komponenter/lagreOgAvbrytKnapp/LagreOgAvbrytKnapp';

interface Props {
    godkjennPaVegneAv: () => void | Promise<void>;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const GodkjennPaVegneAvMedAlleredeOpprettetTiltak: React.FC<Props> = ({
    godkjennPaVegneAv,
    modalIsOpen,
    setModalIsOpen,
}) => {
    const style: React.CSSProperties = { maxWidth: '40rem' };
    const cls = BEMHelper('godkjenn-alleredeOpprettet');
    const { alleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);

    return (
        <AlleredeOpprettetAvtaleModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} style={style}>
            <GodkjenningsInnhold alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}>
                <div className={cls.element('knapp-container')}>
                    <LagreOgAvbrytKnapp
                        lagreFunksjon={() =>
                            godkjennAvtalePaVegneAv({ godkjennPaVegneAv }).then(() => setModalIsOpen(false))
                        }
                        avbryt={() => setModalIsOpen(false)}
                        lagretekst="Godkjenn avtale"
                    />
                </div>
            </GodkjenningsInnhold>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default GodkjennPaVegneAvMedAlleredeOpprettetTiltak;
