import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Tiltaksgjennomforing/Modaler/Bekreftelse',
    component: BekreftelseModal,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof BekreftelseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bekreftelse: Story = {
    name: 'Bekreftelsesmodal',
    args: {
        avbrytelseTekst: 'Avbryt',
        bekreftelseTekst: 'Bekreft',
        modalIsOpen: true,
        oversiktTekst: 'Overta avtale',
        descripedby: 'wut',
        children: <>Du må huske å oppdatere kontaktinformasjonen til veileder i avtalen.</>,
        bekreftOnClick: () => Promise.resolve(),
        lukkModal: () => {},
    },
};
