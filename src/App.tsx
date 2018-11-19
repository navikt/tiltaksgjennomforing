import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import { AvtaleProvider } from './AvtaleSide/AvtaleContext';
import { pathTilAvtale, pathTilKontaktinformasjon } from './paths';
import AvtaleSeksjon from './AvtaleSide/AvtaleSeksjon/AvtaleSeksjon';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AvtaleProvider>
                    <Switch>
                        <Route
                            path={pathTilAvtale(':avtaleId')}
                            exact={true}
                            component={AvtaleSeksjon}
                        />
                        <Route
                            path={pathTilKontaktinformasjon(':avtaleId')}
                            exact={false}
                            component={KontaktinfoSteg}
                        />
                    </Switch>
                </AvtaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
