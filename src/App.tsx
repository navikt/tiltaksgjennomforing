import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import OpprettAvtale from './OpprettAvtale/OpprettAvtale';
import Bekreftelse from './OpprettAvtale/Bekreftelse/Bekreftelse';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="nb">
                <BrowserRouter>
                    <AvtaleProvider>
                        <Route
                            path="/tiltaksgjennomforing/avtale/:avtaleId/:stegPath"
                            exact={true}
                            component={AvtaleSide}
                        />
                        <Route
                            path="/tiltaksgjennomforing/opprett-avtale"
                            exact={true}
                            component={OpprettAvtale}
                        />
                        <Route
                            path="/tiltaksgjennomforing/opprett-avtale/fullfort"
                            exact={true}
                            component={Bekreftelse}
                        />
                    </AvtaleProvider>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
