import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { RouterProps } from 'react-router';
import { Link } from 'react-router-dom';
import { pathTilKontaktinformasjon } from '../paths';
import { hentAvtaler, opprettAvtale } from '../services/firebase';
import Avtale from './Avtale';

interface State {
    avtaler: Avtale[];
}

class AvtaleOversikt extends React.Component<RouterProps, State> {
    state: State = {
        avtaler: [],
    };

    componentDidMount() {
        hentAvtaler().then(avtaler => {
            this.setState({ avtaler });
        });
    }

    opprettAvtaleKlikk = () => {
        opprettAvtale().then(avtaleId => {
            this.props.history.push(pathTilKontaktinformasjon(avtaleId));
        });
    };

    render() {
        const avtaleLinker = this.state.avtaler.map((avtale: Avtale) => (
            <li key={avtale.id}>
                <Link to={pathTilKontaktinformasjon(avtale.id)}>
                    Avtale (opprettet: {avtale.opprettetTidspunkt})
                </Link>
            </li>
        ));

        return (
            <PanelBase>
                <ul>{avtaleLinker}</ul>
                <Knapp disabled={false} onClick={this.opprettAvtaleKlikk}>
                    Opprett avtale
                </Knapp>
            </PanelBase>
        );
    }
}

export default AvtaleOversikt;
