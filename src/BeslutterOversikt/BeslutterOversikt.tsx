import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentAvtalerForInnloggetBeslutter } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Pagination } from '@navikt/ds-react';
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import '../AvtaleOversikt/AvtaleOversikt.less';
import AvtalerBeslutter from './AvtalerBeslutter';
import { AvtaleMinimalForBeslutter, AvtalelisteMinimalForBeslutterRessurs, PageableAvtaleMinimalForBeslutter } from '@/types/avtale';
import { Status } from '@/types/nettressurs';

const cls = BEMHelper('avtaleoversikt');

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [pageState, setPageState] = useState(1);
    const [currentPage, setCurrentPage] = useState<PageableAvtaleMinimalForBeslutter>()
    const [nettressurs, setNettressurs] = useState<AvtalelisteMinimalForBeslutterRessurs>({ status: Status.IkkeLastet })
    const { filtre } = useFilter();

    useEffect(() => { 
        console.log("pagestate yo", pageState)
        setNettressurs({ status: Status.LasterInn });
        hentAvtalerForInnloggetBeslutter(filtre, 2, pageState - 1)
        .then((pagableAvtale: PageableAvtaleMinimalForBeslutter) => {
            setCurrentPage(pagableAvtale);
            setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
        })
    }, [pageState, filtre]);

    const layout = useAvtaleOversiktLayout();

    return (
        <>
            <Dokumenttittel tittel={'Tilskuddsoversikt'} />
            <BannerNAVAnsatt tekst={'Tilskuddsoversikt'} />
            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                <div
                    style={layout.stylingAvFilterOgTabell}
                    className={cls.element('filter-og-tabell')}
                    aria-label={'filter og tabell'}
                    role="complementary"
                >
                    <aside style={layout.stylingAvFilter}>
                        <BeslutterFiltrering />
                    </aside>

                    <section style={layout.stylingAvTabell}>
                        <AvtalerBeslutter
                            avtalelisteRessurs={nettressurs}
                            innloggetBruker={innloggetBruker}
                            varsler={[]}
                        />
                        <VerticalSpacer rem={2} />

                        {nettressurs.status === Status.Lastet && (
                            <Pagination
                                page={pageState}
                                onPageChange={(x) => setPageState(x)}
                                count={currentPage!.totalPages}
                                boundaryCount={1}
                                siblingCount={1}
                                />
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default BeslutterOversikt;
