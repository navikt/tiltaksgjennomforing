import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Avtale from './avtale/Avtale';
import AvtaleOversikt from './avtale/AvtaleOversikt';
import './firebase';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                </header>
                <section>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                path={'/'}
                                exact={true}
                                component={AvtaleOversikt}
                            />
                            <Route
                                path={'/avtale/:avtaleId'}
                                component={Avtale}
                            />
                        </Switch>
                    </BrowserRouter>
                </section>
            </div>
        );
    }
}

export default App;
