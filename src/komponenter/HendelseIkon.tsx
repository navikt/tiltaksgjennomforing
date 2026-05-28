import { HendelseType } from '@/types/hendelse';
import {
    ArrowCirclepathReverseIcon,
    CalendarIcon,
    CheckmarkCircleIcon,
    ExclamationmarkTriangleIcon,
    FileIcon,
    PadlockUnlockedIcon,
    PaperplaneIcon,
    PencilIcon,
    PersonPlusIcon,
    SackKronerIcon,
    XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import type { FunctionComponent } from 'react';

interface Props {
    hendelse: HendelseType;
}

const hendelsesIkon: { [key in HendelseType]: JSX.Element } = {
    ENDRET: <PencilIcon />,
    OPPRETTET: <FileIcon />,
    OPPRETTET_AV_ARBEIDSGIVER: <FileIcon />,
    GODKJENT_AV_ARBEIDSGIVER: <CheckmarkCircleIcon />,
    GODKJENT_AV_DELTAKER: <CheckmarkCircleIcon />,
    SIGNERT_AV_MENTOR: <CheckmarkCircleIcon />,
    GODKJENT_AV_VEILEDER: <CheckmarkCircleIcon />,
    GODKJENT_PAA_VEGNE_AV: <CheckmarkCircleIcon />,
    GODKJENT_PAA_VEGNE_AV_ARBEIDSGIVER: <CheckmarkCircleIcon />,
    GODKJENT_PAA_VEGNE_AV_DELTAKER_OG_ARBEIDSGIVER: <CheckmarkCircleIcon />,
    GODKJENT_FOR_ETTERREGISTRERING: <CheckmarkCircleIcon />,
    FJERNET_ETTERREGISTRERING: <XMarkOctagonIcon />,
    LÅST_OPP: <PadlockUnlockedIcon />,
    ANNULLERT: <XMarkOctagonIcon />,
    AVBRUTT: <XMarkOctagonIcon />,
    GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER: <XMarkOctagonIcon />,
    GODKJENNINGER_OPPHEVET_AV_VEILEDER: <XMarkOctagonIcon />,
    DELT_MED_ARBEIDSGIVER: <PaperplaneIcon />,
    DELT_MED_DELTAKER: <PaperplaneIcon />,
    DELT_MED_MENTOR: <PaperplaneIcon />,
    SMS_VARSLING_FEILET: <ExclamationmarkTriangleIcon />,
    GJENOPPRETTET: <ArrowCirclepathReverseIcon />,
    NY_VEILEDER: <PersonPlusIcon />,
    AVTALE_FORDELT: <PersonPlusIcon />,
    TILSKUDDSPERIODE_AVSLATT: <XMarkOctagonIcon />,
    TILSKUDDSPERIODE_GODKJENT: <CheckmarkCircleIcon />,
    AVTALE_FORLENGET: <CalendarIcon />,
    AVTALE_FORKORTET: <CalendarIcon />,
    MÅL_ENDRET: <PencilIcon />,
    TILSKUDDSBEREGNING_ENDRET: <SackKronerIcon />,
    STILLINGSBESKRIVELSE_ENDRET: <PencilIcon />,
    KONTAKTINFORMASJON_ENDRET: <PencilIcon />,
    OPPFØLGING_OG_TILRETTELEGGING_ENDRET: <PencilIcon />,
    AVTALE_INNGÅTT: <CheckmarkCircleIcon />,
    INKLUDERINGSTILSKUDD_ENDRET: <SackKronerIcon />,
    OM_MENTOR_ENDRET: <PencilIcon />,
    OPPFØLGING_AV_TILTAK_UTFØRT: <CheckmarkCircleIcon />,
    KID_OG_KONTONUMMER_ENDRET: <PencilIcon />,
};

const HendelseIkon: FunctionComponent<Props> = (props) => {
    if (props.hendelse) {
        return hendelsesIkon[props.hendelse];
    } else {
        return null;
    }
};

export default HendelseIkon;
