import { Meta, StoryObj } from '@storybook/react-vite';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import GodkjennAvtaleMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennAvtaleMedAlleredeOpprettetTiltak';

const meta = {
    title: 'Tiltaksgjennomforing/Modaler/GodkjennAvtaleModal',
    component: GodkjennAvtaleMedAlleredeOpprettetTiltak,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof GodkjennAvtaleMedAlleredeOpprettetTiltak>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GodkjennAvtale: Story = {
    name: 'Avtale er allerede opprettet',
    args: {
        onLukk: () => {},
        isApen: true,
        onLagre: () => Promise.resolve(),
        alleredeRegistrertAvtale: [
            {
                ...lonnstilskuddAvtaleMock,
                startDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.startDato!!,
                sluttDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.sluttDato!!,
                godkjentAvVeileder: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                godkjentAvBeslutter: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                avtaleInngått: lonnstilskuddAvtaleMock.godkjentAvVeileder!!,
            },
            {
                ...lonnstilskuddAvtaleMock,
                startDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.startDato!!,
                sluttDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.sluttDato!!,
                godkjentAvVeileder: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                godkjentAvBeslutter: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                avtaleInngått: lonnstilskuddAvtaleMock.godkjentAvVeileder!!,
            },
        ],
    },
};
