import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { Kostnadssted } from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';
import { Feature, FeatureToggles } from '@/FeatureToggleProvider';
import { Avtalerolle } from '@/OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';
import { basename } from '@/paths';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import {
    AlleredeRegistrertAvtale,
    Avslagsårsaker,
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
    PageableAvtaleMinimalForBeslutter,
    Stilling,
    TiltaksType,
    Varighet,
} from '@/types/avtale';
import { ApiError, AutentiseringError, FeilkodeError } from '@/types/errors';
import { Hendelse } from '@/types/hendelse';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Variants } from '@/types/unleash-variant';
import { Varsel } from '@/types/varsel';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { mutate } from 'swr';

export const API_URL = '/tiltaksgjennomforing/api';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});

axiosRetry(api, { retries: 3 });

api.interceptors.response.use(
    (response) => response,
    (error) => {
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

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
    return obj;
};

export const hentAvtalerForInnloggetBruker = async (
    søkekriterier: Filtrering,
    skip: number = 0,
    limit: number = 10000000
): Promise<Avtale[]> => {
    // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr'
    const søkekriterierFiltrert = {
        bedriftNr: søkekriterier.bedrift,
        ...søkekriterier,
        bedrift: undefined,
        skip,
        limit,
    };
    const queryParam = new URLSearchParams(removeEmpty(søkekriterierFiltrert));
    const response = await api.get<Avtale[]>(`/avtaler?${queryParam}`);
    return response.data;
};

export const hentAvtalerForInnloggetBeslutter = async (
    søkekriterier: Filtrering,
    size: number = 2,
    page: number = 0,
    limit: number = 10000000
): Promise<PageableAvtaleMinimalForBeslutter> => {
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
    const response = await api.get<PageableAvtaleMinimalForBeslutter>(`/avtaler/beslutter-liste?${queryParam}`);
    return response.data
};

export const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    if (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder) {
        if (
            window.confirm(
                'En av partene i avtalen har godkjent. ' +
                    'Ved å lagre endringer oppheves godkjenningene. Ønsker du å fortsette?'
            )
        ) {
            await opphevGodkjenninger(avtale.id);
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
    ryddeavtale?: boolean
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler', deltakerFnr, bedriftNr, tiltakstype, ryddeavtale);
};

export const opprettAvtaleSomArbeidsgiver = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler/opprett-som-arbeidsgiver', deltakerFnr, bedriftNr, tiltakstype);
};

export const opprettMentorAvtale = async (
    deltakerFnr: string,
    mentorFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType,
    avtalerolle: Avtalerolle
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
    ryddeavtale?: boolean
): Promise<Avtale> => {
    const ryddeavtaleParam = { ryddeavtale };
    const queryParam = new URLSearchParams(removeEmpty(ryddeavtaleParam));
    const postResponse = await api.post(`${url}?${queryParam}`, {
        deltakerFnr,
        bedriftNr,
        tiltakstype,
    });
    const getResponse = await api.get<Avtale>(`${postResponse.headers.location}`);
    return getResponse.data;
};

export const mentorGodkjennTaushetserklæring = async (avtale: Avtale): Promise<Avtale> => {
    const uri = `/avtaler/${avtale.id}/mentorGodkjennTaushetserklæring`;

    await api.post(uri, null, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });

    return hentAvtale(avtale.id);
};

