export enum Status {
    IKKE_LASTET,
    LASTER_INN,
    SENDER_INN,
    LASTET,
    SENDT,
    FEIL,
    OMLAST,
}

interface IkkeLastet {
    status: Status.IKKE_LASTET;
}

interface LasterInn {
    status: Status.LASTER_INN;
}

interface SenderInn<T> {
    status: Status.SENDER_INN;
    data: T;
}

interface Lastet<T> {
    status: Status.LASTET;
    data: T;
}

interface Sendt {
    status: Status.SENDT;
}

interface Feil {
    status: Status.FEIL;
    error: Error;
}

interface Omlast {
    status: Status.OMLAST;
}

export type Nettressurs<T> = IkkeLastet | LasterInn | SenderInn<T> | Lastet<T> | Sendt | Feil | Omlast;
