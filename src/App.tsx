import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import Informasjonsside from './Informajonsside/Informasjonsside';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';
import LandingsSide from './LandingsSide/LandingsSide';
import OpprettAvtale from './OpprettAvtale/OpprettAvtale';
import OpprettelseFullfort from './OpprettAvtale/OpprettelseFullfort/OpprettelseFullfort';
import {
    basename,
    pathTilAvtale,
    pathTilInformasjonssideInnlogget,
    pathTilInformasjonssideUinnlogget,
    pathTilOpprettAvtale,
    pathTilOpprettAvtaleFullfort,
    pathTilStegIAvtale,
} from './paths';
import RedirectEtterLogin from './RedirectEtterLogin';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb">
                <BrowserRouter basename={basename}>
                    <Switch>
                        <Route
                            path={pathTilInformasjonssideUinnlogget}
                            exact={true}
                            component={Informasjonsside}
                        />
                        <InnloggingBoundary>
                            <RedirectEtterLogin>
                                <Route
                                    path=""
                                    exact={true}
                                    component={AvtaleOversikt}
                                />
                                <Route
                                    path={pathTilInformasjonssideInnlogget}
                                    exact={true}
                                    component={Informasjonsside}
                                />
                                <Route
                                    path={pathTilOpprettAvtale}
                                    exact={true}
                                    component={OpprettAvtale}
                                />
                                <Route
                                    path={pathTilOpprettAvtaleFullfort(
                                        ':avtaleId'
                                    )}
                                    exact={true}
                                    component={OpprettelseFullfort}
                                />
                                <AvtaleProvider>
                                    <Route
                                        path={pathTilAvtale(':avtaleId')}
                                        exact={true}
                                        component={LandingsSide}
                                    />
                                    <Route
                                        path={pathTilStegIAvtale(
                                            ':avtaleId',
                                            ':stegPath'
                                        )}
                                        exact={true}
                                        component={AvtaleSide}
                                    />
                                </AvtaleProvider>
                            </RedirectEtterLogin>
                        </InnloggingBoundary>
                    </Switch>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
