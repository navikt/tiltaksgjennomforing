import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { hentAvtalerForInnloggetBrukerMedPost, hentAvtalerForInnloggetBrukerMedSokId } from '@/services/rest-service';
import { Avtale, PageableAvtale, PageableAvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { fjernTommeFelterFraObjekt } from '@/utils/stringUtils';
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FiltreringContext = createContext<
    [Filtrering, Dispatch<SetStateAction<Filtrering>>, PageableAvtalelisteRessurs, Dispatch<SetStateAction<PageableAvtalelisteRessurs>>]
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
        
        const tekniskPage = searchParams.get('page') ? (parseInt(searchParams.get('page')!) - 1) : 0;
        let resultat;
        setNettressursCtx({ status: Status.LasterInn });
        const sorteringskolonne = searchParams.get('sorteringskolonne') as keyof Avtale || '';
        let erGet = false;
        if (searchParams.get('sokId')) {
            const sokId = searchParams.get('sokId')!;     
            resultat = hentAvtalerForInnloggetBrukerMedSokId(sokId, 3, tekniskPage, sorteringskolonne);
            erGet = true;
        } else {
            resultat = hentAvtalerForInnloggetBrukerMedPost(filtre, 3, 0);
            erGet = false;
        }
        resultat.then((pagableAvtale: PageableAvtale) => {
            if (pagableAvtale.sokId === "") {
                // ugyldig sokId - Utfører blankt søk.
                hentAvtalerForInnloggetBrukerMedPost(filtre, 3, 0).then((pagableAvtale: PageableAvtale) => {
                    setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
                    setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1), sorteringskolonne: pagableAvtale.sorteringskolonne });
                    setFiltre({ ...pagableAvtale.sokeParametere, page: (pagableAvtale.currentPage + 1) + '', sorteringskolonne: pagableAvtale.sorteringskolonne });
                });
            } else {
                if (innloggetBruker.rolle === 'ARBEIDSGIVER') {
                    if (!erGet) {
                        const sokeParams = fjernTommeFelterFraObjekt({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1), sorteringskolonne: pagableAvtale.sorteringskolonne, bedrift: pagableAvtale.sokeParametere.bedriftNr });
                        setSearchParams(sokeParams, { replace: true });
                    }
                } else {
                    const sokeParams = fjernTommeFelterFraObjekt({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1), sorteringskolonne: pagableAvtale.sorteringskolonne });
                    setSearchParams(sokeParams);
                }
                setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
                setFiltre({ ...pagableAvtale.sokeParametere, page: (pagableAvtale.currentPage + 1) + '', sorteringskolonne: pagableAvtale.sorteringskolonne });
            }
        });

    }, [filtre, nettressursCtx.status, searchParams, setSearchParams, innloggetBruker.rolle]);

    return (
        <FiltreringContext.Provider value={[filtre, setFiltre, nettressursCtx, setNettressursCtx]}>
            {props.children}
        </FiltreringContext.Provider>
    );
};
