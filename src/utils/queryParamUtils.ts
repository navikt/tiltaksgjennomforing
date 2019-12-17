import { Søk, Søketyper } from '@/AvtaleOversikt/SokEtterAvtaler/SokEtterAvtaler';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';

const lagQueryParams = (innloggetBruker: InnloggetBruker, sok: Søk) => {
    if (sok.søketype === Søketyper.DeltakerSøk) {
        return { deltakerFnr: sok.deltakerFnr };
    } else if (sok.søketype === Søketyper.BedriftSøk) {
        return { bedriftNr: sok.bedriftNr };
    } else {
        return innloggetBruker.erNavAnsatt ? { veilederNavIdent: innloggetBruker.identifikator } : {};
    }
};

export { lagQueryParams };
