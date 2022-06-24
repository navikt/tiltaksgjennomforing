import decoratorconfig from '@/internflateDekorator/decoratorconfig';
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import { useAsyncError } from '@/komponenter/useError';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { sjekkOmMenySkalBrukes } from '@/services/internt';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Innloggingslinje from './Innloggingslinje';
import Innloggingside from './Innloggingsside';
import useInnlogget from './useInnlogget';
import ByttTilVeileder from '@/InnloggingBoundary/ByttTilVeileder';
import ByttTilBeslutter from '@/InnloggingBoundary/ByttTilBeslutter';
import {Feature} from "@/FeatureToggleProvider";
import {useContext} from "react";
import {FeatureToggleContext} from "@/FeatureToggleProvider";
import {Innloggingskilde} from "@/types/innlogget-bruker";

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

const InnloggingBoundary: FunctionComponent = props => {
    const [brukmeny, setbrukmeny] = useState<boolean>();
    const [brukBackupmeny, setBrukBackupmeny] = useState<boolean>();
    const throwError = useAsyncError();
    const history = useHistory();

    useEffect(() => {
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/brukavInternflate')
            .then(setbrukmeny)
            .catch(throwError);
        sjekkOmMenySkalBrukes('/tiltaksgjennomforing/skal-backupmeny-brukes')
            .then(setBrukBackupmeny)
            .catch(throwError);
    }, [throwError]);

    const [cookies, setCookie] = useCookies();
    const { innloggetBruker, uinnlogget, innloggingskilder, feilmelding } = useInnlogget();

    if (!cookies[INNLOGGET_PART]) {
        const urlParametere = new URLSearchParams(window.location.search);

        const innloggetPart = (urlParametere.get('part') || '').toUpperCase();

        if (['ARBEIDSGIVER', 'DELTAKER','MENTOR', 'VEILEDER', 'BESLUTTER'].includes(innloggetPart)) {
            setCookie(INNLOGGET_PART, innloggetPart, { path: '/tiltaksgjennomforing' });
            urlParametere.delete('part');
            history.replace({ search: urlParametere.toString() });
        } else {
            return <Innloggingside innloggingskilder={innloggingskilder} />;
        }
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
            <VarselKomponent kanLukkes={false} type={'advarsel'}>
                {feilmelding}
            </VarselKomponent>
        );
    } else {
        return null;
    }
};

export default InnloggingBoundary;
