import { Meta, StoryObj } from '@storybook/react';
import HemmeligAdresseVarsel from '@/komponenter/Adressesperre/HemmeligAdresseVarsel';

const meta = {
    title: 'Tiltaksgjennomforing/HemmeligAdresseVarsel',
    component: HemmeligAdresseVarsel,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof HemmeligAdresseVarsel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisHemmeligAdresseVarsel: Story = {
    name: 'Varselsbanner som vises på avtalesiden for deltaker med adressesperre',
    args: {
        avtaleId: 'aktsomhet-avtale-1',
    },
};
