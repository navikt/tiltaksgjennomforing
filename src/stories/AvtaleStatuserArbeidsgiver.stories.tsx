import ArbeidsgiverAvtaleStatus from '@/AvtaleSide/AvtaleStatus/ArbeidsgiverAvtaleStatus';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Avtale, AvtaleStatus } from '@/types/avtale';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';

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

const erUfordelt: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: true,
    status: 'ANNULLERT',
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ErUfordelt: Story = {
    name: 'Annullert',
    args: { avtale: erUfordelt },
};

const annullert: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'ANNULLERT',
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Annullert: Story = {
    name: 'Annullert',
    args: { avtale: annullert },
};

const avbrutt: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'AVBRUTT' as AvtaleStatus,
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    args: { avtale: avbrutt },
};

const påbegynt: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'PÅBEGYNT',
    annullertTidspunkt: '2021-08-01',
    godkjentAvArbeidsgiver: '20-08-01',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Påbegynt: Story = {
    name: 'Påbegynt',
    args: { avtale: påbegynt },
};

const manglerGodkjenningArbeidsgiverHarIkkeGodkjent: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'MANGLER_GODKJENNING',
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ManglerGodkjenningArbeidsgiverHarIkkeGodkjent: Story = {
    name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda',
    args: { avtale: manglerGodkjenningArbeidsgiverHarIkkeGodkjent },
};

const manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'MANGLER_GODKJENNING',
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '2024-05-03T12:26:24.40876',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const ManglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltaker: Story = {
    name: 'Mangler Godkjenning Arbeidsgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: {
        avtale: {
            ...manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV,
            godkjentAvVeileder: '2024-05-03T12:26:24.40876',
        },
    },
};

export const ManglerGodkjenningArbeidsgiverOgDeltakerHarGodkjentMenIkkeVeileder: Story = {
    name: 'Mangler Godkjenning Arbeidsgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: {
        avtale: {
            ...manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV,
            godkjentAvDeltaker: '2024-05-03T12:26:24.40876',
        },
    },
};

export const ManglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgVeileder: Story = {
    name: 'Mangler Godkjenning Arbeidsgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
    args: { avtale: manglerGodkjenningArbeidsgiverHarGodkjentMenIkkeDeltakerOgNAV },
};

const klarForOppstart: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'KLAR_FOR_OPPSTART',
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2021-08-01',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const KlarForOppstart: Story = {
    name: 'Klar For Oppstart',
    args: { avtale: klarForOppstart },
};

const gjennomføres: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'GJENNOMFØRES',
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '2021-08-01',
    godkjentAvVeileder: '2021-08-01',
    avtaleInngått: '2024-04-21',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Gjennomføres: Story = {
    name: 'Gjennomføres',
    args: { avtale: gjennomføres },
};

const avsluttet: Avtale = {
    ...lonnstilskuddAvtaleMock,
    erUfordelt: false,
    status: 'AVSLUTTET',
    annullertTidspunkt: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvDeltaker: '',
    godkjentAvVeileder: '',
    avtaleInngått: '',
    annullertGrunn: 'annulert grunn',
    gjeldendeInnhold: {
        ...lonnstilskuddAvtaleMock.gjeldendeInnhold,
        startDato: '2024-05-01',
        sluttDato: '2025-04-30',
    },
};

export const Avsluttet: Story = {
    name: 'Avsluttet',
    args: { avtale: avsluttet },
};
