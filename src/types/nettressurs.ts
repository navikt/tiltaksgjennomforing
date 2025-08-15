export enum Status {
    IKKE_LASTET,
    LASTER_INN,
    SENDER_INN,
    LASTET,
    SENDT,
    FEIL,
    OMLAST,
}

export interface IkkeLastet {
    status: Status.IKKE_LASTET;
}

export interface LasterInn {
    status: Status.LASTER_INN;
}

export interface SenderInn<T> {
    status: Status.SENDER_INN;
    data: T;
}

export interface Lastet<T> {
    status: Status.LASTET;
    data: T;
}

export interface Sendt {
    status: Status.SENDT;
}

export interface Feil {
    status: Status.FEIL;
    error: Error;
}

export interface Omlast {
    status: Status.OMLAST;
}

export type Nettressurs<T> = IkkeLastet | LasterInn | SenderInn<T> | Lastet<T> | Sendt | Feil | Omlast;
