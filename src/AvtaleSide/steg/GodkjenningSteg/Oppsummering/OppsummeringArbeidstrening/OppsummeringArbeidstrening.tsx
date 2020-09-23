import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { AltAvtaleinnhold, ArbeidstreningAvtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    // Burde hatt typen ArbeidstreningAvtaleinnhold, og droppet typesetting av prop under, men fikk problemer :/
    avtaleinnhold: AltAvtaleinnhold;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = (props: {
    avtaleinnhold: ArbeidstreningAvtaleinnhold;
}) => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const fritekstToggle = featureToggleContext[Feature.ArbeidsoppgaverFritekst];

    return (
        <>
            <MaalOppsummering {...props.avtaleinnhold} />
            {fritekstToggle ? (
                <StillingsOppsummering {...props.avtaleinnhold} />
            ) : (
                <OppgaverOppsummering {...props.avtaleinnhold} />
            )}
            <VarighetOppsummering {...props.avtaleinnhold} />
            <OppfolgingOppsummering {...props.avtaleinnhold} />
            <Tilrettelegging {...props.avtaleinnhold} />
        </>
    );
};

export default OppsummeringArbeidstrening;
