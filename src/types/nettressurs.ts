export enum Status {
    'IkkeLastet',
    'LasterInn',
    'SenderInn',
    'Lastet',
    'Feil',
}

export interface IkkeLastet {
    status: Status.IkkeLastet;
}

export interface LasterInn {
    status: Status.LasterInn;
}

export interface SenderInn<T> {
    status: Status.SenderInn;
    data: T;
}

export interface Lastet<T> {
    status: Status.Lastet;
    data: T;
}

export interface Feil {
    status: Status.Feil;
    error: string;
}

export type Nettressurs<T> =
    | IkkeLastet
    | LasterInn
    | SenderInn<T>
    | Lastet<T>
    | Feil;
