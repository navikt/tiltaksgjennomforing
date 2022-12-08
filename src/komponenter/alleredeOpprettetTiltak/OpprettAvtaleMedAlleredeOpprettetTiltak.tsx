import React, { CSSProperties, Dispatch, SetStateAction } from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import { Heading } from '@navikt/ds-react';
import AlleredeOpprettetAvtale from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtale';
import BEMHelper from '@/utils/bem';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    style?: CSSProperties;
}

const OpprettAvtaleMedAlleredeOpprettetTiltak: React.FC<Props> = ({
    alleredeRegistrertAvtale,
    setModalIsOpen,
    modalIsOpen,
}) => {
    const cls = BEMHelper('alleredeOpprettetAvtaleModal');

    return (
        <AlleredeOpprettetAvtaleModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
            <div className={cls.element('body')}>
                <div className={cls.element('tittel')}>
                    <Heading size="medium" id="Allerede registrerte tiltak for deltaker">
                        Allerede registrerte tiltak for deltaker
                    </Heading>
                </div>
                <AlleredeOpprettetAvtale alleredeRegistrertAvtale={alleredeRegistrertAvtale} />
            </div>
        </AlleredeOpprettetAvtaleModal>
    );
};
export default OpprettAvtaleMedAlleredeOpprettetTiltak;
