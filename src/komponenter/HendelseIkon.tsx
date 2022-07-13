import { ReactComponent as ArkIkon } from '@/assets/ikoner/ark.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/avbrutt-avtale.svg';
import { ReactComponent as EndretIkon } from '@/assets/ikoner/endret.svg';
import { ReactComponent as GjenopprettIkon } from '@/assets/ikoner/gjenoppretteAvtaleIkon.svg';
import { ReactComponent as LastOppIkon } from '@/assets/ikoner/hengelas-apen.svg';
import { ReactComponent as PengeIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as OpphevetIkon } from '@/assets/ikoner/opphevet-godkjenninger.svg';
import { ReactComponent as GodkjentIkon } from '@/assets/ikoner/sirkel-check.svg';
import { ReactComponent as VeilederIkon } from '@/assets/ikoner/veileder.svg';
import { HendelseType } from '@/types/hendelse';
import { Calender } from '@navikt/ds-icons/cjs';
import React, { FunctionComponent } from 'react';

interface Props {
    hendelse: HendelseType;
}

const hendelsesIkon: { [key in HendelseType]: JSX.Element } = {
    ENDRET: <EndretIkon />,
    OPPRETTET: <ArkIkon />,
    OPPRETTET_AV_ARBEIDSGIVER: <ArkIkon />,
    GODKJENT_AV_ARBEIDSGIVER: <GodkjentIkon />,
    GODKJENT_AV_DELTAKER: <GodkjentIkon />,
    SIGNERT_AV_MENTOR: <GodkjentIkon />,
    GODKJENT_AV_VEILEDER: <GodkjentIkon />,
    GODKJENT_PAA_VEGNE_AV: <GodkjentIkon />,
    GODKJENT_PAA_VEGNE_AV_ARBEIDSGIVER: <GodkjentIkon />,
    GODKJENT_PAA_VEGNE_AV_DELTAKER_OG_ARBEIDSGIVER: <GodkjentIkon />,
    GODKJENT_FOR_ETTERREGISTRERING: <GodkjentIkon />,
    FJERNET_ETTERREGISTRERING: <OpphevetIkon />,
    LÅST_OPP: <LastOppIkon />,
    ANNULLERT: <AvbruttIkon />,
    AVBRUTT: <AvbruttIkon />,
    GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER: <OpphevetIkon />,
    GODKJENNINGER_OPPHEVET_AV_VEILEDER: <OpphevetIkon />,
    DELT_MED_ARBEIDSGIVER: <></>,
    DELT_MED_DELTAKER: <></>,
    SMS_VARSLING_FEILET: <></>,
    GJENOPPRETTET: <GjenopprettIkon />,
    NY_VEILEDER: <VeilederIkon />,
    AVTALE_FORDELT: <VeilederIkon />,
    TILSKUDDSPERIODE_AVSLATT: <OpphevetIkon />,
    TILSKUDDSPERIODE_GODKJENT: <GodkjentIkon />,
    AVTALE_FORLENGET: <Calender />,
    AVTALE_FORKORTET: <Calender />,
    MÅL_ENDRET: <EndretIkon />,
    TILSKUDDSBEREGNING_ENDRET: <PengeIkon />,
    STILLINGSBESKRIVELSE_ENDRET: <EndretIkon />,
    KONTAKTINFORMASJON_ENDRET: <EndretIkon />,
    OPPFØLGING_OG_TILRETTELEGGING_ENDRET: <EndretIkon />,
    AVTALE_INNGÅTT: <GodkjentIkon />,
    INKLUDERINGSTILSKUDD_ENDRET: <PengeIkon />
};

const HendelseIkon: FunctionComponent<Props> = (props) => {
    if (props.hendelse) {
        return hendelsesIkon[props.hendelse];
    } else {
        return null;
    }
};

export default HendelseIkon;
