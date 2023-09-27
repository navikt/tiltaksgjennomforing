import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { hentAvtalerForInnloggetBrukerMedPost, hentAvtalerForInnloggetBrukerMedSokId } from '@/services/rest-service';
import { AvtalelisteRessurs, PageableAvtale } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import React, { FunctionComponent, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from './useFilter';

export const FiltreringContext = createContext<
    [Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>, PageableAvtale?]
>([{}, () => null]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPageCtx, setCurrentPageCtx] = useState<PageableAvtale>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteRessurs>({ status: Status.IkkeLastet });
    const { endreFilter } = useFilter();
    const params: any = {};
    // for (const [k, v] of new URLSearchParams(window.location.search)) {
    //     params[k] = v;
    // }
    const [filtre, setFiltre] = useState<Filtrering>(params);

    useEffect(() => {
        // KJØR EN GANG PÅ OPPSTART
        // if (searchParams.get('sokId')) {
        //     console.log('henter avtaler med sokId');
        //     const sokId = searchParams.get('sokId')!;
        //     const page = parseInt(filtre.page ? filtre.page : '1', 10);
        //     hentAvtalerForInnloggetBrukerMedSokId(sokId, 10, page - 1).then((pagableAvtale: PageableAvtale) => {
        //         setCurrentPageCtx(pagableAvtale);
        //         setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
        //         setSearchParams({ sokId: pagableAvtale.sokId });
        //         //endreFilter(pagableAvtale.sokeParametere);
        //         setFiltre(pagableAvtale.sokeParametere);
        //         // setInitLast(false);
        //     });
        // }

        //const page = parseInt(filtre.page ? filtre.page : '1', 10);
        //const pageFraUrlEllerFilter = searchParams.get('page') ? (parseInt(searchParams.get('page')!) - 1) : page;
        const tekniskPage = searchParams.get('page') ? (parseInt(searchParams.get('page')!) - 1) : 0;
        //const urlPage = searchParams.get('page') ? (parseInt(searchParams.get('page')!)) : 1;
        console.log('gjør søk med tekniskPage: ', tekniskPage);
        var resultat;
        if (searchParams.get('sokId')) {
            const sokId = searchParams.get('sokId')!;
            
            //console.log('gjør sokid kall med page og minus 1: ', pageFraUrlEllerFilter);
            
            resultat = hentAvtalerForInnloggetBrukerMedSokId(sokId, 3, tekniskPage);
        } else {
            resultat = hentAvtalerForInnloggetBrukerMedPost(filtre, 3, tekniskPage);
        }
        resultat.then((pagableAvtale: PageableAvtale) => {
            setCurrentPageCtx(pagableAvtale);
            setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
            setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1) });
            //pagableAvtale.sokeParametere.page = '' + urlPage;
            setFiltre({...pagableAvtale.sokeParametere, page: (pagableAvtale.currentPage + 1) + ''});
        });

    }, []);

    return (
        <FiltreringContext.Provider value={[filtre, setFiltre, currentPageCtx]}>
            {props.children}
        </FiltreringContext.Provider>
    );
};
