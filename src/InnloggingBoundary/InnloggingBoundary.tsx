import decoratorconfig from '@/internflateDekorator/decoratorconfig';
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import { useAsyncError } from '@/komponenter/useError';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { sjekkOmMenySkalBrukes } from '@/services/rest-service';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import NAVSPA from '@navikt/navspa';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget from './useInnlogget';

const dekoratorConfig = decoratorconfig();
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    erNavAnsatt: false,
    altinnOrganisasjoner: [],
    rolle: 'INGEN_ROLLE',
    tilganger: {},
    navEnheter: [],
});

const InnloggingBoundary: FunctionComponent<RouteComponentProps> = props => {
    const [brukmeny, setbrukmeny] = useState<boolean>();
    const [brukBackupmeny, setBrukBackupmeny] = useState<boolean>();
    const throwError = useAsyncError();

    useEffect(() => {
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/brukavInternflate')
            .then(setbrukmeny)
            .catch(throwError);
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/skal-backupmeny-brukes')
            .then(setBrukBackupmeny)
            .catch(throwError);
    }, [throwError]);

    const [cookies, setCookie] = useCookies();
    const sjekkOgSettCookie = (currentCookie: any) => {
        if (!currentCookie[INNLOGGET_PART]) {
            const urlParametere = new URLSearchParams(props.location.search);

            const innloggetPart = (urlParametere.get('part') || '').toUpperCase();
            if (innloggetPart && ['ARBEIDSGIVER', 'DELTAKER', 'VEILEDER', 'BESLUTTER'].includes(innloggetPart)) {
                setCookie(INNLOGGET_PART, innloggetPart, { path: '/tiltaksgjennomforing' });
                urlParametere.delete('part');
                props.history.replace(props.location.pathname + '?' + urlParametere.toString());
            } else {
                return <Innloggingside innloggingskilder={innloggingskilder} />;
            }
        }
    };

    sjekkOgSettCookie(cookies);
    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();

    if (uinnlogget) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        if (brukBackupmeny === undefined || brukmeny === undefined) return null;
        return (
            <>
                {brukmeny && <InternflateDecorator {...dekoratorConfig} />}
                <Innloggingslinje brukBackupmeny={brukBackupmeny} innloggetBruker={innloggetBruker} />
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
