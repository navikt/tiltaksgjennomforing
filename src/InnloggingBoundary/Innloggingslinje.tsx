import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import './Innloggingslinje.less';
import { InnloggetBruker } from './useInnlogget';

const Innloggingslinje = (props: { innloggetBruker: InnloggetBruker }) => (
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
