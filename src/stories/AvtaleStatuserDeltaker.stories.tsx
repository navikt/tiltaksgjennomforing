import DeltakerAvtaleStatus from '@/AvtaleSide/AvtaleStatus/DeltakerAvtaleStatus';
import { Meta, StoryObj } from '@storybook/react';
import { AvbrytelseGrunn, AvtaleStatus } from '@/types/avtale';

const meta = {
    title: 'Tiltaksgjennomforing/Statuser/Deltaker',
    component: DeltakerAvtaleStatus,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof DeltakerAvtaleStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const annullert = {
    statusSomEnum: 'ANNULLERT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvDeltaker: '20-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const Annullert: Story = {
    name: 'Annullert',
    args: { avtale: annullert },
};

const avbrutt = {
    statusSomEnum: 'AVBRUTT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvDeltaker: '20-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    args: { avtale: avbrutt },
};

const påbegynt = {
    statusSomEnum: 'PÅBEGYNT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvDeltaker: '20-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const Påbegynt: Story = {
    name: 'Påbegynt',
    args: { avtale: påbegynt },
};

const manglerGodkjenningDeltakerHarGodkjent = {
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvDeltaker: '2024-05-03T12:26:24.40876',
    godkjentAvArbeidsgiver: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const ManglerGodkjenningDeltakerHarGodkjentMenIkkeArbeidsgiver: Story = {
    name: 'Mangler Godkjenning: Deltaker har godkjent men manger godkjenning av Arbeidsgiver',
    args: { avtale: { ...manglerGodkjenningDeltakerHarGodkjent, godkjentAvVeileder: '2021-08-01' } },
};

export const ManglerGodkjenningDeltakerHarGodkjentMenIkkeVeileder: Story = {
    name: 'Mangler Godkjenning: Deltaker har godkjent men manger godkjenning av Veileder',
    args: { avtale: { ...manglerGodkjenningDeltakerHarGodkjent, godkjentAvArbeidsgiver: '2021-08-01' } },
};

export const ManglerGodkjenningDeltakerHarGodkjentMenIkkeArbeidsgiverOgVeileder: Story = {
    name: 'Mangler Godkjenning: Deltaker har godkjent men manger godkjenning av Arbeidsgiver og Veileder',
    args: {
        avtale: manglerGodkjenningDeltakerHarGodkjent,
    },
};

const manglerGodkjenningDeltakerHarIkkeGodkjent = {
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvDeltaker: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const ManglerGodkjenningDeltakerHarIkkeGodkjent: Story = {
    name: ' Mangler Godkjenning Deltaker har ikke godkjent avtalen enda',
    args: { avtale: manglerGodkjenningDeltakerHarIkkeGodkjent },
};

const klarForOppstart = {
    statusSomEnum: 'KLAR_FOR_OPPSTART' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvDeltaker: '',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const KlarForOppstart: Story = {
    name: 'Klar For Oppstart',
    args: { avtale: klarForOppstart },
};

const gjennomføres = {
    statusSomEnum: 'GJENNOMFØRES' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvDeltaker: '',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const Gjennomføres: Story = {
    name: 'Gjennomføres',
    args: { avtale: gjennomføres },
};

const avsluttet = {
    statusSomEnum: 'AVSLUTTET' as AvtaleStatus,
    annullertTidspunkt: '',
    godkjentAvDeltaker: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttDato: '2021-08-01',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const Avsluttet: Story = {
    name: 'Avsluttet',
    args: { avtale: avsluttet },
};
