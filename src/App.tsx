import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Route } from 'react-router-dom';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import * as nb from 'react-intl/locale-data/nb';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { pathTilArbeidstrening } from './paths';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                </header>
                <section>
                    <IntlProvider locale="nb">
                        <BrowserRouter>
                            <Switch>
                                <Route
                                    path={'/'}
                                    exact={true}
                                    component={AvtaleOversikt}
                                />
                                <Route
                                    path={pathTilArbeidstrening(':avtaleId')}
                                    component={AvtaleSide}
                                />
                            </Switch>
                        </BrowserRouter>
                    </IntlProvider>
                </section>
            </div>
        );
    }
}

export default App;
