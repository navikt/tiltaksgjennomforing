import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import StartOgSluttdatoOppsummering from '../InkluderingstilskuddOppsummering/StartOgSluttdatoOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import OmMentorOppsummering from './OmMentorOppsummering';
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Element} from "nav-frontend-typografi";
import TausetserklæringTekst from "@/AvtaleOversikt/Taushetserklæring/TaushetserklæringTekst";

interface Props {
    
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = (props) => (
    <>
        <DeltakerInfo oppsummeringside={true} />
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <OmMentorOppsummering {...props.avtaleinnhold} />
        <StartOgSluttdatoOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />


    </>
);

export default OppsummeringMentor;
