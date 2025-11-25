import { Meta, StoryObj } from '@storybook/react-vite';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import OpprettAvtaleMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/OpprettAvtaleMedAlleredeOpprettetTiltak';

const meta = {
    title: 'Tiltaksgjennomforing/Modaler/OpprettAvtaleModal',
    component: OpprettAvtaleMedAlleredeOpprettetTiltak,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof OpprettAvtaleMedAlleredeOpprettetTiltak>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlleredeOpprettetAvtale: Story = {
    name: 'Avtale er allerede opprettet',
    args: {
        onLukk: () => {},
        isApen: true,
        alleredeRegistrertAvtale: [
            {
                ...lonnstilskuddAvtaleMock,
                avtaleNr: 1,
                startDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.startDato!!,
                sluttDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.sluttDato!!,
                godkjentAvVeileder: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                godkjentAvBeslutter: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                avtaleInngått: lonnstilskuddAvtaleMock.godkjentAvVeileder!!,
            },
            {
                ...lonnstilskuddAvtaleMock,
                avtaleNr: 2,
                startDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.startDato!!,
                sluttDato: lonnstilskuddAvtaleMock.gjeldendeInnhold.sluttDato!!,
                godkjentAvVeileder: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                godkjentAvBeslutter: lonnstilskuddAvtaleMock.veilederNavIdent!!,
                avtaleInngått: lonnstilskuddAvtaleMock.godkjentAvVeileder!!,
            },
        ],
    },
};
