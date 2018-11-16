import * as React from 'react';
import { AvtaleProvider } from './AvtaleSide/avtaleContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import BekreftelseSteg from './AvtaleSide/AvtaleSeksjon/BekreftelseSteg';
import { AlleAvtalerProvider } from './AvtaleSide/avtaleOversiktcontext';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AlleAvtalerProvider>
                    <AvtaleProvider>
                        <Switch>
                            <Route
                                path="/:avtaleId/kontaktinfo"
                                exact={false}
                                component={KontaktinfoSteg}
                            />
                            <Route
                                path="/bekreftelse"
                                exact={true}
                                component={BekreftelseSteg}
                            />
                        </Switch>
                    </AvtaleProvider>
                </AlleAvtalerProvider>
            </BrowserRouter>
        );
    }
}

export default App;
