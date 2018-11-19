import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { tomAvtale } from './AvtaleContext';

interface Props {
    avtaler: any;
    avtaleKlikk: (avtaleId: string) => void;
    opprettAvtaleKlikk: () => void;
}

class AvtaleOversikt extends React.Component<Props, {}> {
    render() {
        const avtaleLenker = Object.keys(this.props.avtaler).map(id => {
            const avtale = this.props.avtaler[id] || tomAvtale;
            return (
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
