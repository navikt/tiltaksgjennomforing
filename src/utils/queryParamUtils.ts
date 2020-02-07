import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import { Søk, Søketyper } from '@/AvtaleOversikt/Filtrering';

const lagQueryParam = (innloggetBruker: InnloggetBruker, sok: Søk) => {
    switch (sok.søketype) {
        case Søketyper.TomtSøk:
            return innloggetBruker.erNavAnsatt ? { veilederNavIdent: innloggetBruker.identifikator } : {};
        case Søketyper.DeltakerSøk:
            return { deltakerFnr: sok.deltakerFnr };
        case Søketyper.BedriftSøk:
            return { bedriftNr: sok.bedriftNr };
        case Søketyper.Tiltakstype:
            return { tiltakstype: sok.tiltakstype };
    }
};

const lagQueryParams = (innloggetBruker: InnloggetBruker, sok: Søk[]) => {
    let obj = Object.assign({}, ...sok.map(s => lagQueryParam(innloggetBruker, s)));
    return obj;
};

export { lagQueryParam, lagQueryParams };
