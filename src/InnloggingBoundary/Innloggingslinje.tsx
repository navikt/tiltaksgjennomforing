import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Innloggingslinje.less';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '../paths';
import { InnloggetBruker } from './useInnlogget';

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => (
    <div className="innloggingslinje">
        <Normaltekst>
            <Link
                to={pathTilOversikt}
                className="innloggingslinje__identifikator"
            >
                {props.innloggetBruker.identifikator}
            </Link>
        </Normaltekst>
        <Knapp
            className="innloggingslinje__loggutknapp"
            mini={true}
            onClick={() => {
                window.location.href = '/tiltaksgjennomforing/logout';
            }}
        >
            Logg ut
        </Knapp>
    </div>
);

export default Innloggingslinje;
