import { Avtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { FunctionComponent } from 'react';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OmMentorOppsummering from './OmMentorOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = props => (
    <>
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringMentor;
