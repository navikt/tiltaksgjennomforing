import axios from 'axios';
import axiosRetry from 'axios-retry';
import { mutate } from 'swr';

import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { Kostnadssted } from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';
import { Feature, FeatureToggles, FeatureToggleVariants } from '@/FeatureToggles';
import { Avtalerolle } from '@/OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import { basename } from '@/Router';
import {
    AlleredeRegistrertAvtale,
    Avtale,
    Bedriftinfo,
    EndreKontaktInfo,
    EndreOppfølgingOgTilretteleggingInfo,
    GodkjentPaVegneAvArbeidsgiverGrunner,
    GodkjentPaVegneAvDeltakerGrunner,
    GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
    Inkluderingstilskuddsutgift,
    Maal,
    MentorInnhold,
    PageableAvtale,
    PageableAvtaleMinimalForBeslutter,
    Returårsaker,
    Stilling,
    TiltaksType,
    Varighet,
} from '@/types/avtale';
import { ApiError, AutentiseringError, FeilkodeError, IkkeFunnetError, IkkeTilgangError } from '@/types/errors';
import { Hendelse } from '@/types/hendelse';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});

axiosRetry(api, { retries: 3 });

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.setItem(
                SIDE_FOER_INNLOGGING,
                window.location.pathname.replace(basename, '') + window.location.search,
            );
            throw new AutentiseringError('Er ikke logget inn.');
        }
        if (error.response?.status === 403) {
            const feilmelding = error.response?.headers.feilkode || 'Bruker har ikke tilgang til ressursen.';
            throw new IkkeTilgangError(feilmelding);
        }
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        if (error.response?.status === 404) {
            throw new IkkeFunnetError('Fant ikke ressursen.');
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    },
);

const featureTogglePath = (features: Feature[]): string => {
    const query = features.map((feature) => `feature=${feature}`).join('&');
    return `/feature?${query}`;
};

const featureToggleVariantPath = (features: Feature[]): string => {
    const query = features.map((feature) => `feature=${feature}`).join('&');
    return `/feature/variant?${query}`;
};

export const hentAvtale = async (id: string): Promise<Avtale> => {
    const response = await api.get<Avtale>(`/avtaler/${id}`);
    return response.data;
};

export const hentAvtaleMedAvtaleNr = async (avtaleNr: number): Promise<Avtale> => {
    const response = await api.get<Avtale>(`/avtaler/avtaleNr/${avtaleNr}`);
    return response.data;
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
    return obj;
};

export const hentAvtalerForInnloggetBruker = async (
    søkekriterier: Filtrering,
    size: number = 2,
    page: number = 0,
    limit: number = 10000000,
): Promise<PageableAvtale> => {
    // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr'
    const søkekriterierFiltrert = {
        bedriftNr: søkekriterier.bedrift,
        ...søkekriterier,
        bedrift: undefined,
        size,
        page,
        limit,
    };
    const queryParam = new URLSearchParams(removeEmpty(søkekriterierFiltrert));
    const response = await api.get<PageableAvtale>(`/avtaler?${queryParam}`);
    return response.data;
};

export const hentAvtalerForInnloggetBrukerMedSokId = async (
    sokId: string,
    size: number = 2,
    page: number = 0,
    sorteringskolonne: keyof Avtale = 'sistEndret',
    sorteringOrder?: string,
): Promise<PageableAvtale> => {
    const queryParam = new URLSearchParams(removeEmpty({ size, page, sokId, sorteringskolonne, sorteringOrder }));
    const response = await api.get<PageableAvtale>(`/avtaler/sok?${queryParam}`);
    return response.data;
};

export const hentAvtalerForInnloggetBrukerMedPost = async (
    søkekriterier: Filtrering,
    size: number = 2,
    page: number = 0,
    sorteringOrder: string = 'DESC',
): Promise<PageableAvtale> => {
    const postBody = removeEmpty(søkekriterier);
    const queryParam = new URLSearchParams(
        removeEmpty({ page, size, sorteringskolonne: søkekriterier.sorteringskolonne, sorteringOrder }),
    );
    const response = await api.post<PageableAvtale>(`/avtaler/sok?${queryParam}`, postBody);
    return response.data;
};

export const hentAvtalerForInnloggetBeslutter = async (
    søkekriterier: Filtrering,
    size: number = 2,
    page: number = 0,
): Promise<PageableAvtaleMinimalForBeslutter> => {
    // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr'
    const søkekriterierFiltrert = {
        bedriftNr: søkekriterier.bedrift,
        ...søkekriterier,
        bedrift: undefined,
        size,
        page,
        sorteringOrder: søkekriterier.sorteringOrder,
    };

    const queryParam = new URLSearchParams(removeEmpty(søkekriterierFiltrert));
    const response = await api.get<PageableAvtaleMinimalForBeslutter>(`/avtaler/beslutter-liste?${queryParam}`);
    return response.data;
};

