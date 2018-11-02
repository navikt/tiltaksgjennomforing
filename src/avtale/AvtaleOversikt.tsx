import * as moment from 'moment';
import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AvtaleModell from './AvtaleModell';

const Avtaler = (props: { avtaler: AvtaleModell[] }) => {
    const avtaleLinker = props.avtaler.map((avtale: AvtaleModell) => (
        <li key={avtale.id}>
            <Link to={'/avtale/' + avtale.id}>Avtale (opprettet: {avtale.opprettetTidspunkt})</Link>
        </li>
    ));

    return <ul>{avtaleLinker}</ul>;
};

class AvtaleOversikt extends React.Component<any, { avtaler: AvtaleModell[] }> {
    constructor(props: any) {
        super(props);
        this.opprettAvtale = this.opprettAvtale.bind(this);
        this.hentAvtaler();
        this.state = { avtaler: [] };
    }

    public render() {
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

    private opprettAvtale() {
        const avtaleRef = this.props.firebase
            .database()
            .ref('avtale')
            .push();
        const avtaleId = avtaleRef.key;
        const history = this.props.history;
        const avtale: AvtaleModell = {
            id: avtaleId,
            opprettetTidspunkt: moment().format('DD.MM.YYYY HH:mm:ss'),
        };
        avtaleRef.set(avtale).then(() => {
            history.push('/avtale/' + avtaleId);
        });
    }

    private hentAvtaler() {
        this.props.firebase
            .database()
            .ref('avtale')
            .on('value', (snapshot: any) => {
                const respons = snapshot.val();
                if (respons) {
                    this.setState({
                        avtaler: Object.keys(respons).map(id => {
                            return { id, opprettetTidspunkt: respons[id].opprettetTidspunkt };
                        }),
                    });
                }
            });
    }
}

export default AvtaleOversikt;
