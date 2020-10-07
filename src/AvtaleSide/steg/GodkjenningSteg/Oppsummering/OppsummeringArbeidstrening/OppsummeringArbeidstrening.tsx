import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => {
    return (
        <>
            <MaalOppsummering {...props.avtaleinnhold} />
            <StillingsOppsummering {...props.avtaleinnhold} />
            <VarighetOppsummering {...props.avtaleinnhold} />
            <OppfolgingOppsummering {...props.avtaleinnhold} />
            <Tilrettelegging {...props.avtaleinnhold} />
        </>
    );
};

export default OppsummeringArbeidstrening;
