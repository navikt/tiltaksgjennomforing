import { Søkekriterier } from '@/AvtaleOversikt/Filtrering/søkekriterier';
import { EndreStilling } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { Feature, FeatureToggles } from '@/FeatureToggleProvider';
import { basename } from '@/paths';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import {
    Avslagsårsaker,
    Avtale,
    Bedriftinfo,
    EndreKontaktInfo,
    EndreOppfølgingOgTilretteleggingInfo,
    GodkjentPaVegneGrunner,
    Maal,
    TiltaksType,
} from '@/types/avtale';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import { ApiError, AutentiseringError } from '@/types/errors';
import { Hendelse } from '@/types/hendelse';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { FeilkodeError } from './../types/errors';
import { Variants } from './../types/unleash-variant';

export const API_URL = '/tiltaksgjennomforing/api';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});

axiosRetry(api, { retries: 3 });

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            sessionStorage.setItem(
                SIDE_FOER_INNLOGGING,
                window.location.pathname.replace(basename, '') + window.location.search
            );
            throw new AutentiseringError('Er ikke logget inn.');
        }
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
);

const featureTogglePath = (features: Feature[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return `/feature?${query}`;
};

const featureToggleVariantPath = (features: Feature[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return `/feature/variant?${query}`;
};

export const hentAvtale = async (id: string): Promise<Avtale> => {
    const response = await api.get<Avtale>(`/avtaler/${id}`);
    return response.data;
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach(k => !obj[k] && delete obj[k]);
    return obj;
};

export const hentAvtalerForInnloggetBruker = async (søkekriterier: Søkekriterier): Promise<Avtale[]> => {
    const queryParam = new URLSearchParams(removeEmpty(søkekriterier));
    const response = await api.get<Avtale[]>(`/avtaler?${queryParam}`);
    return response.data;
};

export const hentAvtaleStatusDetaljer = async (avtaleId: string): Promise<AvtaleStatusDetaljer> => {
    const response = await api.get<AvtaleStatusDetaljer>(`/avtaler/${avtaleId}/status-detaljer`);
    return response.data;
};

export const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    if (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder) {
        if (
            window.confirm(
                'En av partene i avtalen har godkjent. Ved å lagre endringer oppheves godkjenningene. Ønsker du å fortsette?'
            )
        ) {
            await opphevGodkjenninger(avtale.id);
        } else {
            return Promise.reject();
        }
    }

    await api.put(`/avtaler/${avtale.id}`, avtale, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });

    return hentAvtale(avtale.id);
};

export const lagreAvtaleDryRun = async (avtale: Avtale): Promise<Avtale> => {
    const response = await api.put(`/avtaler/${avtale.id}/dry-run`, avtale, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const opprettAvtaleSomVeileder = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler', deltakerFnr, bedriftNr, tiltakstype);
};

export const opprettAvtaleSomArbeidsgiver = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler/opprett-som-arbeidsgiver', deltakerFnr, bedriftNr, tiltakstype);
};

const opprettAvtalen = async (
    url: string,
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    const postResponse = await api.post(`${url}`, {
        deltakerFnr,
        bedriftNr,
        tiltakstype,
    });
    const getResponse = await api.get<Avtale>(`${postResponse.headers.location}`);
    return getResponse.data;
};

export const hentRolle = async (avtaleId: string): Promise<Rolle> => {
    const response = await api.get(`/avtaler/${avtaleId}/rolle`);
    return response.data;
};

