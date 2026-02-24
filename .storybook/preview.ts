import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '@/index.less';
import '@navikt/ds-css';
import { http, HttpResponse } from 'msw';

initialize();

const avtaleKreverAkstomhetHandler = [
    http.get('/tiltaksgjennomforing/api/avtaler/aktsomhet-avtale*/krever-aktsomhet', () => {
        return HttpResponse.json({ kreverAktsomhet: true });
    }),
    http.get('/tiltaksgjennomforing/api/avtaler/*/krever-aktsomhet', () => {
        return HttpResponse.json({ kreverAktsomhet: false });
    }),
];

const generelleMswHandlere = [...avtaleKreverAkstomhetHandler];

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        msw: {
            handlers: generelleMswHandlere,
        },
    },
    loaders: [mswLoader],
};

export default preview;
