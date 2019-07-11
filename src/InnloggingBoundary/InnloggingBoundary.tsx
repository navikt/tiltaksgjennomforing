import * as React from 'react';
import { FunctionComponent } from 'react';
import InternDekorator from '../komponenter/interndekorator/InternDekorator';
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
                <InternDekorator />

                <Innloggingslinje innloggetBruker={innloggetBruker} />
                {props.children}
            </>
        );
    } else if (feilmelding) {
        return (
            <Varsel kanLukkes={false} type={'info'}>
                {feilmelding}
            </Varsel>
        );
    } else {
        return null;
    }
};

export default InnloggingBoundary;
