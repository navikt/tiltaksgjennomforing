import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import OmMentorOppsummering from './OmMentorOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = props => (
    <>
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringMentor;