export const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    if (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder) {
        if (
            window.confirm(
                'En av partene i avtalen har godkjent. ' +
                    'Ved å lagre endringer oppheves godkjenningene. Ønsker du å fortsette?',
            )
        ) {
            await opphevGodkjenninger(avtale);
        } else {
            return Promise.reject();
        }
    }
    await api.put(`/avtaler/${avtale.id}`, avtale.gjeldendeInnhold, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });

    return hentAvtale(avtale.id);
};

export const lagreAvtaleDryRun = async (avtale: Avtale): Promise<Avtale> => {
    const response = await api.put(`/avtaler/${avtale.id}/dry-run`, avtale.gjeldendeInnhold, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const opprettAvtaleSomVeileder = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType,
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler', deltakerFnr, bedriftNr, tiltakstype);
};

export const opprettAvtaleSomArbeidsgiver = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType,
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler/opprett-som-arbeidsgiver', deltakerFnr, bedriftNr, tiltakstype);
};

export const opprettMentorAvtale = async (
    deltakerFnr: string,
    mentorFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType,
    avtalerolle: Avtalerolle,
): Promise<Avtale> => {
    const postResponse = await api.post('/avtaler/opprett-mentor-avtale', {
        deltakerFnr,
        mentorFnr,
        bedriftNr,
        tiltakstype,
        avtalerolle,
    });
    const getResponse = await api.get<Avtale>(`${postResponse.headers.location}`);
    return getResponse.data;
};

const opprettAvtalen = async (
    url: string,
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType,
): Promise<Avtale> => {
    const postResponse = await api.post(`${url}`, {
        deltakerFnr,
        bedriftNr,
        tiltakstype,
    });
    const getResponse = await api.get<Avtale>(`${postResponse.headers.location}`);
    return getResponse.data;
};

export const mentorGodkjennTaushetserklæring = async (avtaleId: string, sistEndret: string): Promise<Avtale> => {
    await api.post(`/avtaler/${avtaleId}/mentorGodkjennTaushetserklæring`, null, {
        headers: { 'If-Unmodified-Since': sistEndret },
    });
    return hentAvtale(avtaleId);
};

