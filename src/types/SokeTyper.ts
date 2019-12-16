export type SokeTyper = {
    veilederNavIdent?: string;
    bedriftNr?: string;
    deltakerFnr?: string;
};

export enum Søketyper {
    'TomtSøk',
    'DeltakerSøk',
    'BedriftSøk',
}

export type TomtSøk = {
    søketype: Søketyper.TomtSøk;
};

export type DeltakerSøk = {
    deltakerFnr: string;
    søketype: Søketyper.DeltakerSøk;
};

export type BedriftSøk = {
    bedriftNr: string;
    søketype: Søketyper.BedriftSøk;
};

export type Søk = TomtSøk | DeltakerSøk | BedriftSøk;
