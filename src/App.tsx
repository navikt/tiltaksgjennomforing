import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Route } from 'react-router-dom';
import * as nb from 'react-intl/locale-data/nb';
import { Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { AvtaleProvider, avtaleContext } from './AvtaleSide/avtaleContext';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';

addLocaleData(nb);

class App extends React.Component {
    render() {
        return (
            <AvtaleProvider>
                <IntlProvider locale="nb">
                    <Router>
                        <>
                            <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                            <Switch>
                                <Route
                                    path={'/'}
                                    exact={true}
                                    component={KontaktinfoSteg}
                                />
                            </Switch>
                            <avtaleContext.Consumer>
                                {obj => {
                                    console.log(obj); // tslint:disable-line no-console
                                    return null;
                                }}
                            </avtaleContext.Consumer>
                        </>
                    </Router>
                </IntlProvider>
            </AvtaleProvider>
        );
    }
}

export default App;
