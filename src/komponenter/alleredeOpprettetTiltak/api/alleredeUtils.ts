import { Dispatch, SetStateAction } from 'react';
import { AlleredeRegistrertAvtale, TiltaksType } from '@/types/avtale';
import { sjekkOmDeltakerAlleredeErRegistrertPaaTiltak } from '@/services/rest-service';

interface FetchData {
    deltakerFnr: string;
    tiltakstype: TiltaksType;
    id: string;
    startDato: string | undefined;
    sluttDato: string | undefined;
    setAlleredeRegistrertAvtale: Dispatch<SetStateAction<AlleredeRegistrertAvtale[]>>;
    setGodkjenningsModalIsOpen: Dispatch<SetStateAction<boolean>>;
    godkjenn: () => Promise<void> | void;
}

interface GodkjennProps {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface GodkjennAvtalePaVegneAvProps extends GodkjennProps {
    godkjennPaVegneAv: () => void | Promise<void>;
}

interface GodkjennAvtaleProps extends GodkjennProps {
    godkjenn: () => Promise<void>;
}

export const godkjennAvtalePaVegneAv = ({ godkjennPaVegneAv, setModalIsOpen }: GodkjennAvtalePaVegneAvProps): void => {
    try {
        new Promise(() => godkjennPaVegneAv()).then(() => setModalIsOpen(false));
    } catch (err) {
        console.error(err);
    }
};

export const godkjennAvtale = ({ godkjenn, setModalIsOpen }: GodkjennAvtaleProps): void => {
    try {
        godkjenn().then(() => setModalIsOpen(false));
    } catch (err) {
        console.error(err);
    }
};

export const fetchdata = async ({
    deltakerFnr,
    tiltakstype,
    id,
    startDato,
    sluttDato,
    setAlleredeRegistrertAvtale,
    setGodkjenningsModalIsOpen,
    godkjenn,
}: FetchData): Promise<void> => {
    const listeAvtalerDeltakerAlleredeRegistrert: AlleredeRegistrertAvtale[] | [] =
        await sjekkOmDeltakerAlleredeErRegistrertPaaTiltak(
            deltakerFnr,
            tiltakstype,
            id,
            startDato ?? null,
            sluttDato ?? null
        );
    if (listeAvtalerDeltakerAlleredeRegistrert.length > 0) {
        setAlleredeRegistrertAvtale(listeAvtalerDeltakerAlleredeRegistrert);
        return setGodkjenningsModalIsOpen(true);
    }
    return godkjenn();
};
