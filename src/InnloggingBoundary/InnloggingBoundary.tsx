import decoratorconfig from '@/internflateDekorator/decoratorconfig';
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import RestService from '@/services/rest-service';
import useInnloggetPartCookie from '@/utils/cookieUtils';
import NAVSPA from '@navikt/navspa';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget, { InnloggetBruker } from './useInnlogget';

const dekoratorConfig = decoratorconfig();
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    erNavAnsatt: false,
    organisasjoner: [],
});

const InnloggingBoundary: FunctionComponent<RouteComponentProps> = props => {
    const [brukmeny, setbrukmeny] = useState<boolean>(false);
    useEffect(() => {
        RestService.sjekkOmMenySkalBrukes('/tiltaksgjennomforing/brukavInternflate').then(setbrukmeny);
    }, []);

    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();
    const [cookies, , removeCookie] = useCookies();
    const setInnloggetPartCookie = useInnloggetPartCookie();

    if (uinnlogget) {
        removeCookie(INNLOGGET_PART);
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        if (!cookies[INNLOGGET_PART]) {
            const urlParametere = new URLSearchParams(props.location.search);

            const innloggetPart = (urlParametere.get('part') || '').toUpperCase();
            if (innloggetPart && ['ARBEIDSGIVER', 'DELTAKER', 'VEILEDER'].includes(innloggetPart)) {
                setInnloggetPartCookie(innloggetPart);
                urlParametere.delete('part');
                props.history.replace(props.location.pathname + '?' + urlParametere.toString());
            } else {
                return <Innloggingside innloggingskilder={innloggingskilder} />;
            }
        }

        return (
            <>
                {brukmeny && <InternflateDecorator {...dekoratorConfig} />}
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
