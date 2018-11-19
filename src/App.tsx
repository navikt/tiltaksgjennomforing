import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import { AvtaleProvider } from './AvtaleSide/AvtaleContext';
import {
    pathTilArbeidsoppgaverSteg,
    pathTilArbeidstidSteg,
    pathTilKontaktinformasjonSteg,
    pathTilMaalSteg,
    pathTilOppfolgingSteg,
    pathTilSigneringSteg,
} from './paths';
import Stegmeny from './AvtaleSide/Stegmeny/Stegmeny';
import MaalsetningSteg from './AvtaleSide/AvtaleSeksjon/MaalsetningSteg';
import ArbeidsoppgaverSteg from './AvtaleSide/AvtaleSeksjon/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './AvtaleSide/AvtaleSeksjon/ArbeidstidSteg/ArbeidstidSteg';
import OppfolgingSteg from './AvtaleSide/AvtaleSeksjon/OppfolgingSteg';
import BekreftelseSteg from './AvtaleSide/AvtaleSeksjon/BekreftelseSteg';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AvtaleProvider>
                    <Stegmeny />
                    <Switch>
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
                    </Switch>
                </AvtaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
