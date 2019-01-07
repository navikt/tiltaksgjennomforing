import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Avtale } from './avtale';

interface Props {
    avtaler: Map<string, Avtale>;
    avtaleKlikk: (avtaleId: string) => void;
    opprettAvtaleKlikk: () => void;
}

class AvtaleOversikt extends React.Component<Props, {}> {
    render() {
        const avtaleLenker: JSX.Element[] = [];

        this.props.avtaler.forEach((avtale: Avtale) => {
            avtaleLenker.push(
                <li key={avtale.id}>
                    <Knapp onClick={() => this.props.avtaleKlikk(avtale.id)}>
                        {avtale.id}: Opprettet {avtale.opprettetTidspunkt}
                    </Knapp>
                </li>
            );
        });

        const opprettAvtaleKnapp = (
            <Knapp onClick={this.props.opprettAvtaleKlikk}>
                Opprett avtale
            </Knapp>
        );

        return (
            <>
                <ul>{avtaleLenker}</ul>
                {opprettAvtaleKnapp}
            </>
        );
    }
}

export default AvtaleOversikt;
