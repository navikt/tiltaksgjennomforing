import * as React from 'react';
import { FunctionComponent } from 'react';
import Varsel from '../komponenter/Varsel/Varsel';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget from './useInnlogget';

const InnloggingBoundary: FunctionComponent = props => {
    const {
        innloggetBruker,
        uinnlogget,
        innloggingskilder,
        feilmelding,
    } = useInnlogget();

    if (uinnlogget) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        return (
            <>
                <Innloggingslinje innloggetBruker={innloggetBruker} />
                {props.children}
            </>
        );
    } else if (feilmelding) {
        return (
            <Varsel kanLukkes={false} type={'advarsel'}>
                {feilmelding}
            </Varsel>
        );
    } else {
        return null;
    }
};

export default InnloggingBoundary;
