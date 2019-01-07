import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AvtaleProvider } from './AvtaleContext';
import AvtaleSide from './AvtaleSide/AvtaleSide';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';

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
                    </AvtaleProvider>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
