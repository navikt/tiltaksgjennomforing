import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { pathTilAvtale, pathTilKontaktinformasjon } from '../paths';
import AvtaleSeksjon from './AvtaleSeksjon/AvtaleSeksjon';
import KontaktinformasjonSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import './avtaleside.less';
import { AvtaleProvider } from './avtaleContext';
class AvtaleSide extends React.Component {
    render() {
        const avtaleId = '';
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
            <AvtaleProvider>
                <div className={'avtaleside'}>
                    {knappeRekke()}
                    <div className={'avtaleside__steginnhold'}>
                        <Route
                            path={pathTilKontaktinformasjon(':avtaleId')}
                            exact={true}
                            component={KontaktinformasjonSteg}
                        />
                        <Route
                            path={pathTilAvtale(':avtaleId')}
                            exact={true}
                            component={AvtaleSeksjon}
                        />
                        <Link to={'/'} className="lenke">
                            Til oversiktssiden
                        </Link>
                        <Hovedknapp>Lagre</Hovedknapp>
                    </div>
                </div>
            </AvtaleProvider>
        );
    }
}

export default AvtaleSide;
