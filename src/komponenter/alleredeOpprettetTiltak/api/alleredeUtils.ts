import { Dispatch, SetStateAction } from 'react';
import { AlleredeRegistrertAvtale, TiltaksType } from '@/types/avtale';
import { sjekkOmDeltakerAlleredeErRegistrertPaaTiltak } from '@/services/rest-service';
import { AlleredeOpprettetInfo } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';

interface FetchData {
    deltakerFnr: string;
    tiltakstype: TiltaksType;
    id: string;
    startDato: string | undefined;
    sluttDato: string | undefined;
    alleredeRegistrertAvtale: AlleredeOpprettetInfo;
    setAlleredeRegistrertAvtale: Dispatch<SetStateAction<AlleredeOpprettetInfo>>;
    setGodkjenningsModalIsOpen: Dispatch<SetStateAction<boolean>>;
    godkjenn: () => Promise<void> | void;
}

export enum Path {
    OPPRETT = 'opprett-avtale',
    GODKJENN = 'godkjenning',
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

export const endrePathAlleredeOpprettet = (
    pathnameList: string[],
    path: Path,
    alleredeOpprettet: AlleredeOpprettetInfo,
    setAlleredeOpprettet: Dispatch<SetStateAction<AlleredeOpprettetInfo>>
) => {
    if (pathnameList.includes(path)) {
        if (alleredeOpprettet.steg !== path) {
            setAlleredeOpprettet({ avtaler: [], deltaker: '', steg: path });
        }
    }
};

export const godkjennAvtalePaVegneAv = async ({
    godkjennPaVegneAv,
    setModalIsOpen,
}: GodkjennAvtalePaVegneAvProps): Promise<void> => {
    try {
        await godkjennPaVegneAv();
        setModalIsOpen(false);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const godkjennAvtale = async ({ godkjenn, setModalIsOpen }: GodkjennAvtaleProps): Promise<void> => {
    try {
        await godkjenn();
        setModalIsOpen(false);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const fetchdata = async ({
    deltakerFnr,
    tiltakstype,
    id,
    startDato,
    sluttDato,
    alleredeRegistrertAvtale,
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
        setAlleredeRegistrertAvtale({
            ...alleredeRegistrertAvtale,
            avtaler: listeAvtalerDeltakerAlleredeRegistrert,
            deltaker: deltakerFnr,
        });
        return setGodkjenningsModalIsOpen(true);
    }
    return godkjenn();
};
