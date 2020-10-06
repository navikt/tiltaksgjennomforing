import AvtaleFetcher from '@/AvtaleSide/AvtaleFetcher';
import BjelleVarselProvider from '@/BjelleVarselProvider';
import { messages } from '@/messages';
import OpprettelseFullfortArbeidsgiver from '@/OpprettAvtale/OpprettelseFullfortArbeidsgiver/OpprettelseFullfortArbeidsgiver';
import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import AvtaleOversikt from './AvtaleOversikt/AvtaleOversikt';
import AvtaleProvider from './AvtaleProvider';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import { FeilVarselProvider } from './FeilVarselProvider';
import Informasjonsside from './Informasjonsside/Informasjonsside';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';
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

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb" messages={messages}>
                <BrowserRouter basename={basename}>
                    <AdvarselBannerTestversjon />
                    <FeatureToggleProvider>
                        <Switch>
                            <Route path={pathTilInformasjonssideUinnlogget} exact={true} component={Informasjonsside} />
                            <FeilVarselProvider>
                                <InnloggingBoundary>
                                    <RedirectEtterLogin>
                                        <Route path="/" exact={true} component={AvtaleOversikt} />
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
                                            <BjelleVarselProvider>
                                                <Route
                                                    path={[
                                                        pathTilAvtale(':avtaleId'),
                                                        pathTilStegIAvtale(':avtaleId', ':stegPath'),
                                                    ]}
                                                    exact={true}
                                                    component={AvtaleFetcher}
                                                />
                                            </BjelleVarselProvider>
                                        </AvtaleProvider>
                                    </RedirectEtterLogin>
                                </InnloggingBoundary>
                            </FeilVarselProvider>
                        </Switch>
                    </FeatureToggleProvider>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
