import { Meta, StoryObj } from '@storybook/react';
import HemmeligAdresseVarsel from '@/komponenter/Adressesperre/HemmeligAdresseVarsel';
import { http, HttpResponse } from 'msw';

const meta = {
    title: 'Tiltaksgjennomforing/HemmeligAdresseVarsel',
    component: HemmeligAdresseVarsel,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
        msw: {
            handlers: [
                http.get('/tiltaksgjennomforing/api/avtaler/aktsomhet-avtale-1/krever-aktsomhet', () => {
                    return HttpResponse.json({ kreverAktsomhet: false });
                }),
            ],
        },
    },
} satisfies Meta<typeof HemmeligAdresseVarsel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisHemmeligAdresseVarsel: Story = {
    name: 'Varselsbanner som vises på avtalesiden for deltaker med adressesperre',
    args: {
        avtaleId: 'aktsomhet-avtale-1',
    },
    parameters: {
        msw: {
            handlers: [
                http.get('/tiltaksgjennomforing/api/avtaler/aktsomhet-avtale-1/krever-aktsomhet', () => {
                    return HttpResponse.json({ kreverAktsomhet: false });
                }),
            ],
        },
    },
};
