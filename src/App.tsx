import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import BekreftelseSteg from './AvtaleSide/AvtaleSeksjon/BekreftelseSteg';
import { AlleAvtalerProvider } from './AvtaleSide/avtaleOversiktcontext';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AlleAvtalerProvider>
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
                </AlleAvtalerProvider>
            </BrowserRouter>
        );
    }
}

export default App;
