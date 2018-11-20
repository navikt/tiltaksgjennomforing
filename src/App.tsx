import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AvtaleProvider } from './Stegside/AvtaleContext';
import Stegside from './Stegside/Stegside';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <AvtaleProvider>
                    <Route
                        path="/avtale/:avtaleId/:stegPath"
                        exact={true}
                        component={Stegside}
                    />
                </AvtaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