export const godkjennAvtale = async (avtale: Avtale) => {
    const uri = `/avtaler/${avtale.id}/godkjenn`;

    await api.post(uri, null, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });

    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegne = async (avtale: Avtale, paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner) => {
    const uri = `/avtaler/${avtale.id}/godkjenn-paa-vegne-av`;
    await api.post(uri, paVegneGrunn, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegneAvArbeidsgiver = async (
    avtale: Avtale,
    paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner
) => {
    const uri = `/avtaler/${avtale.id}/godkjenn-paa-vegne-av-arbeidsgiver`;
    await api.post(uri, paVegneGrunn);
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegneAvDeltakerOgArbeidsgiver = async (
    avtale: Avtale,
    paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner
) => {
    const uri = `/avtaler/${avtale.id}/godkjenn-paa-vegne-av-deltaker-og-arbeidsgiver`;
    await api.post(uri, paVegneGrunn);
    return hentAvtale(avtale.id);
};

export const opphevGodkjenninger = async (avtaleId: string) => {
    await api.post(`/avtaler/${avtaleId}/opphev-godkjenninger`);
    return hentAvtale(avtaleId);
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

export const sjekkOmDeltakerAlleredeErRegistrertPaaTiltak = async (
    deltakerFnr: string,
    tiltakstype: TiltaksType,
    avtaleId: string | null,
    startdato: string | null,
    sluttdato: string | null
): Promise<AlleredeRegistrertAvtale[] | []> => {
    const optionalAvtaleId: string = avtaleId ? '&avtaleId=' + avtaleId : '';
    const optionalStartdato: string = startdato ? '&startDato=' + startdato : '';
    const optionalSluttdato: string = sluttdato ? '&sluttDato=' + sluttdato : '';

    const response = await api.get(
        '/avtaler/deltaker-allerede-paa-tiltak?' +
            'deltakerFnr=' +
            deltakerFnr +
            '&tiltakstype=' +
            tiltakstype +
            optionalAvtaleId +
            optionalStartdato +
            optionalSluttdato
    );
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

export const delAvtaleMedAvtalepart = async (avtaleId: string, rolle: Rolle): Promise<void> => {
    await api.post(`/avtaler/${avtaleId}/del-med-avtalepart`, JSON.stringify(rolle));
};

export const oppdatereKostnadsstedet = async (avtaleId: string, kostnadssted: Kostnadssted): Promise<Avtale> => {
    const response = await api.post(`avtaler/${avtaleId}/endre-kostnadssted`, JSON.stringify(kostnadssted));
    return response.data;
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

export const setOmAvtalenKanEtterregistreres = async (avtaleId: string): Promise<Avtale> => {
    const uri = `/avtaler/${avtaleId}/set-om-avtalen-kan-etterregistreres`;
    const response = await api.post(uri);
    return response.data;
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

export const oppdatereKontaktInformasjon = async (
    avtale: Avtale,
    endreKontaktInfo: EndreKontaktInfo
): Promise<void> => {
    await api.post(
        `/avtaler/${avtale.id}/endre-kontaktinfo`,
        { ...endreKontaktInfo },
        {
            headers: {
                'If-Unmodified-Since': avtale.sistEndret,
            },
        }
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
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
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export type EndreStilling = Stilling & Pick<Varighet, 'stillingprosent' | 'antallDagerPerUke'>;
export const oppdatereStillingbeskrivelse = async (avtale: Avtale, endreStillingInfo: EndreStilling): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-stillingbeskrivelse`, endreStillingInfo);
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
        }
    );
    await mutate(`/avtaler/${avtale.id}/versjoner`);
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

export const oppdaterOppfølgingsEnhet = async (avtale: Avtale): Promise<Avtale> => {
    const uri = `/avtaler/${avtale.id}/oppdaterOppfølgingsEnhet`;
    const response = await api.post(uri);
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
    await mutate(`/avtaler/${avtale.id}/versjoner`);
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
    await mutate(`/avtaler/${avtale.id}/versjoner`);
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
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const endreInkluderingstilskudd = async (
    avtale: Avtale,
    inkluderingstilskuddutgifter: Inkluderingstilskuddsutgift[]
): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-inkluderingstilskudd`, {
        inkluderingstilskuddsutgift: inkluderingstilskuddutgifter,
    });
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const endreOmMentor = async (avtale: Avtale, mentorInnhold: MentorInnhold): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/endre-om-mentor`, mentorInnhold);
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};

export const justerArenaMigreringsdato = async (avtale: Avtale, migreringsdato: string): Promise<void> => {
    await api.post(`/avtaler/${avtale.id}/juster-arena-migreringsdato`, { migreringsdato });
    await mutate(`/avtaler/${avtale.id}/versjoner`);
};
export const justerArenaMigreringsdatoDryRun = async (avtale: Avtale, migreringsdato: string): Promise<Avtale> => {
    const response = await api.post(`/avtaler/${avtale.id}/juster-arena-migreringsdato/dry-run`, { migreringsdato });
    return response.data;
};
