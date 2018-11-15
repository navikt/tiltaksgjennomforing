import * as React from 'react';
import { AvtaleProvider } from './avtaleContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';

class App extends React.Component {
    render() {
        return (
            <AvtaleProvider>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/kontaktinfo"
                            exact={true}
                            component={KontaktinfoSteg}
                        />
                    </Switch>
                </BrowserRouter>
            </AvtaleProvider>
        );
    }
}

export default App;
