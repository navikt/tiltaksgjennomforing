import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { ReactNode } from 'react';
import './Innloggingslinje.less';
import useInnlogget, { Innloggingskilde } from './useInnlogget';

function Innloggingslinje(props: { children?: ReactNode }) {
    const innlogget = useInnlogget();

    if (innlogget.innloggetBruker) {
        const loggutKnapp = innlogget.innloggingMetadata && (
            <Knapp
                className="innloggingslinje__boks__loggutknapp"
                mini={true}
                onClick={() => {
                    window.location.href = innlogget.innloggingMetadata!.logout;
                }}
            >
                Logg ut
            </Knapp>
        );
        return (
            <>
                <div className="innloggingslinje__boks">
                    <Normaltekst>
                        {innlogget.innloggetBruker.identifikator}
                    </Normaltekst>
                    {loggutKnapp}
                </div>
                {props.children}
            </>
        );
    } else if (innlogget.uinnlogget) {
        const logginnKnapp =
            innlogget.innloggingMetadata &&
            innlogget.innloggingMetadata.login.map(
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
