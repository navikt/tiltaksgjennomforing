import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import AvtaleWizard from './AvtaleWizard';

class App extends React.Component {
    public render() {
        // tslint:disable jsx-no-lambda
        // tslint:disable no-empty
        return (
            <div>
                <header>
                    <Sidetittel>Avtale om arbeidstrening</Sidetittel>
                </header>
                <section>
                    <AvtaleWizard />
                </section>
            </div>
        );
    }
}

export default App;
