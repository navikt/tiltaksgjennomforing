import * as moment from 'moment';
import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { RouterProps } from 'react-router';
import AvtaleModell, { tomAvtale } from './AvtaleModell';

const Avtaler = (props: { avtaler: AvtaleModell[] }) => {
    const avtaleLinker = props.avtaler.map((avtale: AvtaleModell) => (
        <li key={avtale.id}>
            <Link to={'/avtale/' + avtale.id}>
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

    componentWillMount() {
        this.hentAvtaler();
    }

    opprettAvtale = () => {
        const avtaleRef = firebase
            .database()
            .ref('avtale')
            .push();

        const avtaleId = avtaleRef.key || '';
        const avtale: AvtaleModell = {
            ...tomAvtale,
            id: avtaleId,
            opprettetTidspunkt: moment().format('DD.MM.YYYY HH:mm:ss'),
        };
        avtaleRef.set(avtale).then(() => {
            this.props.history.push('/avtale/' + avtaleId);
        });
    };

    hentAvtaler = () => {
        firebase
            .database()
            .ref('avtale')
            .on('value', (snapshot: any) => {
                const respons = snapshot.val();
                if (respons) {
                    this.setState({
                        avtaler: Object.keys(respons).map(id => {
                            return {
                                ...tomAvtale,
                                ...respons[id],
                            };
                        }),
                    });
                }
            });
    };

    render() {
        return (
            <PanelBase>
                <Avtaler avtaler={this.state.avtaler} />
                <KnappBase
                    type="standard"
                    disabled={false}
                    onClick={this.opprettAvtale}
                >
                    Opprett avtale
                </KnappBase>
            </PanelBase>
        );
    }
}

export default AvtaleOversikt;
