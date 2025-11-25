import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import { Status } from '@/types/nettressurs';
import { CookiesProvider } from 'react-cookie';
import { Diskresjonskode } from '@/types';

const cookiesDectorator: any = (Story: any) => {
    return (
        <CookiesProvider>
            <Story />
        </CookiesProvider>
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
    title: 'Tiltaksgjennomforing/Avtaler',
    component: Avtaler,
    decorators: [reactRouterDecorator, cookiesDectorator],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Avtaler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvtaleTabellForArbeidsgiver: Story = {
    name: 'Avtaler med kode 6 for arbeidsgiver',
    args: {
        innloggetBruker: {
            rolle: 'ARBEIDSGIVER',
            erNavAnsatt: false,
            identifikator: '12345678901',
            altinnOrganisasjoner: [],
            tilganger: { '12345678': ['MENTOR'] },
            navEnheter: [],
        },
        varsler: [],
        avtalelisteRessurs: {
            status: Status.LASTET,
            data: {
                avtaler: [
                    {
                        bedriftNavn: 'Testbedrift AS',
                        id: '123456789',
                        deltakerFornavn: 'Steinar',
                        deltakerEtternavn: 'Strengt Fortrolig',
                        diskresjonskode: Diskresjonskode.STRENGT_FORTROLIG,
                        opprettetTidspunkt: '2023-01-01T12:00:00Z',
                        veilederNavIdent: 'Z123456',
                        status: 'GJENNOMFØRES',
                        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
                        sluttDato: '2023-12-31',
                        startDato: '2023-01-15',
                        erGodkjentTaushetserklæringAvMentor: false,
                        gjeldendeTilskuddsperiodeStatus: 'GODKJENT',
                        sistEndret: '2023-06-01T12:00:00Z',
                    },
                    {
                        bedriftNavn: 'Testbedrift AS',
                        id: '234567890',
                        deltakerFornavn: 'Ståle ',
                        deltakerEtternavn: 'Strengt Fortrolig Utland',
                        diskresjonskode: Diskresjonskode.STRENGT_FORTROLIG_UTLAND,
                        opprettetTidspunkt: '2023-01-01T12:00:00Z',
                        veilederNavIdent: 'Z123456',
                        status: 'GJENNOMFØRES',
                        tiltakstype: 'MENTOR',
                        sluttDato: '2023-12-31',
                        startDato: '2023-01-15',
                        erGodkjentTaushetserklæringAvMentor: false,
                        gjeldendeTilskuddsperiodeStatus: 'GODKJENT',
                        sistEndret: '2023-06-01T12:00:00Z',
                    },
                    {
                        bedriftNavn: 'Testbedrift AS',
                        id: '345678901',
                        deltakerFornavn: 'Ole',
                        deltakerEtternavn: 'Fortrolig',
                        diskresjonskode: Diskresjonskode.FORTROLIG,
                        opprettetTidspunkt: '2023-01-01T12:00:00Z',
                        veilederNavIdent: 'Z123456',
                        status: 'GJENNOMFØRES',
                        tiltakstype: 'MENTOR',
                        sluttDato: '2023-12-31',
                        startDato: '2023-01-15',
                        erGodkjentTaushetserklæringAvMentor: false,
                        gjeldendeTilskuddsperiodeStatus: 'GODKJENT',
                        sistEndret: '2023-06-01T12:00:00Z',
                    },
                    {
                        bedriftNavn: 'Testbedrift AS',
                        id: '456789012',
                        deltakerFornavn: 'Unn',
                        deltakerEtternavn: 'Ugradert',
                        diskresjonskode: Diskresjonskode.UGRADERT,
                        opprettetTidspunkt: '2023-01-01T12:00:00Z',
                        veilederNavIdent: 'Z123456',
                        status: 'GJENNOMFØRES',
                        tiltakstype: 'VTAO',
                        sluttDato: '2023-12-31',
                        startDato: '2023-01-15',
                        erGodkjentTaushetserklæringAvMentor: false,
                        gjeldendeTilskuddsperiodeStatus: 'GODKJENT',
                        sistEndret: '2023-06-01T12:00:00Z',
                    },
                ],
                currentPage: 1,
                size: 100,
                sokeParametere: {},
                sokId: '00000000',
                sorteringskolonne: 'opprettetTidspunkt',
                sorteringOrder: 'DESC',
                totalItems: 50,
                totalPages: 5,
            },
        },
    },
};
