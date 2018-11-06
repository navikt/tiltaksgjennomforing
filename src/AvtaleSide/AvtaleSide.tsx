import * as React from 'react';
import AvtaleModell, { tomAvtale } from './AvtaleModell';
import { Route, RouteComponentProps } from 'react-router';
import firebase from '../firebase';
import Kontaktinformasjon from './Kontaktinformasjon/Kontaktinformasjon';
import Avtale from './Avtale/Avtale';
import PanelBase from 'nav-frontend-paneler';
import KnappBase from 'nav-frontend-knapper';
import { Link } from 'react-router-dom';

interface MatchProps {
    avtaleId: string;
}

class AvtaleSide extends React.Component<
    RouteComponentProps<MatchProps>,
    AvtaleModell
> {
    state = {
        ...tomAvtale,
        id: this.props.match.params.avtaleId,
    };

    componentDidMount() {
        this.hentAvtale();
    }

    hentAvtale = () => {
        this.avtaleRef()
            .once('value')
            .then((snapshot: any) => {
                this.setState(snapshot.val());
            });
    };

    oppdaterAvtale = (event: any) => {
        const avtale = this.state;
        avtale[event.target.id] = event.target.value;
        this.setState(avtale);
    };

    lagre = () => {
        this.avtaleRef()
            .set(this.state)
            .then((param: any) => {
                console.log(param); // tslint:disable-line no-console
            });
    };

    avtaleRef = () => {
        return firebase
            .database()
            .ref('avtale/' + this.props.match.params.avtaleId);
    };

    render() {
        // TODO: Bli enige om URL paths
        const knappeRekke = () => (
            <>
                <Link
                    className="knapp"
                    to={`/avtale/${
                        this.props.match.params.avtaleId
                    }/kontaktinformasjon`}
                >
                    Kontaktinformasjon
                </Link>
                <Link
                    className="knapp"
                    to={`/avtale/${this.props.match.params.avtaleId}/avtale`}
                >
                    Avtale
                </Link>
            </>
        );

        return (
            <>
                {knappeRekke()}
                <Route
                    path={'/avtale/:avtaleId/kontaktinformasjon'}
                    exact={true}
                    render={() => (
                        <Kontaktinformasjon
                            oppdaterAvtale={this.oppdaterAvtale}
                            form={this.state}
                        />
                    )}
                />
                <Route
                    path={'/avtale/:avtaleId/avtale'}
                    exact={true}
                    render={() => (
                        <Avtale
                            oppdaterAvtale={this.oppdaterAvtale}
                            form={this.state}
                        />
                    )}
                />
                <PanelBase>
                    <Link to={'/'} className="lenke">
                        Til oversiktssiden
                    </Link>
                    &nbsp; &nbsp;
                    <KnappBase
                        type="hoved"
                        disabled={false}
                        onClick={this.lagre}
                    >
                        Lagre
                    </KnappBase>
                </PanelBase>
            </>
        );
    }
}

export default AvtaleSide;
