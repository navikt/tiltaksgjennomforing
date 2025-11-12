import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import StartOgSluttdatoOppsummering from '../InkluderingstilskuddOppsummering/StartOgSluttdatoOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import RelasjonerOppsummering from '../RelasjonerOppsummering/RelasjonerOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import OmMentorOppsummering from './OmMentorOppsummering';
import BeregningTilskuddOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringMentor: FunctionComponent<Props> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return (
        <>
            <DeltakerInfo oppsummeringside={true} />
            <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
            <RelasjonerOppsummering {...props.avtaleinnhold} />
            <VerticalSpacer rem={2.5} />
            <OmMentorOppsummering {...props.avtaleinnhold} />
            <StartOgSluttdatoOppsummering {...props.avtaleinnhold} />
            <OppfolgingOppsummering {...props.avtaleinnhold} />
            <Tilrettelegging {...props.avtaleinnhold} />
            {innloggetBruker.rolle !== 'DELTAKER' && (
                <BeregningTilskuddOppsummering
                    {...props.avtaleinnhold}
                    utregningComponent={UtregningPanelMentorTilskudd}
                />
            )}
        </>
    );
};

export default OppsummeringMentor;
