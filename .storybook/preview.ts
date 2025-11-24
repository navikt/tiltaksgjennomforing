import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '@/index.less';
import '@navikt/ds-css';
import { http, HttpResponse } from 'msw';

initialize();

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
            handlers: [
                http.get('/tiltaksgjennomforing/api/avtaler/aktsomhet-avtale-1/krever-aktsomhet', () => {
                    return HttpResponse.json({ kreverAktsomhet: true });
                }),
            ],
        },
    },
    loaders: [mswLoader],
};

export default preview;
