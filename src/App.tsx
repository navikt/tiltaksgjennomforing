import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleSide/AvtaleContext';
import Stegside from './Stegside';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AvtaleProvider>
                    {/* <Stegmeny />*/}
                    <Route
                        path="/avtale/:avtaleId/:stegPath"
                        exact={true}
                        component={Stegside}
                    />
                    {/*                    <Switch>
                        <Route
                            path={pathTilKontaktinformasjonSteg(':avtaleId')}
                            exact={false}
                            component={KontaktinfoSteg}
                        />
                        <Route
                            path={pathTilMaalSteg(':avtaleId')}
                            exact={false}
                            component={MaalsetningSteg}
                        />
                        <Route
                            path={pathTilArbeidsoppgaverSteg(':avtaleId')}
                            exact={false}
                            component={ArbeidsoppgaverSteg}
                        />
                        <Route
                            path={pathTilArbeidstidSteg(':avtaleId')}
                            exact={false}
                            component={ArbeidstidSteg}
                        />
                        <Route
                            path={pathTilOppfolgingSteg(':avtaleId')}
                            exact={false}
                            component={OppfolgingSteg}
                        />
                        <Route
                            path={pathTilSigneringSteg(':avtaleId')}
                            exact={false}
                            component={BekreftelseSteg}
                        />
                    </Switch>*/}
                </AvtaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
