import * as React from 'react';
import { hentAvtaler, lagreAvtale } from '../services/firebase';
import { Avtale } from './avtale';
import { Route, withRouter } from 'react-router-dom';
import { Knapp } from 'nav-frontend-knapper';
import { Context, tomAvtale } from './avtaleContext';

const AvtaleContext = React.createContext({
    valgtAvtaleId: '',
    avtale: tomAvtale,
});

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: Avtale[];
    valgtAvtaleId: string;
    avtale: Avtale;
}

export class AlleAvtalerProviderr extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            avtaler: [],
            valgtAvtaleId: '',
            avtale: tomAvtale,
        };
        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
    }

    componentDidMount() {
        hentAvtaler().then(avtaler => {
            this.setState({ avtaler });
        });
    }

    settAvtaleVerdi(felt: string, verdi: any) {
        const avtale = { ...this.state.avtale };
        avtale[felt] = verdi;
        this.setState({ avtale });
    }

    lagreAvtale() {
        lagreAvtale(this.state.avtale);
    }

    render() {
        const avtaleLenker = this.state.avtaler.map(avtale => (
            <li key={avtale.id}>
                <Knapp
                    onClick={() => {
                        this.setState({
                            valgtAvtaleId: avtale.id,
                            avtale,
                        });
                        this.props.history.push(
                            '/' + avtale.id + '/kontaktinfo'
                        );
                    }}
                >
                    {avtale.id}
                </Knapp>
            </li>
        ));

        const context: Context = {
            avtale: this.state.avtale,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            valgtAvtaleId: this.state.valgtAvtaleId,
        };

        return (
            <AvtaleContext.Provider value={context}>
                <Route
                    path="/"
                    exact={true}
                    render={() => <ul>{avtaleLenker}</ul>}
                />
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const AlleAvtalerProvider = withRouter(AlleAvtalerProviderr);

// medAlleAvtalerContext
export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
