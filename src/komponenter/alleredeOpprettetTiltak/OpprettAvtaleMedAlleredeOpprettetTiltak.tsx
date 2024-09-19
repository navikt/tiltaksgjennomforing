import React from 'react';
import { Heading } from '@navikt/ds-react';

import AlleredeOpprettetAvtale from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtale';
import AlleredeOpprettetAvtaleModal from '@/komponenter/alleredeOpprettetTiltak/modal/AlleredeOpprettetAvtaleModal';
import BEMHelper from '@/utils/bem';
import { AlleredeRegistrertAvtale } from '@/types/avtale';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    onLukk: () => void;
    isApen: boolean;
}

const OpprettAvtaleMedAlleredeOpprettetTiltak: React.FC<Props> = (props: Props) => {
    const { alleredeRegistrertAvtale, isApen, onLukk } = props;

    const cls = BEMHelper('alleredeOpprettetAvtaleModal');

    return (
        <AlleredeOpprettetAvtaleModal isApen={isApen} onLukk={onLukk}>
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
