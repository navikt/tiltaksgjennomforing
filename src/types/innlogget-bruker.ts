import { TiltaksType } from '@/types/avtale';
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
interface AltinnTilganger {
    hierarki: Altinn3Organisasjon[];
    tilganger: Tilganger;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'MENTOR' | 'BESLUTTER' | 'INGEN_ROLLE';

export interface InnloggetBruker {
    identifikator: string;
    erNavAnsatt: boolean;
    altinnTilganger: AltinnTilganger;
    rolle: Rolle;
    navEnheter: NavEnhet[];
    kanVæreBeslutter?: boolean;
}

export interface Organisasjon {
    bedriftNavn: string;
    bedriftNr: string;
    tilgangstyper: TiltaksType[];
}
