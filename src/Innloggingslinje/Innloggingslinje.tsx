import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { ReactNode } from 'react';
import './Innloggingslinje.less';
import useInnlogget, { Innloggingskilde } from './useInnlogget';

function Innloggingslinje(props: { children?: ReactNode }) {
    const { innloggetBruker, uinnlogget, innloggingMetadata } = useInnlogget();

    if (innloggetBruker) {
        const loggutKnapp = innloggingMetadata && (
            <Knapp
                className="innloggingslinje__boks__loggutknapp"
                mini={true}
                onClick={() => {
                    window.location.href = innloggingMetadata!.logout;
                }}
            >
                Logg ut
            </Knapp>
        );
        return (
            <>
                <div className="innloggingslinje__boks">
                    <Normaltekst>{innloggetBruker.identifikator}</Normaltekst>
                    {loggutKnapp}
                </div>
                {props.children}
            </>
        );
    } else if (uinnlogget) {
        const logginnKnapp =
            innloggingMetadata &&
            innloggingMetadata.login.map(
                (innlogginskilde: Innloggingskilde) => (
                    <Knapp
                        className="innloggingslinje__boks__logginnknapp"
                        onClick={() => {
                            window.location.href = innlogginskilde.login;
                        }}
                    >
                        Logg inn via {innlogginskilde.title}
                    </Knapp>
                )
            );

        return <>{logginnKnapp}</>;
    } else {
        return null;
    }
}

export default Innloggingslinje;
