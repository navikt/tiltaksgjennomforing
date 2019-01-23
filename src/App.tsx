import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import OpprettAvtale from './OpprettAvtale/OpprettAvtale';
import OpprettelseFullfort from './OpprettAvtale/OpprettelseFullfort/OpprettelseFullfort';
import LandingsSide from './LandingsSide/LandingsSide';
import { basename } from './paths';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb">
                <BrowserRouter basename={basename}>
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
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
