import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import Innloggingslinje from './Innloggingslinje/Innloggingslinje';
import LandingsSide from './LandingsSide/LandingsSide';
import OpprettAvtale from './OpprettAvtale/OpprettAvtale';
import OpprettelseFullfort from './OpprettAvtale/OpprettelseFullfort/OpprettelseFullfort';
import { basename } from './paths';
import RedirectEtterLogin from './RedirectEtterLogin';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb">
                <BrowserRouter basename={basename}>
                    <RedirectEtterLogin>
                        <Innloggingslinje>
                            <AvtaleProvider>
                                <Switch>
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
                                        path="/opprett-avtale/fullfort"
                                        exact={true}
                                        component={OpprettelseFullfort}
                                    />
                                    <Redirect to="/opprett-avtale" />
                                </Switch>
                            </AvtaleProvider>
                        </Innloggingslinje>
                    </RedirectEtterLogin>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
