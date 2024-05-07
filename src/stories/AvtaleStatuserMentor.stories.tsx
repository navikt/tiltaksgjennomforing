import MentorAvtaleStatus from '@/AvtaleSide/AvtaleStatus/MentorAvtaleStatus';
import { Meta, StoryObj } from '@storybook/react';
import { AvbrytelseGrunn, AvtaleStatus } from '@/types/avtale';

const meta = {
    title: 'Tiltaksgjennomforing/Statuser/Mentor',
    component: MentorAvtaleStatus,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof MentorAvtaleStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const annullert = {
    statusSomEnum: 'ANNULLERT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
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
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
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
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
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

const manglerGodkjenning = {
    statusSomEnum: 'MANGLER_GODKJENNING' as AvtaleStatus,
    annullertTidspunkt: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    avbruttGrunn: 'Begynt i arbeid' as AvbrytelseGrunn,
    gjeldendeInnhold: {
        startDato: '2021-08-01',
        sluttDato: '2021-08-01',
    },
};

export const ManglerGodkjenning: Story = {
    name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: { avtale: manglerGodkjenning },
};

const klarForOppstart = {
    statusSomEnum: 'KLAR_FOR_OPPSTART' as AvtaleStatus,
    annullertTidspunkt: '',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
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
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
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
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
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
