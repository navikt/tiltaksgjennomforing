import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { hentAvtaler, opprettAvtale } from '../services/firebase';
import { RouterProps } from 'react-router';
import AvtaleModell from './AvtaleModell';
import { pathTilKontaktinformasjon } from '../paths';

const Avtaler = (props: { avtaler: AvtaleModell[] }) => {
    const avtaleLinker = props.avtaler.map((avtale: AvtaleModell) => (
        <li key={avtale.id}>
            <Link to={pathTilKontaktinformasjon(avtale.id)}>
                Avtale (opprettet: {avtale.opprettetTidspunkt})
            </Link>
        </li>
    ));

    return <ul>{avtaleLinker}</ul>;
};

class AvtaleOversikt extends React.Component<
    RouterProps,
    { avtaler: AvtaleModell[] }
> {
    state = {
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
        return (
            <PanelBase>
                <Avtaler avtaler={this.state.avtaler} />
                <Knapp disabled={false} onClick={this.opprettAvtaleKlikk}>
                    Opprett avtale
                </Knapp>
            </PanelBase>
        );
    }
}

export default AvtaleOversikt;
