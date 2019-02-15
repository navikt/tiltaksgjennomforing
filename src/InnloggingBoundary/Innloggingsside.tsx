import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Innloggingskilde } from './useInnlogget';

const Innloggingside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const logginnknapper = props.innloggingskilder.map(
        (innlogginskilde: Innloggingskilde) => (
            <Knapp
                key={innlogginskilde.url}
                className="innloggingslinje__boks__logginnknapp"
                onClick={() => {
                    window.location.href = innlogginskilde.url;
                }}
            >
                Logg inn via {innlogginskilde.tittel}
            </Knapp>
        )
    );
    return <>{logginnknapper}</>;
};

export default Innloggingside;
