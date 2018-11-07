import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Route } from 'react-router-dom';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import { pathTilArbeidstrening } from './paths';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                </header>
                <section>
                    <Route path={'/'} exact={true} component={AvtaleOversikt} />
                    <Route
                        path={pathTilArbeidstrening(':avtaleId')}
                        component={AvtaleSide}
                    />
                </section>
            </div>
        );
    }
}

export default App;
