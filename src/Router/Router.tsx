import * as React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import AdvarselBannerTestversjon from '@/AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import AlleredeOpprettetAvtaleProvider from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AvtaleFetcher from '@/AvtaleSide/AvtaleFetcher';
import AvtaleProvider from '@/AvtaleProvider';
import AvtaleSide from '@/AvtaleSide/AvtaleSide';
import BeslutterSide from '@/BeslutterSide/BeslutterSide';
import IkkeFunnet404 from '@/Router/IkkeFunnet404';
import Informasjonsside from '@/Informasjonsside/Informasjonsside';
import InnloggingBoundary from '@/InnloggingBoundary/InnloggingBoundary';
import OpprettAvtaleArbeidsgiver from '@/OpprettAvtale/OpprettAvtaleArbeidsgiver/OpprettAvtaleArbeidsgiver';
import OpprettAvtaleVeileder from '@/OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';
import Oversikt from '@/Oversikt';
import RedirectEtterLogin from '@/RedirectEtterLogin';
import Slettemerk from '@/komponenter/Slettemerk';
import { FeatureToggleProvider } from '@/FeatureToggleProvider';
import { FeilVarselProvider } from '@/FeilVarselProvider';
import { NotifikasjonWidgetProvider } from '@/NotifikasjonWidgetProvider';
import { VarselOmNedetid } from '@/InnloggingBoundary/VarselOmNedetid';
import ErrorBoundary from '@/komponenter/ErrorBoundary';
import AvtaleRouteError from '@/Router/AvtaleRouteError';
import OversiktRouteError from '@/Router/OversiktRouteError';

export const basename = '/tiltaksgjennomforing';

export enum Path {
    OVERSIKT = '/',
    INFORMASJONSSIDE = '/informasjonsside',
    OPPRETT_AVTALE = '/opprett-avtale',
    OPPRETT_AVTALE_ARBEIDSGIVER = '/opprett-avtale-arbeidsgiver',
    AVTALE = '/avtale/:avtaleId',
    AVTALE_STEG = '/avtale/:avtaleId/:steg',
    AVTALE_BESLUTTER = '/avtale/:avtaleId/beslutter',
    AVTALE_BESLUTTER_TILSKUDDSPERIODE = '/avtale/:avtaleId/beslutter/:tilskuddsperiodeId',
    AVTALE_SLETT = '/avtale/:avtaleId/slett',
}

const router = createBrowserRouter(
    [
        {
            path: Path.OVERSIKT,
            element: (
                <ErrorBoundary>
                    <AdvarselBannerTestversjon />
                    <VarselOmNedetid />
                    <Outlet />
                </ErrorBoundary>
            ),
            children: [
                {
                    path: '/*',
                    element: <IkkeFunnet404 />,
                },
                {
                    path: Path.INFORMASJONSSIDE,
                    element: <Informasjonsside />,
                },
                {
                    path: Path.OVERSIKT,
                    element: (
                        <FeilVarselProvider>
                            <InnloggingBoundary>
                                <FeatureToggleProvider>
                                    <RedirectEtterLogin>
                                        <AlleredeOpprettetAvtaleProvider>
                                            <NotifikasjonWidgetProvider>
                                                <Outlet />
                                            </NotifikasjonWidgetProvider>
                                        </AlleredeOpprettetAvtaleProvider>
                                    </RedirectEtterLogin>
                                </FeatureToggleProvider>
                            </InnloggingBoundary>
                        </FeilVarselProvider>
                    ),
                    errorElement: <OversiktRouteError />,
                    children: [
                        {
                            path: Path.OVERSIKT,
                            element: <Oversikt />,
                        },
                        {
                            path: Path.OPPRETT_AVTALE,
                            element: <OpprettAvtaleVeileder />,
                        },
                        {
                            path: Path.OPPRETT_AVTALE_ARBEIDSGIVER,
                            element: <OpprettAvtaleArbeidsgiver />,
                        },
                        {
                            path: Path.AVTALE,
                            element: (
                                <AvtaleProvider>
                                    <AvtaleFetcher>
                                        <Outlet />
                                    </AvtaleFetcher>
                                </AvtaleProvider>
                            ),
                            errorElement: <AvtaleRouteError />,
                            children: [
                                {
                                    path: Path.AVTALE,
                                    element: <AvtaleSide />,
                                },
                                {
                                    path: Path.AVTALE_STEG,
                                    element: <AvtaleSide />,
                                },
                                {
                                    path: Path.AVTALE_BESLUTTER,
                                    element: <BeslutterSide />,
                                },
                                {
                                    path: Path.AVTALE_BESLUTTER_TILSKUDDSPERIODE,
                                    element: <BeslutterSide />,
                                },
                                {
                                    path: Path.AVTALE_SLETT,
                                    element: <Slettemerk />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    { basename },
);

export default router;
