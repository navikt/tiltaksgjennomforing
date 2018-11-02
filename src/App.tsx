import * as firebase from 'firebase/app';
import 'firebase/database';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Avtale from './avtale/Avtale';
import AvtaleOversikt from './avtale/AvtaleOversikt';

firebase.initializeApp({
    apiKey: 'AIzaSyC0lxgrU_SleTgL72TtFUO7yEyrN2ihjI4',
    authDomain: 'tiltaksgjennomforing.firebaseapp.com',
    databaseURL: 'https://tiltaksgjennomforing.firebaseio.com',
    projectId: 'tiltaksgjennomforing',
    storageBucket: 'tiltaksgjennomforing.appspot.com',
    messagingSenderId: '134856989400',
});

class App extends React.Component {
    public render() {
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
                                render={(props: any) => (
                                    <AvtaleOversikt
                                        firebase={firebase}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={'/avtale/:avtaleId'}
                                render={(props: any) => (
                                    <Avtale
                                        firebase={firebase}
                                        avtaleId={props.match.params.avtaleId}
                                    />
                                )}
                            />
                        </Switch>
                    </BrowserRouter>
                </section>
            </div>
        );
    }
}

export default App;
