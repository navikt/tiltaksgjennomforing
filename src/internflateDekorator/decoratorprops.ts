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
    etterSokefelt?: string; // kan brukes til å sette inn egen-definert html i menyen, eks: <h1>Hello world</h1>
}

export interface DecoratorProps {
    appname: string; // navn app
    fnr: string | undefined | null; // fnr til bruker i context
    enhet: string | undefined | null; // enhetsnr på enhet i context
    toggles: Toggles;
    markup?: Markup; // ekstra markup som skal vises i menyen

    contextholder?: true | Contextholder;
    autoSubmitOnMount?: boolean;

    onSok(fnr: string): void; // Callback-funksjon for når man skal bytte bruker
    onEnhetChange(enhet: string): void; // Callback-funksjon for når man skal bytte enhet
}
