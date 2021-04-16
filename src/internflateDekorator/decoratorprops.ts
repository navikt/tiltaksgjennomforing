export interface DecoratorProps {
    appname: string; // Navn på applikasjon
    fnr?: FnrContextvalue; // Konfigurasjon av fødselsnummer-kontekst
    enhet?: EnhetContextvalue; // Konfigurasjon av enhet-kontekst
    toggles: Toggles; // Konfigurasjon av hvilke elementer som skal vises i dekoratøren
    markup?: Markup; // Ekstra innhold i dekoratøren, kan brukes om man trenger å legge en knapp innenfor dekoratøren

    /* Konfigurasjn av tilkobling til contextholder. true; use default.
    Om man sender inn objekt så kan man overstyre url og om enhet skal generere bekreftelsemodal.
    Om den ikke settes vil man ikke bruke contextholder.*/
    contextholder?: true | Contextholder;

    urler?: {
        // Konfigurasjon av url til aktoerregisteret om man har behov for å sende via en proxy eller ligende.
        // Default-verdien tar hensyn til miljø og kaller direkte mot app.adeo.no/aktoerregister
        aktoerregister?: string;
    };

    /* Callback-funksjon for når man skal bytte bruker
     (blir kalt etter bekreftelse-modal, eller ved direkte søk i søkefeltet)*/
    onSok(fnr: string): void;

    /* Callback-funksjon for når man skal bytte enhet
     (blir kalt etter beksreftelse-modal, eller ved direkte endring i enhets-dropdown)*/
    onEnhetChange(enhet: string): void;
}

interface Toggles {
    visVeilder: boolean;
    visSokefelt: boolean;
    visEnhetVelger: boolean;
    visEnhet: boolean;
}

interface Contextholder {
    url?: string;
    promptBeforeEnhetChange?: boolean; // Kan settes om man ikke ønsker bekreftelse-modal ved enhets-endringer
}

export interface Markup {
    etterSokefelt?: string; // Gir muligheten for sende inn egen html som blir en del av dekoratøren
}

/* Fnr/Enhet-konfiguration støttet både `Controlled` og `Uncontrolled` operasjon.
// Ved bruk av `Controlled` må konsument-applikasjonen selv ta ansvar for oppdatering av `value` etter enhver `onChange`
 Dette er i motsetning til `Uncontrolled`, hvor dette håndteres av dekoratøren.
  Og alt konsument-applikasjonen trenger å gjøre er å følge med på `onChange`. */

export interface ControlledContextvalue<T> extends BaseContextvalue<T> {
    value: string | null;
}

export interface UncontrolledContextvalue<T> extends BaseContextvalue<T> {
    initialValue: string | null;
}

export interface BaseContextvalue<T> {
    display: T;
    skipModal?: boolean;
    ignoreWsEvents?: boolean;
    onChange(value: string | null): void;
}

export type Contextvalue<T> = ControlledContextvalue<T> | UncontrolledContextvalue<T>;

export enum EnhetDisplay {
    ENHET = 'ENHET',
    ENHET_VALG = 'ENHET_VALG',
}

export enum FnrDisplay {
    SOKEFELT = 'SOKEFELT',
}

export type EnhetContextvalue = Contextvalue<EnhetDisplay>;
export type FnrContextvalue = Contextvalue<FnrDisplay>;
