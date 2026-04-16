import OppfolgingOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold, Beregningsgrunnlag, TiltaksType } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import RelasjonerOppsummering from '../RelasjonerOppsummering/RelasjonerOppsummering';
import StillingsOppsummeringLonnstilskudd from '../StillingsOppsummeringLonnstilskudd/StillingsOppsummeringLonnstilskudd';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';

interface Props {
    avtaleinnhold: Avtaleinnhold;
    tiltakstype: TiltaksType;
}

const OppsummeringLonnstilskudd: FunctionComponent<Props> = (props: Props) => {
    const { avtaleinnhold, tiltakstype } = props;
    const { lonnstilskuddProsent, manedslonn } = avtaleinnhold;

    return (
        <>
            <DeltakerInfo oppsummeringside={true} />
            <Avtaleparter avtaleinnhold={avtaleinnhold} />
            <RelasjonerOppsummering {...avtaleinnhold} />
            <VerticalSpacer rem={2.5} />
            <StillingsOppsummeringLonnstilskudd {...avtaleinnhold} />
            <VarighetOppsummering {...avtaleinnhold} />
            <OppfolgingOppsummering {...avtaleinnhold} />
            <Tilrettelegging {...avtaleinnhold} />
            <BeregningTilskuddOppsummering
                {...avtaleinnhold}
                tiltakstype={tiltakstype}
                ekstraAvhengigFelter={{ lonnstilskuddProsent, manedslonn }}
                utregningPanelKomponent={UtregningPanel}
            />
        </>
    );
};

export default OppsummeringLonnstilskudd;
