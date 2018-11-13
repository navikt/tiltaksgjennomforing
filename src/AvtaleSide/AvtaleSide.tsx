import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { pathTilAvtale, pathTilKontaktinformasjon } from '../paths';
import { hentAvtale, lagreAvtale } from '../services/firebase';
import { Avtale, tomAvtale } from './avtale';
import AvtaleSeksjon from './AvtaleSeksjon/AvtaleSeksjon';
import KontaktinformasjonSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import './avtaleside.less';

interface MatchProps {
    avtaleId: string;
}

class AvtaleSide extends React.Component<
    RouteComponentProps<MatchProps>,
    Avtale
> {
    state = {
        ...tomAvtale,
        id: this.props.match.params.avtaleId,
    };

    componentDidMount() {
        const avtaleId = this.props.match.params.avtaleId;
        hentAvtale(avtaleId).then(avtale => {
            this.setState({ ...avtale });
        });
    }

    endreVerdi = (felt: string, verdi: any) => {
        const avtale = this.state;
        avtale[felt] = verdi;
        this.setState(avtale);
    };

    render() {
        const avtaleId = this.props.match.params.avtaleId;
        const knappeRekke = () => (
            <>
                <Link
                    className="knapp"
                    to={pathTilKontaktinformasjon(avtaleId)}
                >
                    Kontaktinformasjon
                </Link>
                <Link className="knapp" to={pathTilAvtale(avtaleId)}>
                    Avtale
                </Link>
            </>
        );

        return (
            <div className={'avtaleside'}>
                {knappeRekke()}
                <div className={'avtaleside__steginnhold'}>
                    <Route
                        path={pathTilKontaktinformasjon(':avtaleId')}
                        exact={true}
                        render={() => (
                            <KontaktinformasjonSteg
                                endreVerdi={this.endreVerdi}
                                {...this.state}
                            />
                        )}
                    />
                    <Route
                        path={pathTilAvtale(':avtaleId')}
                        exact={true}
                        render={() => (
                            <AvtaleSeksjon
                                endreVerdi={this.endreVerdi}
                                {...this.state}
                            />
                        )}
                    />
                    <Link to={'/'} className="lenke">
                        Til oversiktssiden
                    </Link>
                    <Hovedknapp onClick={() => lagreAvtale(this.state)}>
                        Lagre
                    </Hovedknapp>
                </div>
            </div>
        );
    }
}

export default AvtaleSide;
