import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AktsomhetModal from '@/AvtaleSide/AktsomhetModal';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const KnappSomAapnerDekorator = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Åpne Aktsomhet Modal</button>
            <AktsomhetModal open={open} setGodkjent={() => setOpen(false)} />
        </>
    );
};

const reactRouterDecorator: any = (Story: any) => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/*" element={<Story />} />
            </Routes>
        </MemoryRouter>
    );
};

const meta = {
    title: 'Tiltaksgjennomforing/Aktsomhet',
    component: KnappSomAapnerDekorator,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    decorators: [reactRouterDecorator],
} satisfies Meta<typeof KnappSomAapnerDekorator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisAktsomhetModal: Story = {
    name: 'Dialog som vises ved åpning av avtale tilhørende deltaker med adressesperre',
};
