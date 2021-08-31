import AvtaleFetcher from '@/AvtaleSide/AvtaleFetcher';
import { messages } from '@/messages';
import OpprettelseFullfortArbeidsgiver from '@/OpprettAvtale/OpprettelseFullfortArbeidsgiver/OpprettelseFullfortArbeidsgiver';
import Oversikt from '@/Oversikt';
// IE Support
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

//TODO: addLocaleData brukes for støtte av formater i gamle IE versjoner. Denner er deprecated
// se mer for ny måte: https://formatjs.io/docs/react-intl/upgrade-guide-3x/#migrate-to-using-native-intl-apis
//addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <IntlProvider locale="nb" messages={messages}>
                    <BrowserRouter basename={basename}>
                        <AdvarselBannerTestversjon />
                        <VarselOmNedetid />
                        <FeatureToggleProvider>
                            <Switch>
                                <Route
                                    path={pathTilInformasjonssideUinnlogget}
                                    exact={true}
                                    component={Informasjonsside}
                                />
                                <FeilVarselProvider>
                                    <InnloggingBoundary>
                                        <RedirectEtterLogin>
                                            <Route path="/" exact={true} component={Oversikt} />
                                            <Route
                                                path={pathTilInformasjonssideInnlogget}
                                                exact={true}
                                                component={Informasjonsside}
                                            />
                                            <Route
                                                path={pathTilOpprettAvtale}
                                                exact={true}
                                                component={OpprettAvtaleVeileder}
                                            />
                                            <Route
                                                path={pathTilOpprettAvtaleArbeidsgiver}
                                                exact={true}
                                                component={OpprettAvtaleArbeidsgiver}
                                            />
                                            <Route
                                                path={pathTilOpprettAvtaleFullfortVeileder(':avtaleId')}
                                                exact={true}
                                                component={OpprettelseFullfortVeileder}
                                            />
                                            <Route
                                                path={pathTilOpprettAvtaleFullfortArbeidsgiver(':avtaleId')}
                                                exact={true}
                                                component={OpprettelseFullfortArbeidsgiver}
                                            />
                                            <AvtaleProvider>
                                                <Route path={pathTilAvtale(':avtaleId')}>
                                                    <AvtaleFetcher>
                                                        <Switch>
                                                            <Route
                                                                path={[
                                                                    `${pathTilAvtale(':avtaleId')}/beslutte/`,
                                                                    `${pathTilAvtale(
                                                                        ':avtaleId'
                                                                    )}/beslutte/:tilskuddsperiodeId`,
                                                                ]}
                                                                exact={true}
                                                            >
                                                                <BeslutterSide />
                                                            </Route>
                                                            <Route exact path={`${pathTilAvtale(':avtaleId')}/slett`}>
                                                                <Slettemerk />
                                                            </Route>
                                                            <Route
                                                                path={[
                                                                    pathTilAvtale(':avtaleId'),
                                                                    pathTilStegIAvtale(':avtaleId', ':stegPath'),
                                                                ]}
                                                                exact={true}
                                                            >
                                                                <AvtaleSide />
                                                            </Route>
                                                        </Switch>
                                                    </AvtaleFetcher>
                                                </Route>
                                            </AvtaleProvider>
                                        </RedirectEtterLogin>
                                    </InnloggingBoundary>
                                </FeilVarselProvider>
                            </Switch>
                        </FeatureToggleProvider>
                    </BrowserRouter>
                </IntlProvider>
            </ErrorBoundary>
        );
    }
}

export default App;
