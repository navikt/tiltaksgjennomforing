import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';
import LandingsSide from './LandingsSide/LandingsSide';
import OpprettAvtale from './OpprettAvtale/OpprettAvtale';
import OpprettelseFullfort from './OpprettAvtale/OpprettelseFullfort/OpprettelseFullfort';
import { basename } from './paths';
import RedirectEtterLogin from './RedirectEtterLogin';
import Informasjonsside from './Informajonsside/Informasjonsside';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb">
                <BrowserRouter basename={basename}>
                    <>
                        <Switch>
                            <Route
                                path="/informasjonsside/uinnlogget"
                                exact={true}
                                component={Informasjonsside}
                            />
                            <InnloggingBoundary>
                                <RedirectEtterLogin>
                                    <AvtaleProvider>
                                        <Route
                                            path="/avtale/:avtaleId"
                                            exact={true}
                                            component={LandingsSide}
                                        />
                                        <Route
                                            path="/avtale/:avtaleId/:stegPath"
                                            exact={true}
                                            component={AvtaleSide}
                                        />
                                        <Route
                                            path="/opprett-avtale"
                                            exact={true}
                                            component={OpprettAvtale}
                                        />
                                        <Route
                                            path="/opprett-avtale-fullfort/:avtaleId"
                                            exact={true}
                                            component={OpprettelseFullfort}
                                        />
                                        <Route
                                            path=""
                                            exact={true}
                                            component={AvtaleOversikt}
                                        />
                                        <Route
                                            path="/informasjonsside/innlogget"
                                            exact={true}
                                            component={Informasjonsside}
                                        />
                                    </AvtaleProvider>
                                </RedirectEtterLogin>
                            </InnloggingBoundary>
                        </Switch>
                    </>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
