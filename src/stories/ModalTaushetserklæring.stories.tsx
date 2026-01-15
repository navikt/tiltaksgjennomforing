import { Meta, StoryObj } from '@storybook/react-vite';
import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import { MemoryRouter } from 'react-router-dom';

const meta = {
    title: 'Tiltaksgjennomforing/Modaler/Taushetserklæring',
    component: TaushetserklæringModal,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    decorators: (Story) => (
        <MemoryRouter initialEntries={['/']}>
            <Story />
        </MemoryRouter>
    ),
} satisfies Meta<typeof TaushetserklæringModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Taushetserklæring: Story = {
    name: 'Taushetserklæring for mentor',
    args: {
        open: true,
        togglesetTaushetserklæringForMentorAvtale: () => {},
        avtaleId: '1234',
        sistEndret: '2023',
    },
};
