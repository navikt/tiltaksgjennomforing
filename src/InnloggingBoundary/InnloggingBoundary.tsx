import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget, { InnloggetBruker } from './useInnlogget';

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    erNavAnsatt: false,
    organisasjoner: [],
});

const InnloggingBoundary: FunctionComponent<RouteComponentProps> = props => {
    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();
    const [cookies, setCookie] = useCookies();

    if (uinnlogget) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        if (!cookies[INNLOGGET_PART]) {
            const urlParametere = new URLSearchParams(props.location.search);

            const innloggetPart = (urlParametere.get('part') || '').toUpperCase();
            if (innloggetPart && ['ARBEIDSGIVER', 'DELTAKER', 'VEILEDER'].includes(innloggetPart)) {
                setCookie(INNLOGGET_PART, innloggetPart, { path: '/tiltaksgjennomforing' });
                urlParametere.delete('part');
                props.history.replace(props.location.pathname + '?' + urlParametere.toString());
            } else {
                return <Innloggingside innloggingskilder={innloggingskilder} />;
            }
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
