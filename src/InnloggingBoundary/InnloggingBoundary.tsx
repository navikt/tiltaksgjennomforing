import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget, { InnloggetBruker } from './useInnlogget';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { basename } from '@/paths';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    erNavAnsatt: false,
});

const InnloggingBoundary: FunctionComponent<RouteComponentProps> = props => {
    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();

    if (uinnlogget) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        if (!sessionStorage.getItem(INNLOGGET_PART)) {
            return <Innloggingside innloggingskilder={innloggingskilder} />;
        }
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

export default withRouter(InnloggingBoundary);
