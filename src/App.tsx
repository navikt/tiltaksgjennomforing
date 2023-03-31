import AvtaleFetcher from '@/AvtaleSide/AvtaleFetcher';
import AlleredeOpprettetAvtaleProvider from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { messages } from '@/messages';
import OpprettelseFullfortArbeidsgiver from '@/OpprettAvtale/OpprettelseFullfortArbeidsgiver/OpprettelseFullfortArbeidsgiver';
import Oversikt from '@/Oversikt';
// IE Support
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/nb';
import '@formatjs/intl-relativetimeformat/polyfill';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import AvtaleProvider from './AvtaleProvider';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import BeslutterSide from './BeslutterSide/BeslutterSide';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import { FeilVarselProvider } from './FeilVarselProvider';
import Informasjonsside from './Informasjonsside/Informasjonsside';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';
import { VarselOmNedetid } from './InnloggingBoundary/VarselOmNedetid';
import ErrorBoundary from './komponenter/ErrorBoundary';
import Slettemerk from './komponenter/Slettemerk';
import { NotifikasjonWidgetProvider } from './NotifikasjonWidgetProvider';
import OpprettAvtaleArbeidsgiver from './OpprettAvtale/OpprettAvtaleArbeidsgiver/OpprettAvtaleArbeidsgiver';
import OpprettAvtaleVeileder from './OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';
import OpprettelseFullfortVeileder from './OpprettAvtale/OpprettelseFullfortVeileder/OpprettelseFullfortVeileder';
import {
    basename,
    pathTilAvtale,
    pathTilInformasjonssideInnlogget,
    pathTilInformasjonssideUinnlogget,
    pathTilOpprettAvtale,
    pathTilOpprettAvtaleArbeidsgiver,
    pathTilOpprettAvtaleFullfortArbeidsgiver,
    pathTilOpprettAvtaleFullfortVeileder,
} from './paths';
import RedirectEtterLogin from './RedirectEtterLogin';

class App extends React.Component {
    render() {
        const beslutterSide = <BeslutterSide />;
        const BeslutterSideMultipulPath = () =>
            useRoutes(
                [
                    `${pathTilAvtale(':avtaleId')}/beslutte/`,
                    `${pathTilAvtale(':avtaleId')}/beslutte/:tilskuddsperiodeId`,
                ].map((path) => ({ path, beslutterSide }))
            );

        const avtaleSide = <AvtaleSide />;
        const AvtaleSideMultipulPath = () =>
            useRoutes(
                [`pathTilAvtale(':avtaleId')`, `pathTilStegIAvtale(':avtaleId',':stegPath'`].map((path) => ({
                    path,
                    avtaleSide,
                }))
            );

        return (
            <ErrorBoundary>
                <IntlProvider locale="nb" messages={messages}>
                    <BrowserRouter basename={basename}>
                        <AdvarselBannerTestversjon />
                        <VarselOmNedetid />
                        <Routes>
                            <Route path={pathTilInformasjonssideUinnlogget} element={<Informasjonsside />} />
                        </Routes>
                        <FeilVarselProvider>
                            <InnloggingBoundary>
                                <FeatureToggleProvider>
                                    <RedirectEtterLogin>
                                        <AlleredeOpprettetAvtaleProvider>
                                            <NotifikasjonWidgetProvider>
                                                <Routes>
                                                    <Route path="/" element={<Oversikt />} />
                                                    <Route
                                                        path={pathTilInformasjonssideInnlogget}
                                                        element={<Informasjonsside />}
                                                    />
                                                    <Route
                                                        path={pathTilOpprettAvtale}
                                                        element={<OpprettAvtaleVeileder />}
                                                    />
                                                    <Route
                                                        path={pathTilOpprettAvtaleArbeidsgiver}
                                                        element={<OpprettAvtaleArbeidsgiver />}
                                                    />
                                                    <Route
                                                        path={pathTilOpprettAvtaleFullfortVeileder(':avtaleId')}
                                                        element={<OpprettelseFullfortVeileder />}
                                                    />
                                                    <Route
                                                        path={pathTilOpprettAvtaleFullfortArbeidsgiver(':avtaleId')}
                                                        element={<OpprettelseFullfortArbeidsgiver />}
                                                    />
                                                </Routes>
                                                <AvtaleProvider>
                                                    <Routes>
                                                        <Route path={pathTilAvtale(':avtaleId')} />
                                                    </Routes>
                                                    <AvtaleFetcher>
                                                        <Routes>
                                                            <Route>
                                                                <BeslutterSideMultipulPath />
                                                            </Route>
                                                            <Route path={`${pathTilAvtale(':avtaleId')}/slett`}>
                                                                <Slettemerk />
                                                            </Route>
                                                            <Route>
                                                                <AvtaleSideMultipulPath />
                                                            </Route>
                                                        </Routes>
                                                    </AvtaleFetcher>
                                                </AvtaleProvider>
                                            </NotifikasjonWidgetProvider>
                                        </AlleredeOpprettetAvtaleProvider>
                                    </RedirectEtterLogin>
                                </FeatureToggleProvider>
                            </InnloggingBoundary>
                        </FeilVarselProvider>
                    </BrowserRouter>
                </IntlProvider>
            </ErrorBoundary>
        );
    }
}

export default App;