export const godkjennAvtale = async (avtale: Avtale) => {
    const uri = `/avtaler/${avtale.id}/godkjenn`;

    await api.post(uri, null, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });

    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegne = async (avtale: Avtale, paVegneGrunn: GodkjentPaVegneGrunner) => {
    const uri = `/avtaler/${avtale.id}/godkjenn-paa-vegne-av`;
    await api.post(uri, paVegneGrunn, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const opphevGodkjenninger = async (avtaleId: string) => {
    await api.post(`/avtaler/${avtaleId}/opphev-godkjenninger`);
    return hentAvtale(avtaleId);
};

export const gjenopprettAvtale = async (id: string) => {
    await api.post(`/avtaler/${id}/gjenopprett`);
};

export const avbrytAvtale = async (avtale: Avtale, avbruttDato: string, avbruttGrunn: string) => {
    const uri = `/avtaler/${avtale.id}/avbryt`;
    await api.post(
        uri,
        { avbruttDato: avbruttDato, avbruttGrunn: avbruttGrunn },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const annullerAvtale = async (avtale: Avtale, annullertGrunn: string) => {
    const uri = `/avtaler/${avtale.id}/annuller`;
    await api.post(
        uri,
        { annullertGrunn },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await api.get<InnloggetBruker>(`/innlogget-bruker`);
    return response.data;
};

export const gjorKontonummeroppslag = async (avtale: Avtale): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/set-kontonummer-for-arbeidsgiver-fra-kontoregister`);
};

export const hentBedriftBrreg = async (bedriftNr: string): Promise<Bedriftinfo> => {
    const response = await api.get(`/organisasjoner?bedriftNr=${bedriftNr}`);
    return response.data;
};

export const hentUlesteVarsler = async (): Promise<Varsel[]> => {
    const response = await api.get(`/varsler/oversikt`);
    return response.data;
};

export const hentUlesteBjelleVarslerForAvtale = async (avtaleId: string): Promise<Varsel[]> => {
    const response = await api.get(`/varsler/avtale-modal?avtaleId=${avtaleId}`);
    return response.data;
};

export const hentVarsellogg = async (avtaleId: string): Promise<Varsel[]> => {
    const response = await api.get(`/varsler/avtale-logg?avtaleId=${avtaleId}`);
    return response.data;
};

export const hentHendelselogg = async (avtaleId: string): Promise<Hendelse[]> => {
    const response = await api.get(`/hendelselogg?avtaleId=${avtaleId}`);
    return response.data;
};

export const settAlleVarselerTilLest = async (varselIder: string[]): Promise<void> => {
    const uri = `/varsler/sett-alle-til-lest`;
    await api.post(uri, varselIder);
};

export const hentFeatureToggles = async (featureToggles: Feature[]): Promise<FeatureToggles> => {
    const response = await api.get(featureTogglePath(featureToggles));

    return response.data;
};
export const hentFeatureTogglesVarianter = async (featureToggles: Feature[]): Promise<Variants> => {
    const response = await api.get(featureToggleVariantPath(featureToggles));
    return response.data;
};

export const låsOppAvtale = async (avtaleId: string): Promise<void> => {
    await api.post(`/avtaler/${avtaleId}/laas-opp`);
};

export const delAvtaleMedAvtalepart = async (avtaleId: string, rolle: Rolle): Promise<void> => {
    await api.post(`/avtaler/${avtaleId}/del-med-avtalepart`, JSON.stringify(rolle));
};

export const overtaAvtale = async (avtaleId: string): Promise<void> => {
    await api.put(`/avtaler/${avtaleId}/overta`);
};

export type BeOmRettigheterUrler = {
    [tiltakstype in TiltaksType]?: string;
};

export const hentBeOmRettighetUrler = async (orgNr: string): Promise<BeOmRettigheterUrler> => {
    const response = await api.get<BeOmRettigheterUrler>(`/be-om-altinn-rettighet-urler?orgNr=${orgNr}`);
    return response.data;
};

export const godkjennTilskuddsperiode = async (avtaleId: string, enhet: string) => {
    const uri = `/avtaler/${avtaleId}/godkjenn-tilskuddsperiode`;
    await api.post(uri, { enhet });
};

export const avslåTilskuddsperiode = async (
    avtaleId: string,
    avslagsårsaker: Set<Avslagsårsaker>,
    avslagsforklaring: string
) => {
    const uri = `/avtaler/${avtaleId}/avslag-tilskuddsperiode`;
    await api.post(uri, {
        avslagsårsaker,
        avslagsforklaring,
    });
};

export const slettemerkAvtale = async (avtaleId: string) => {
    const uri = `/avtaler/${avtaleId}/slettemerk`;
    await api.post(uri);
};

export const oppdatereKontaktInformasjon = async (avtale: Avtale, endreKontatInfo: EndreKontaktInfo): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-kontaktinfo`,
        { ...endreKontatInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const oppdatereOppfølgingOgTilretteleggingInformasjon = async (
    avtale: Avtale,
    endreOppfølgingOgTilretteleggingInfo: EndreOppfølgingOgTilretteleggingInfo
): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-oppfolging-og-tilrettelegging`,
        { ...endreOppfølgingOgTilretteleggingInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const oppdatereStillingbeskrivelse = async (avtale: Avtale, endreStillingInfo: EndreStilling): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-stillingbeskrivelse`,
        { ...endreStillingInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const oppdateretilskuddsBeregning = async (avtale: Avtale, endreBeregning: EndreBeregning): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-tilskuddsberegning`,
        { ...endreBeregning },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const oppdateretilskuddsBeregningDryRun = async (
    avtale: Avtale,
    endreBeregning: EndreBeregning
): Promise<Avtale> => {
    const response = await api.post(
        `/avtaler/${avtale.id}/endre-tilskuddsberegning-dry-run`,
        { ...endreBeregning },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
    return response.data;
};

export const forlengAvtale = async (avtale: Avtale, sluttDato: string) => {
    const uri = `/avtaler/${avtale.id}/forleng`;
    await api.post(
        uri,
        { sluttDato },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};
export const forlengAvtaleDryRun = async (avtale: Avtale, sluttDato: string): Promise<Avtale> => {
    const uri = `/avtaler/${avtale.id}/forleng-dry-run`;
    const response = await api.post(
        uri,
        { sluttDato },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
    return response.data;
};

export const forkortAvtale = async (avtale: Avtale, sluttDato: string, grunn: string, annetGrunn?: string) => {
    const uri = `/avtaler/${avtale.id}/forkort`;
    await api.post(
        uri,
        { sluttDato, grunn, annetGrunn },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
};

export const forkortAvtaleDryRun = async (avtale: Avtale, sluttDato: string): Promise<Avtale> => {
    const uri = `/avtaler/${avtale.id}/forkort-dry-run`;
    const response = await api.post(
        uri,
        { sluttDato },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
    return response.data;
};

export const sendTilbakeTilBeslutter = async (avtale: Avtale) => {
    const uri = `/avtaler/${avtale.id}/send-tilbake-til-beslutter`;
    const response = await api.post(uri);
    return response.data;
};

export const oppdatereMålInformasjon = async (avtale: Avtale, maal: Maal[]): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-maal`, { maal: maal });
};
