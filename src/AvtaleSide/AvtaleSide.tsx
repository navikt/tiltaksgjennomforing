import { Hovedknapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { pathTilAvtale, pathTilKontaktinformasjon } from '../paths';
import { hentAvtale, lagreAvtale } from '../services/firebase';
import Avtale, { tomAvtale } from './Avtale';
import AvtaleSeksjon from './AvtaleSeksjon/AvtaleSeksjon';
import KontaktinformasjonSeksjon from './KontaktinformasjonSeksjon/KontaktinformasjonSeksjon';
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
                            <KontaktinformasjonSeksjon
                                endreVerdi={this.endreVerdi}
                                form={this.state}
                            />
                        )}
                    />
                    <Route
                        path={pathTilAvtale(':avtaleId')}
                        exact={true}
                        render={() => (
                            <AvtaleSeksjon
                                endreVerdi={this.endreVerdi}
                                form={this.state}
                            />
                        )}
                    />
                    <PanelBase>
                        <Link to={'/'} className="lenke">
                            Til oversiktssiden
                        </Link>
                        &nbsp; &nbsp;
                        <Hovedknapp onClick={() => lagreAvtale(this.state)}>
                            Lagre
                        </Hovedknapp>
                    </PanelBase>
                </div>
            </div>
        );
    }
}

export default AvtaleSide;
