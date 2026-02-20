import ByttTilBeslutter from '@/InnloggingBoundary/byttTilBeslutter/ByttTilBeslutter';
import ByttTilVeileder from '@/InnloggingBoundary/ByttTilVeileder';
import decoratorconfig from '@/internflateDekorator/decoratorconfig';
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import { useAsyncError } from '@/komponenter/useError';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { sjekkOmMenySkalBrukes } from '@/services/internt';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget from './useInnlogget';

const dekoratorConfig = decoratorconfig();
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflate-decorator-v3');
const GYLDIGE_PARTER = ['ARBEIDSGIVER', 'DELTAKER', 'MENTOR', 'VEILEDER', 'BESLUTTER'];

export const InnloggetBrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    erNavAnsatt: false,
    altinnOrganisasjoner: [],
    rolle: 'INGEN_ROLLE',
    tilganger: {},
    navEnheter: [],
});

export const useInnloggetBruker = () => React.useContext(InnloggetBrukerContext);

const InnloggingBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    const [brukmeny, setbrukmeny] = useState<boolean>();
    const [brukBackupmeny, setBrukBackupmeny] = useState<boolean>();
    const throwError = useAsyncError();
    const navigate = useNavigate();

    useEffect(() => {
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/brukavInternflate').then(setbrukmeny).catch(throwError);
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/skal-backupmeny-brukes').then(setBrukBackupmeny).catch(throwError);
    }, [throwError]);

    const [cookies, setCookie] = useCookies();
    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();

    const urlParametere = new URLSearchParams(window.location.search);
    const innloggetPartIUrl = (urlParametere.get('part') || '').toUpperCase();

    if (GYLDIGE_PARTER.includes(innloggetPartIUrl) && innloggetPartIUrl !== cookies[INNLOGGET_PART]) {
        setCookie(INNLOGGET_PART, innloggetPartIUrl, { path: '/tiltaksgjennomforing' });
        urlParametere.delete('part');
        navigate({ search: urlParametere.toString() });
    }

    if (!cookies[INNLOGGET_PART]) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    }

    if (uinnlogget) {
        return <Innloggingside innloggingskilder={innloggingskilder} />;
    } else if (innloggetBruker) {
        if (brukBackupmeny === undefined || brukmeny === undefined) return null;
        return (
            <>
                {brukmeny && <InternflateDecorator {...dekoratorConfig} />}
                <Innloggingslinje brukBackupmeny={brukBackupmeny} innloggetBruker={innloggetBruker} />
                {innloggetBruker.rolle === 'VEILEDER' && innloggetBruker.kanVæreBeslutter && <ByttTilBeslutter />}
                {innloggetBruker.rolle === 'BESLUTTER' && <ByttTilVeileder />}
                <InnloggetBrukerContext.Provider value={innloggetBruker}>
                    {props.children}
                </InnloggetBrukerContext.Provider>
            </>
        );
    } else if (feilmelding) {
        return (
            <VarselKomponent kanLukkes={false} type={'warning'}>
                {feilmelding}
            </VarselKomponent>
        );
    } else {
        return null;
    }
};

export default InnloggingBoundary;
