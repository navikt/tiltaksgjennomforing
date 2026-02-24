import IkkeTilgang403 from '@/Router/IkkeTilgang403';
import { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

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
    title: 'Tiltaksgjennomforing/IkkeTilgang403',
    component: IkkeTilgang403,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    decorators: [reactRouterDecorator],
} satisfies Meta<typeof IkkeTilgang403>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeTilgangKode6: Story = {
    name: 'Feilmelding som vises når veileder ikke har tilgang grunnet kode 6',
    args: { feilkode: 'IKKE_TILGANG_TIL_DELTAKER_STRENGT_FORTROLIG' },
};

export const IkkeTilgangKode7: Story = {
    name: 'Feilmelding som vises når veileder ikke har tilgang grunnet kode 7',
    args: { feilkode: 'IKKE_TILGANG_TIL_DELTAKER_FORTROLIG' },
};

export const IkkeTilgangEgneAnsatte: Story = {
    name: 'Feilmelding som vises når veileder ikke har tilgang grunnet egen ansatt',
    args: { feilkode: 'IKKE_TILGANG_TIL_DELTAKER_SKJERMET' },
};

export const IkkeTilgangUgradert: Story = {
    name: 'Feilmelding som vises når veileder ikke har tilgang til deltaker',
    args: { feilkode: 'IKKE_TILGANG_TIL_DELTAKER' },
};

export const IkkeTilgangArbeidsgiver: Story = {
    name: 'Feilmelding som vises når arbeidsgiver ikke har tilgang',
    args: { feilkode: 'IKKE_TILGANG_TIL_DELTAKER_ARBEIDSGIVER' },
};