export const godkjennAvtale = async (avtale: Avtale) => {
    await api.post(`/avtaler/${avtale.id}/godkjenn`, null, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegne = async (avtale: Avtale, paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner) => {
    await api.post(`/avtaler/${avtale.id}/godkjenn-paa-vegne-av`, paVegneGrunn, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegneAvArbeidsgiver = async (
    avtale: Avtale,
    paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner,
) => {
    await api.post(`/avtaler/${avtale.id}/godkjenn-paa-vegne-av-arbeidsgiver`, paVegneGrunn, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegneAvDeltakerOgArbeidsgiver = async (
    avtale: Avtale,
    paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
) => {
    await api.post(`/avtaler/${avtale.id}/godkjenn-paa-vegne-av-deltaker-og-arbeidsgiver`, paVegneGrunn, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const opphevGodkjenninger = async (avtale: Avtale) => {
    await api.post(`/avtaler/${avtale.id}/opphev-godkjenninger`, null, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const annullerAvtale = async (avtale: Avtale, annullertGrunn: string) => {
    const response = await api.post<Avtale>(
        `/avtaler/${avtale.id}/annuller`,
        { annullertGrunn },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    return response.data;
};

export const sjekkOmDeltakerAlleredeErRegistrertPaaTiltak = async (
    deltakerFnr: string,
    tiltakstype: TiltaksType,
    avtaleId: string | null,
    startDato: string | null,
    sluttDato: string | null,
): Promise<AlleredeRegistrertAvtale[] | []> => {
    const response = await api.post('/avtaler/deltaker-allerede-paa-tiltak', {
        deltakerFnr,
        tiltakstype,
        avtaleId,
        startDato,
        sluttDato,
    });
    return response.data;
};

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await api.get<InnloggetBruker>(`/innlogget-bruker`);
    return response.data;
};

export const hentKontonummerForArbeidsgiver = async (avtaleId: string): Promise<string> => {
    const response = await api.get(`/avtaler/${avtaleId}/kontonummer-arbeidsgiver`);
    return response.data;
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
    await api.post(`/varsler/sett-alle-til-lest`, varselIder);
};

export const hentFeatureToggles = async (featureToggles: Feature[]): Promise<FeatureToggles> => {
    const response = await api.get(featureTogglePath(featureToggles));
    return response.data;
};

export const hentFeatureTogglesVarianter = async (featureToggles: Feature[]): Promise<FeatureToggleVariants> => {
    const response = await api.get(featureToggleVariantPath(featureToggles));
    return response.data;
};

export const delAvtaleMedAvtalepart = async (avtale: Avtale, rolle: Rolle): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/del-med-avtalepart`, JSON.stringify(rolle), {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
};

export const oppdatereKostnadsstedet = async (avtale: Avtale, kostnadssted: Kostnadssted): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/endre-kostnadssted`, JSON.stringify(kostnadssted), {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const overtaAvtale = async (avtale: Avtale): Promise<void> => {
    await api.put(`/avtaler/${avtale.id}/overta`, null, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
};

export type BeOmRettigheterUrler = {
    [tiltakstype in TiltaksType]?: string;
};

export const hentBeOmRettighetUrler = async (orgNr: string): Promise<BeOmRettigheterUrler> => {
    const response = await api.get<BeOmRettigheterUrler>(`/be-om-altinn-rettighet-urler?orgNr=${orgNr}`);
    return response.data;
};

export const godkjennTilskuddsperiode = async (avtale: Avtale, enhet: string) => {
    await api.post(
        `/avtaler/${avtale.id}/godkjenn-tilskuddsperiode`,
        { enhet },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
};

export const setOmAvtalenKanEtterregistreres = async (avtale: Avtale): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/set-om-avtalen-kan-etterregistreres`, null, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const returnerTilskuddsperiode = async (
    avtale: Avtale,
    avslagsårsaker: Set<Returårsaker>,
    avslagsforklaring: string,
) => {
    await api.post(
        `/avtaler/${avtale.id}/avslag-tilskuddsperiode`,
        {
            avslagsårsaker: Array.from(avslagsårsaker),
            avslagsforklaring,
        },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
};

export const oppdatereKontaktInformasjon = async (
    avtale: Avtale,
    endreKontaktInfo: EndreKontaktInfo,
): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-kontaktinfo`,
        { ...endreKontaktInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const oppdatereOppfølgingAvAvtale = async (avtale: Avtale): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/oppfolging-av-avtale`,
        { ...avtale },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const oppdatereOppfølgingOgTilretteleggingInformasjon = async (
    avtale: Avtale,
    endreOppfølgingOgTilretteleggingInfo: EndreOppfølgingOgTilretteleggingInfo,
): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-oppfolging-og-tilrettelegging`,
        { ...endreOppfølgingOgTilretteleggingInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export type EndreStilling = Stilling & Pick<Varighet, 'stillingprosent' | 'antallDagerPerUke'>;
export const oppdatereStillingbeskrivelse = async (avtale: Avtale, endreStillingInfo: EndreStilling): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-stillingbeskrivelse`, endreStillingInfo, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const oppdateretilskuddsBeregning = async (avtale: Avtale, endreBeregning: EndreBeregning): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-tilskuddsberegning`,
        { ...endreBeregning },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const oppdateretilskuddsBeregningDryRun = async (
    avtale: Avtale,
    endreBeregning: EndreBeregning,
): Promise<Avtale> => {
    const response = await api.post(
        `/avtaler/${avtale.id}/endre-tilskuddsberegning-dry-run`,
        { ...endreBeregning },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    return response.data;
};

export const oppdaterOppfølgingsEnhet = async (avtale: Avtale): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/oppdaterOppfølgingsEnhet`, null, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const forlengAvtale = async (avtale: Avtale, sluttDato: string) => {
    await api.post(
        `/avtaler/${avtale.id}/forleng`,
        { sluttDato },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};
export const forlengAvtaleDryRun = async (avtale: Avtale, sluttDato: string): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/forleng-dry-run`, { sluttDato });
    return response.data;
};

export const forkortAvtale = async (avtale: Avtale, sluttDato: string, grunn: string, annetGrunn?: string) => {
    await api.post(
        `/avtaler/${avtale.id}/forkort`,
        { sluttDato, grunn, annetGrunn },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const forkortAvtaleDryRun = async (avtale: Avtale, sluttDato: string): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/forkort-dry-run`, { sluttDato });
    return response.data;
};

export const sendTilbakeTilBeslutter = async (avtale: Avtale) => {
    const response = await api.post(`/avtaler/${avtale.id}/send-tilbake-til-beslutter`, null, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return response.data;
};

export const oppdatereMålInformasjon = async (avtale: Avtale, maal: Maal[]): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-maal`,
        { maal: maal },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const endreInkluderingstilskudd = async (
    avtale: Avtale,
    inkluderingstilskuddutgifter: Inkluderingstilskuddsutgift[],
): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-inkluderingstilskudd`,
        {
            inkluderingstilskuddsutgift: inkluderingstilskuddutgifter,
        },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const endreOmMentor = async (avtale: Avtale, mentorInnhold: MentorInnhold): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-om-mentor`, mentorInnhold, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const hentVtaoSats = async (forDato?: string): Promise<{ aar: number; belop: number }> => {
    const queryParams = new URLSearchParams(removeEmpty({ forDato }));
    const response = await api.get(`/satser/vtao?${queryParams}`);
    return response.data;
};

export const endreKidOgKontonummer = async (
    avtale: Avtale,
    arbeidsgiverKid?: string,
    arbeidsgiverKontonummer?: string,
): Promise<void> => {
    await api.put(
        `/avtaler/${avtale.id}/kid-og-kontonummer`,
        {
            arbeidsgiverKid,
            arbeidsgiverKontonummer,
        },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        },
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const oppdaterMentorFnr = async (
    avtaleId: string,
    data: { sistEndret: string; mentorFnr: string },
): Promise<Avtale> => {
    const resultat = await api.patch(`/avtaler/${avtaleId}/oppdater-mentor-fnr`, data, {
        headers: {
            'If-Unmodified-Since': data.sistEndret,
        },
    });
    return resultat.data;
};
