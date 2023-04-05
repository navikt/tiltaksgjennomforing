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
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
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
import {PropsWithChildren, ReactNode} from "react";
import {MemoryRouter} from "react-router";
type AppProps = {
    MedMemoryRouter?: Boolean
}
class App extends React.Component<AppProps> {
    render() {
        const LokalRouter = ({ children }: any) => {
            if(this.props.MedMemoryRouter){
                return (<MemoryRouter initialEntries={[basename]}>{ children }</MemoryRouter>)
            }
            return <BrowserRouter basename={basename}>{children}</BrowserRouter>
        }
        return (
            <ErrorBoundary>
                <IntlProvider locale="nb" messages={messages}>
                    <LokalRouter>
                        <AdvarselBannerTestversjon />
                        <VarselOmNedetid />
                        <Routes>
                            <Route path={pathTilInformasjonssideUinnlogget} element={<Informasjonsside />} />
                            <Route path="*"
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
                                                                    path={pathTilOpprettAvtaleFullfortVeileder(
                                                                        ':avtaleId'
                                                                    )}
                                                                    element={<OpprettelseFullfortVeileder />}
                                                                />
                                                                <Route
                                                                    path={pathTilOpprettAvtaleFullfortArbeidsgiver(
                                                                        ':avtaleId'
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
                                                                                            ':stegPath'
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
                    </LokalRouter>
                </IntlProvider>
            </ErrorBoundary>
        );
    }
}

export default App;
