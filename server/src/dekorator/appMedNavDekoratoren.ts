import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Request, Response } from 'express';

import { ENV } from '../config';

export async function getNavdekoratoren(indexFilepath: string, req: Request, res: Response): Promise<void> {
    const context = req.cookies['innlogget-part'] === 'DELTAKER' ? 'privatperson' : 'arbeidsgiver';
    try {
        const html = await injectDecoratorServerSide({
            env: ENV,
            filePath: indexFilepath,
            params: {
                context,
                chatbot: true,
                redirectToApp: true,
                level: 'Level4',
                language: 'en',
                redirectToUrlLogout: '/tiltaksgjennomforing',
                chatbotVisible: true,
            },
        });

        res.send(html);
    } catch (error) {
        console.log('Feil ved henting av dekorator: ', error);
    }
}
