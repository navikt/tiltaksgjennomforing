import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { hentAvtalerForInnloggetBrukerMedPost, hentAvtalerForInnloggetBrukerMedSokId } from '@/services/rest-service';
import { PageableAvtale } from '@/types/avtale';
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FiltreringContext = createContext<
    [Filtrering, Dispatch<SetStateAction<Filtrering>>, PageableAvtale | undefined, Dispatch<SetStateAction<PageableAvtale | undefined>>]
>([{}, () => null, undefined, () => null]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPageCtx, setCurrentPageCtx] = useState<PageableAvtale>();
    const params: any = {};
    const [filtre, setFiltre] = useState<Filtrering>(params);

    useEffect(() => {
        // KJØR EN GANG PÅ OPPSTART
        if (currentPageCtx) return;
        if (innloggetBruker.rolle === 'BESLUTTER') return;
        if (innloggetBruker.rolle === 'ARBEIDSGIVER' && !filtre.bedriftNr) return;

        const tekniskPage = searchParams.get('page') ? (parseInt(searchParams.get('page')!) - 1) : 0;
        let resultat;
        if (searchParams.get('sokId')) {
            const sokId = searchParams.get('sokId')!;     
            resultat = hentAvtalerForInnloggetBrukerMedSokId(sokId, 3, tekniskPage);
        } else {
            resultat = hentAvtalerForInnloggetBrukerMedPost(filtre, 3, tekniskPage);
        }
        resultat.then((pagableAvtale: PageableAvtale) => {
            if (pagableAvtale.sokId === "") {
                // ugyldig sokId - Utfører blankt søk.
                hentAvtalerForInnloggetBrukerMedPost(filtre, 3, tekniskPage).then((pagableAvtale: PageableAvtale) => {
                    setCurrentPageCtx(pagableAvtale);
                    setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1) });
                    setFiltre({...pagableAvtale.sokeParametere, page: (pagableAvtale.currentPage + 1) + ''});
                    return;
                });
            }
            setCurrentPageCtx(pagableAvtale);
            setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1) });
            setFiltre({...pagableAvtale.sokeParametere, page: (pagableAvtale.currentPage + 1) + ''});
        });

    }, [filtre, currentPageCtx, searchParams, setSearchParams, innloggetBruker.rolle]);

    return (
        <FiltreringContext.Provider value={[filtre, setFiltre, currentPageCtx, setCurrentPageCtx]}>
            {props.children}
        </FiltreringContext.Provider>
    );
};
