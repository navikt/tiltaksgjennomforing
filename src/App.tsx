import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AvtaleProvider } from './Stegside/AvtaleContext';
import Stegside from './Stegside/Stegside';
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
                            path="/avtale/:avtaleId/:stegPath"
                            exact={true}
                            component={Stegside}
                        />
                    </AvtaleProvider>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
