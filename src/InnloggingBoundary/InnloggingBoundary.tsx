import * as React from 'react';
import { FunctionComponent } from 'react';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget, {InnloggetBruker} from './useInnlogget';

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({identifikator: '', erNavAnsatt: false});

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
                <InnloggetBrukerContext.Provider value={innloggetBruker}>
                    {props.children}
                </InnloggetBrukerContext.Provider>
            </>
        );
    } else if (feilmelding) {
        return (
            <VarselKomponent kanLukkes={false} type={'advarsel'}>
                {feilmelding}
            </VarselKomponent>
        );
    } else {
        return null;
    }
};

export default InnloggingBoundary;
