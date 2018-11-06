import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Route } from 'react-router-dom';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import './firebase';
import AvtaleSide from './AvtaleSide/AvtaleSide';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                </header>
                <section>
                    <Route path={'/'} exact={true} component={AvtaleOversikt} />
                    <Route path={'/avtale/:avtaleId'} component={AvtaleSide} />
                </section>
            </div>
        );
    }
}

export default App;
