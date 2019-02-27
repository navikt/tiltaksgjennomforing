import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Innloggingslinje.less';
import { InnloggetBruker } from './useInnlogget';

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => (
    <div className="innloggingslinje__boks">
        <Normaltekst>{props.innloggetBruker.identifikator}</Normaltekst>
        <Knapp
            className="innloggingslinje__boks__loggutknapp"
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
