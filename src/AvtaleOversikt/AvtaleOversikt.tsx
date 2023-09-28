import AvtaleOversiktArbeidsgiverInformasjon from '@/AvtaleOversikt/AvtaleOversiktArbeidsgiverInformasjon';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import ArbeidsgiverFiltrering from '@/AvtaleOversikt/Filtrering/ArbeidsgiverFiltrering';
import VeilederFiltrering from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { ReactComponent as PlussIkon } from '@/assets/ikoner/pluss-tegn.svg';
import Banner from '@/komponenter/Banner/Banner';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import { pathTilOpprettAvtale, pathTilOpprettAvtaleArbeidsgiver } from '@/paths';
import {
    hentAvtalerForInnloggetBrukerMedPost,
    hentAvtalerForInnloggetBrukerMedSokId,
    hentUlesteVarsler,
} from '@/services/rest-service';
import { AvtalelisteRessurs, PageableAvtale } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Pagination } from '@navikt/ds-react';
import _ from 'lodash';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './AvtaleOversikt.less';
import { FiltreringContext } from './Filtrering/FiltreringProvider';

const cls = BEMHelper('avtaleoversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { filtre, endreFilter } = useFilter();
    const [currentPage, setCurrentPage] = useState<PageableAvtale>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteRessurs>({ status: Status.IkkeLastet });
    const [searchParams, setSearchParams] = useSearchParams();
    const [, , currentPageCtx] = useContext(FiltreringContext);

    useEffect(() => {
        if (!currentPageCtx) return;
        setNettressurs({ status: Status.LasterInn });
    

        const filtreUtenPage = _.omit(filtre, 'page');
        const erfiltreLikeCurrentPage = _.isEqual(currentPageCtx?.sokeParametere, filtreUtenPage);
        const page = parseInt(filtre.page ? filtre.page : '1');

        if (currentPageCtx && !erfiltreLikeCurrentPage) {
            
            setNettressurs({ status: Status.LasterInn });

            hentAvtalerForInnloggetBrukerMedPost(filtre, 3, page - 1).then((pagableAvtale: PageableAvtale) => {
                setCurrentPage(pagableAvtale);
                setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
                console.log('setter page: ', page);
                
                setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1) });
            });
        } else if ((page - 1) !== currentPageCtx.currentPage) {
            console.log(page, currentPageCtx.currentPage);
            console.log('page minus 1: ', page - 1);
            
            hentAvtalerForInnloggetBrukerMedSokId(searchParams.get('sokId')!, 3, page - 1).then(
                (pagableAvtale: PageableAvtale) => {
                    setCurrentPage(pagableAvtale);
                    setNettressurs({ status: Status.Lastet, data: pagableAvtale?.avtaler });
                    setSearchParams({ sokId: pagableAvtale.sokId, page: '' + (pagableAvtale.currentPage + 1) });
                }
            );
        } else {
            console.log('setter current page ctx: ', currentPageCtx);
            setCurrentPage(currentPageCtx);
            setSearchParams({ sokId: currentPageCtx.sokId, page: '' + (currentPageCtx.currentPage + 1) });
            setNettressurs({ status: Status.Lastet, data: currentPageCtx?.avtaler });
        }
    }, [filtre]);

    useEffect(() => {
        hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    const layout = useAvtaleOversiktLayout();

    const harTilgangerSomArbeidsgiver =
        innloggetBruker.rolle === 'ARBEIDSGIVER' &&
        filtre.bedrift &&
        innloggetBruker.tilganger[filtre.bedrift]?.length > 0;

    const antallAvtalerSuffiks =
        currentPage && (currentPage?.totalItems > 1 || currentPage?.totalItems === 0) ? ' avtaler' : ' avtale';
    const antallAvtalerTekst = currentPage?.totalItems ? `(${currentPage?.totalItems} ${antallAvtalerSuffiks})` : '';
    const oversiktTekst = `Tiltaksoversikt ${antallAvtalerTekst}`;

    const pageNumber = parseInt(filtre.page || '1');

    return (
        <>
            <Dokumenttittel tittel={oversiktTekst} />
            <Banner
                byttetOrg={() => {
                    //parseWindowLocationSearch();
                }}
                tekst={oversiktTekst}
            />

            <BannerNAVAnsatt tekst={oversiktTekst} />
            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                <div
                    style={layout.stylingAvFilterOgTabell}
                    className={cls.element('filter-og-tabell')}
                    aria-labelledby={cls.element('filter-og-tabell')}
                    role="complementary"
                    id={cls.element('filter-og-tabell')}
                >
                    {innloggetBruker.rolle === 'VEILEDER' && (
                        <aside style={layout.stylingAvFilter}>
                            <div style={{ margin: '0.2rem 0 1rem 0' }}>
                                <LenkeKnapp path={pathTilOpprettAvtale} icon={<PlussIkon />}>
                                    Opprett ny avtale
                                </LenkeKnapp>
                            </div>
                            <VeilederFiltrering />
                        </aside>
                    )}
                    {innloggetBruker.rolle === 'ARBEIDSGIVER' &&
                        innloggetBruker.altinnOrganisasjoner.length > 0 &&
                        innloggetBruker.tilganger[filtre.bedrift!] && (
                            <aside style={layout.stylingAvFilter}>
                                {harTilgangerSomArbeidsgiver && (
                                    <div style={{ margin: '0.2rem 0 1rem 0' }}>
                                        <LenkeKnapp path={pathTilOpprettAvtaleArbeidsgiver} icon={<PlussIkon />}>
                                            Opprett ny avtale
                                        </LenkeKnapp>
                                    </div>
                                )}
                                <ArbeidsgiverFiltrering />
                            </aside>
                        )}
                    <section style={layout.stylingAvTabell}>
                        <Avtaler avtalelisteRessurs={nettressurs} innloggetBruker={innloggetBruker} varsler={varsler} />
                        <AvtaleOversiktArbeidsgiverInformasjon rolle={innloggetBruker.rolle} cls={cls} />
                        <div className={clsPagination.className}>
                            {nettressurs.status === Status.LasterInn && <VerticalSpacer rem={3.9} />}
                            {pageNumber && nettressurs.status === Status.Lastet && currentPage!.totalPages > 0 && (
                                <Pagination
                                    page={pageNumber}
                                    onPageChange={(x) => {
                                        endreFilter({ page: '' + x });
                                        console.log('endrer filter med page fra pagination: ', x);
                                        
                                    }}
                                    count={currentPage!.totalPages}
                                    boundaryCount={1}
                                    siblingCount={1}
                                />
                            )}
                        </div>
                        <VerticalSpacer rem={2} />
                        <LesMerOmLøsningen />
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
