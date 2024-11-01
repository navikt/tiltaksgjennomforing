import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { hentAvtalerForInnloggetBrukerMedPost, hentAvtalerForInnloggetBrukerMedSokId } from '@/services/rest-service';
import { Avtale, PageableAvtale, PageableAvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { fjernTommeFelterFraObjekt } from '@/utils/utils';
import {
    Dispatch,
    FunctionComponent,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

export const FiltreringContext = createContext<
    [
        Filtrering,
        Dispatch<SetStateAction<Filtrering>>,
        PageableAvtalelisteRessurs,
        Dispatch<SetStateAction<PageableAvtalelisteRessurs>>,
    ]
>([{}, () => null, { status: Status.IkkeLastet }, () => null]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [nettressursCtx, setNettressursCtx] = useState<PageableAvtalelisteRessurs>({ status: Status.IkkeLastet });
    const params: any = {};
    const [filtre, setFiltre] = useState<Filtrering>(params);

    useEffect(() => {
        // KJØR EN GANG PÅ OPPSTART
        if (nettressursCtx.status !== Status.IkkeLastet) return;
        if (innloggetBruker.rolle === 'BESLUTTER') return;
        if (innloggetBruker.rolle === 'ARBEIDSGIVER' && !filtre.bedriftNr) return;

        const bedriftNr = filtre.bedriftNr || searchParams.get('bedrift') || searchParams.get('bedriftNr') || null;
        const bedriftNrISøkekriterier = bedriftNr && bedriftNr.trim().length === 9 ? { bedriftNr: bedriftNr } : {};
        const tekniskPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) - 1 : 0;
        let resultat;
        setNettressursCtx({ status: Status.LasterInn });
        const sorteringskolonne = (searchParams.get('sorteringskolonne') as keyof Avtale) || 'sistEndret';
        const sorteringOrder = searchParams.get('sorteringOrder') || 'ASC';
        let erGet = false;
        if (searchParams.get('sokId')) {
            const sokId = searchParams.get('sokId')!;
            resultat = hentAvtalerForInnloggetBrukerMedSokId(sokId, 10, tekniskPage, sorteringskolonne, sorteringOrder);
            erGet = true;
        } else {
            resultat = hentAvtalerForInnloggetBrukerMedPost(
                {
                    sorteringOrder: sorteringOrder,
                    sorteringskolonne: sorteringskolonne,
                    ...filtre,
                    ...bedriftNrISøkekriterier,
                },
                10,
                0,
            );
            erGet = false;
        }
        resultat.then((pagableAvtale: PageableAvtale) => {
            if (pagableAvtale.sokId === '') {
                // ugyldig sokId - Utfører blankt søk.
                hentAvtalerForInnloggetBrukerMedPost(filtre, 10, 0).then((pagableAvtale: PageableAvtale) => {
                    setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
                    setSearchParams({
                        sokId: pagableAvtale.sokId,
                        page: '' + (pagableAvtale.currentPage + 1),
                        sorteringskolonne: pagableAvtale.sorteringskolonne,
                        sorteringOrder: pagableAvtale.sorteringOrder,
                    });
                    setFiltre({
                        ...pagableAvtale.sokeParametere,
                        page: pagableAvtale.currentPage + 1 + '',
                        sorteringskolonne: pagableAvtale.sorteringskolonne,
                        sorteringOrder: pagableAvtale.sorteringOrder,
                    });
                });
            } else {
                if (innloggetBruker.rolle === 'ARBEIDSGIVER') {
                    if (!erGet) {
                        const sokeParams = fjernTommeFelterFraObjekt({
                            sokId: pagableAvtale.sokId,
                            page: '' + (pagableAvtale.currentPage + 1),
                            sorteringskolonne: pagableAvtale.sorteringskolonne,
                            sorteringOrder: pagableAvtale.sorteringOrder,
                            bedrift: pagableAvtale.sokeParametere.bedriftNr,
                        });
                        setSearchParams(sokeParams, { replace: true });
                    }
                } else {
                    const sokeParams = fjernTommeFelterFraObjekt({
                        sokId: pagableAvtale.sokId,
                        page: '' + (pagableAvtale.currentPage + 1),
                        sorteringskolonne: pagableAvtale.sorteringskolonne,
                        sorteringOrder: pagableAvtale.sorteringOrder,
                    });
                    setSearchParams(sokeParams, { replace: true });
                }
                setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
                setFiltre({
                    ...pagableAvtale.sokeParametere,
                    page: pagableAvtale.currentPage + 1 + '',
                    sorteringskolonne: pagableAvtale.sorteringskolonne,
                    sorteringOrder: pagableAvtale.sorteringOrder,
                });
            }
        });
    }, [filtre, nettressursCtx.status, searchParams, setSearchParams, innloggetBruker.rolle]);

    return (
        <FiltreringContext.Provider value={[filtre, setFiltre, nettressursCtx, setNettressursCtx]}>
            {props.children}
        </FiltreringContext.Provider>
    );
};
