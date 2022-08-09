import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import StartOgSluttdatoOppsummering from '../InkluderingstilskuddOppsummering/StartOgSluttdatoOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import OmMentorOppsummering from './OmMentorOppsummering';

interface Props {
    
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = (props) => (
    <>
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <StartOgSluttdatoOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringMentor;
