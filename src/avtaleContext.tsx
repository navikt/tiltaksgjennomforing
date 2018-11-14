import * as React from 'react';
import { Avtale } from './AvtaleSide/avtale';
import { hentAvtale } from './services/firebase';
import { tomAvtale } from './AvtaleSide/avtaleContext';

const AvtaleContext = React.createContext(tomAvtale);

export const AvtaleConsumer = AvtaleContext.Consumer;

export class AvtaleProvider extends React.Component<{}, Avtale> {
    constructor(props: {}) {
        super(props);
        this.state = tomAvtale;
    }

    componentWillMount() {
        hentAvtale('-LQIc8uXV0lEGTRPNwuG').then(avtale => {
            this.setState(avtale);
        });
    }

    render() {
        return (
            <AvtaleContext.Provider value={this.state}>
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
