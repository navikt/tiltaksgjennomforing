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
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import '../AvtaleOversikt/AvtaleOversikt.less';
import AvtalerBeslutter from './AvtalerBeslutter';
import { AvtalelisteMinimalForBeslutterRessurs, PageableAvtaleMinimalForBeslutter } from '@/types/avtale';
import { Status } from '@/types/nettressurs';

const cls = BEMHelper('avtaleoversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { filtre, endreFilter } = useFilter();
    const [pageNumber, setPageNumber] = useState<number>(parseInt(filtre.page ? filtre.page : '1', 10));
    const [currentPage, setCurrentPage] = useState<PageableAvtaleMinimalForBeslutter>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteMinimalForBeslutterRessurs>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        setNettressurs({ status: Status.LasterInn });
        endreFilter({ page: pageNumber.toString() });
        hentAvtalerForInnloggetBeslutter(filtre, 10, pageNumber - 1).then(
            (pagableAvtale: PageableAvtaleMinimalForBeslutter) => {
                setCurrentPage(pagableAvtale);
                setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
            }
        );
    }, [pageNumber, filtre, endreFilter]);

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
                        <div className={clsPagination.className}>
                            {pageNumber && nettressurs.status === Status.Lastet && currentPage!.totalPages > 0 && (
                                <Pagination
                                    page={pageNumber}
                                    onPageChange={(x) => {
                                        setPageNumber(x);
                                    }}
                                    count={currentPage!.totalPages}
                                    boundaryCount={1}
                                    siblingCount={1}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default BeslutterOversikt;
