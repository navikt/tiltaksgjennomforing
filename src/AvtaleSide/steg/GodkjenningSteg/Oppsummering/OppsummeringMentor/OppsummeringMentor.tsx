import { AltAvtaleinnhold, MentorAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { FunctionComponent } from 'react';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OmMentorOppsummering from './OmMentorOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    // Burde hatt typen MentorAvtaleinnhold, og droppet typesetting av prop under, men fikk problemer :/
    avtaleinnhold: AltAvtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = (props: { avtaleinnhold: MentorAvtaleinnhold }) => (
    <>
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringMentor;
