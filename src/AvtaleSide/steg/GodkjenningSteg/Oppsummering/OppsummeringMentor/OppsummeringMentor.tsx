import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import StartOgSluttdatoOppsummering from '../InkluderingstilskuddOppsummering/StartOgSluttdatoOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import OmMentorOppsummering from './OmMentorOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = (props) => (
    <>
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <StartOgSluttdatoOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringMentor;
