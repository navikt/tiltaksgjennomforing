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
import { erNil } from '@/utils/predicates';

interface Props {
    avtaleinnhold: Avtaleinnhold;
    erAvtaleInngaatt: boolean;
}

const OppsummeringMentor = (props: Props) => {
    const { avtaleinnhold, erAvtaleInngaatt } = props;

    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { mentorTimelonn, mentorValgtLonnstype } = avtaleinnhold;

    const visInnholdFraEtterMigrering = !erAvtaleInngaatt || !erNil(mentorValgtLonnstype);
    return (
        <>
            <DeltakerInfo oppsummeringside={true} />
            <Avtaleparter avtaleinnhold={avtaleinnhold} />
            <RelasjonerOppsummering {...avtaleinnhold} />
            <VerticalSpacer rem={2.5} />
            <OmMentorOppsummering {...avtaleinnhold} visInnholdFraEtterMigrering={visInnholdFraEtterMigrering} />
            <StartOgSluttdatoOppsummering {...avtaleinnhold} />
            <OppfolgingOppsummering {...avtaleinnhold} />
            <Tilrettelegging {...avtaleinnhold} />
            {visInnholdFraEtterMigrering &&
                innloggetBruker.rolle !== 'DELTAKER' &&
                innloggetBruker.rolle !== 'MENTOR' && (
                    <BeregningTilskuddOppsummering
                        {...avtaleinnhold}
                        ekstraAvhengigFelter={{ mentorTimelonn }}
                        utregningPanelKomponent={UtregningPanelMentorTilskudd}
                    />
                )}
        </>
    );
};

export default OppsummeringMentor;
