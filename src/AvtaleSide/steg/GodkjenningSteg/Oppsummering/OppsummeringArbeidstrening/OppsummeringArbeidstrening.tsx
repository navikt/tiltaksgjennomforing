import { ArbeidstreningAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { FunctionComponent } from 'react';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import ArbeidsoppgaverOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppgaveOppsummering/ArbeidsoppgaverOppsummering';
import { useContext } from 'react';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

interface Props {
    avtaleinnhold: ArbeidstreningAvtaleinnhold;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const fritekstToggle = featureToggleContext[Feature.ArbeidsoppgaverFritekst];

    return (
        <>
            <MaalOppsummering {...props.avtaleinnhold} />
            {fritekstToggle ? (
                <ArbeidsoppgaverOppsummering {...props.avtaleinnhold} />
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
