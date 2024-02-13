import AvtaleFetcher from '@/AvtaleSide/AvtaleFetcher';
import AlleredeOpprettetAvtaleProvider from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import OpprettelseFullfortArbeidsgiver from '@/OpprettAvtale/OpprettelseFullfortArbeidsgiver/OpprettelseFullfortArbeidsgiver';
import Oversikt from '@/Oversikt';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    pathTilStegIAvtale,
} from './paths';
import RedirectEtterLogin from './RedirectEtterLogin';

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <BrowserRouter basename={basename}>
                    <AdvarselBannerTestversjon />
                    <VarselOmNedetid />
                    <Routes>
                        <Route path={pathTilInformasjonssideUinnlogget} element={<Informasjonsside />} />
                        <Route
                            path="*"
                            element={
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
                                                                path={pathTilOpprettAvtaleFullfortArbeidsgiver(
                                                                    ':avtaleId',
                                                                )}
                                                                element={<OpprettelseFullfortArbeidsgiver />}
                                                            />
                                                        </Routes>
                                                        <Routes>
                                                            <Route
                                                                path={pathTilAvtale(':avtaleId/*')}
                                                                element={
                                                                    <AvtaleProvider>
                                                                        <AvtaleFetcher>
                                                                            <Routes>
                                                                                <Route
                                                                                    path="/"
                                                                                    element={<AvtaleSide />}
                                                                                />
                                                                                <Route
                                                                                    path="/:stegPath"
                                                                                    element={<AvtaleSide />}
                                                                                />

                                                                                <Route
                                                                                    path={`/beslutte/`}
                                                                                    element={<BeslutterSide />}
                                                                                />

                                                                                <Route
                                                                                    path={`/beslutte/:tilskuddsperiodeId`}
                                                                                    element={<BeslutterSide />}
                                                                                />

                                                                                <Route
                                                                                    path={`/slett`}
                                                                                    element={<Slettemerk />}
                                                                                />

                                                                                <Route
                                                                                    path={pathTilStegIAvtale(
                                                                                        ':avtaleId',
                                                                                        ':stegPath',
                                                                                    )}
                                                                                    element={<AvtaleSide />}
                                                                                />
                                                                            </Routes>
                                                                        </AvtaleFetcher>
                                                                    </AvtaleProvider>
                                                                }
                                                            />
                                                        </Routes>
                                                    </NotifikasjonWidgetProvider>
                                                </AlleredeOpprettetAvtaleProvider>
                                            </RedirectEtterLogin>
                                        </FeatureToggleProvider>
                                    </InnloggingBoundary>
                                </FeilVarselProvider>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        );
    }
}

export default App;
