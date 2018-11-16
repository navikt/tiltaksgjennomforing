import * as React from 'react';
import { hentAvtaler } from '../services/firebase';
import { Avtale } from './avtale';
import { Redirect, Route } from 'react-router-dom';
import { Knapp } from 'nav-frontend-knapper';

const AvtaleContext = React.createContext({
    valgtAvtaleId: '',
});

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: Avtale[];
    valgtAvtaleId: string;
}

export class AlleAvtalerProvider extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            avtaler: [],
            valgtAvtaleId: '',
        };
    }

    componentDidMount() {
        hentAvtaler().then(avtaler => {
            this.setState({ avtaler });
        });
    }

    render() {
        const avtaleLenker = this.state.avtaler.map(avtale => (
            <li key={avtale.id}>
                <Knapp
                    onClick={() => {
                        this.setState({
                            valgtAvtaleId: avtale.id,
                        });
                    }}
                >
                    {avtale.id}
                </Knapp>
            </li>
        ));

        return (
            <AvtaleContext.Provider
                value={{
                    valgtAvtaleId: this.state.valgtAvtaleId,
                }}
            >
                <Route
                    path="/"
                    exact={true}
                    render={() => <ul>{avtaleLenker}</ul>}
                />
                {this.state.valgtAvtaleId.length !== 0 && (
                    <Redirect
                        from="/"
                        to={'/' + this.state.valgtAvtaleId + '/kontaktinfo'}
                        push={true}
                        exact={true}
                    />
                )}
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const medAlleAvtalerContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
