import ArbeidsgiverAvtaleStatus from '@/AvtaleSide/AvtaleStatus/ArbeidsgiverAvtaleStatus';
import { Meta, StoryObj } from '@storybook/react';
import { AvbrytelseGrunn, AvtaleStatus } from '@/types/avtale';

const meta = {
    title: 'Tiltaksgjennomforing/Statuser/Arbeidsgiver',
    component: ArbeidsgiverAvtaleStatus,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ArbeidsgiverAvtaleStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const erUfordelt = {
    erUfordelt: true,
    statusSomEnum: 'ANNULLERT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ErUfordelt: Story = {
    name: 'Annullert',
    args: { avtale: erUfordelt },
};

const annullert = {
    erUfordelt: false,
    statusSomEnum: 'ANNULLERT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Annullert: Story = {
    name: 'Annullert',
    args: { avtale: annullert },
};

const avbrutt = {
    erUfordelt: false,
    statusSomEnum: 'AVBRUTT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    args: { avtale: avbrutt },
};

const påbegynt = {
    erUfordelt: false,
    statusSomEnum: 'PÅBEGYNT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Påbegynt: Story = {
    name: 'Påbegynt',
    args: { avtale: påbegynt },
};

const manglerGodkjenningArbeidsgiverHarIkkeGodkjent = {
    erUfordelt: false,
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ManglerGodkjenningArbeidsgiverHarIkkeGodkjent: Story = {
    name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda',
    args: { avtale: manglerGodkjenningArbeidsgiverHarIkkeGodkjent },
};

const manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV = {
    erUfordelt: false,
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '2024-05-03T12:26:24.40876',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ManglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV: Story = {
    name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: { avtale: manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV },
};

const manglerGodkjenningFraVeilederArbeidsgiverOgDeltakerHarGodkjent = {
    erUfordelt: false,
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '2024-05-03T12:26:24.40876',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ManglerGodkjenningFraVeilederArbeidsgiverOgDeltakerHarGodkjent: Story = {
    name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: { avtale: manglerGodkjenningFraVeilederArbeidsgiverOgDeltakerHarGodkjent },
};

const klarForOppstart = {
    erUfordelt: false,
    statusSomEnum: 'KLAR_FOR_OPPSTART' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const KlarForOppstart: Story = {
    name: 'Klar For Oppstart',
    args: { avtale: klarForOppstart },
};

const gjennomføres = {
    erUfordelt: false,
    statusSomEnum: 'GJENNOMFØRES' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2024-04-21',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Gjennomføres: Story = {
    name: 'Gjennomføres',
    args: { avtale: gjennomføres },
};

const avsluttet = {
    erUfordelt: false,
    statusSomEnum: 'AVSLUTTET' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Avsluttet: Story = {
    name: 'Avsluttet',
    args: { avtale: avsluttet },
};
