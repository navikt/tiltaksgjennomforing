import React, { Dispatch, SetStateAction, useContext } from 'react';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import GodkjenningsInnhold from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/GodkjenningsInnhold';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { godkjennAvtalePaVegneAv } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import BEMHelper from '@/utils/bem';
import './godkjennAlleredeOpprettet.less';

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
    const style: React.CSSProperties = { maxWidth: '32.5rem' };
    const cls = BEMHelper('godkjenn-alleredeOpprettet');
    const { alleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);

    return (
        <AlleredeOpprettetAvtaleModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} style={style}>
            <GodkjenningsInnhold alleredeRegistrertAvtale={alleredeRegistrertAvtale}>
                <div className={cls.element('knapp-container')}>
                    <KnappBase
                        onClick={() => godkjennAvtalePaVegneAv({ godkjennPaVegneAv, setModalIsOpen })}
                        type="hoved"
                    >
                        Godkjenn avtale
                    </KnappBase>
                    <Knapp onClick={() => setModalIsOpen(false)}>Avbryt</Knapp>
                </div>
            </GodkjenningsInnhold>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default GodkjennPaVegneAvMedAlleredeOpprettetTiltak;
