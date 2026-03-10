import { TiltaksType } from '@/types/avtale';
import { Organisasjon as AltinnOrganisasjon } from '@navikt/bedriftsmeny';
import { Organisasjon as Altinn3Organisasjon } from '@navikt/virksomhetsvelger';

export interface Innloggingskilde {
    tittel: string;
    part: string;
    url: string;
}

export interface NavEnhet {
    verdi: string;
    navn: string;
}

export type Tilganger = { [bedriftNr: string]: TiltaksType[] };

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'MENTOR' | 'BESLUTTER' | 'INGEN_ROLLE';

export interface InnloggetBruker {
    identifikator: string;
    erNavAnsatt: boolean;
    altinnOrganisasjoner: AltinnOrganisasjon[];
    altinn3Organisasjoner: { hierarki: Altinn3Organisasjon[] };
    rolle: Rolle;
    tilganger: Tilganger;
    navEnheter: NavEnhet[];
    kanVæreBeslutter?: boolean;
}

export interface Organisasjon {
    bedriftNavn: string;
    bedriftNr: string;
    tilgangstyper: TiltaksType[];
}
