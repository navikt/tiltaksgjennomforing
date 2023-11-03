import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import { hentAvtalerForInnloggetBeslutter } from '@/services/rest-service';
import { AvtalelisteMinimalForBeslutterRessurs, PageableAvtaleMinimalForBeslutter } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import BEMHelper from '@/utils/bem';
import { Pagination, Select } from '@navikt/ds-react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import '../AvtaleOversikt/AvtaleOversikt.less';
import AvtalerBeslutter from './AvtalerBeslutter';

const cls = BEMHelper('avtaleoversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { filtre, endreFilter } = useFilterGammel();
    const [currentPage, setCurrentPage] = useState<PageableAvtaleMinimalForBeslutter>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteMinimalForBeslutterRessurs>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        setNettressurs({ status: Status.LasterInn });
        const page = parseInt(filtre.page ? filtre.page : '1', 10);
        hentAvtalerForInnloggetBeslutter(filtre, 2, page - 1).then(
            (pagableAvtale: PageableAvtaleMinimalForBeslutter) => {
                setCurrentPage(pagableAvtale);
                setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
            }
        );
    }, [filtre]);

    const pageNumber = parseInt(filtre.page || '1');

    const layout = useAvtaleOversiktLayout();
    return (
        <>
            <Dokumenttittel tittel={'Tilskuddsoversikt'} />
            <BannerNAVAnsatt
                tekst={`Tilskuddsoversikt ${currentPage ? '(' + currentPage.totalItems.toString() + ' avtaler)' : ''}`}
            />
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
                                <>
                                    <div></div>
                                    <Pagination
                                        page={pageNumber}
                                        onPageChange={(x) => {
                                            endreFilter({ page: '' + x });
                                        }}
                                        count={currentPage!.totalPages}
                                        boundaryCount={1}
                                        siblingCount={1}
                                    />
                                    <Select label="" onChange={(x) => endreFilter({ page: x.target.value })}>
                                        {[...Array(currentPage?.totalPages).keys()]
                                            .map((x) => x + 1)
                                            .map((x) => (
                                                <option value={x} key={x} selected={x === pageNumber}>
                                                    {x}
                                                </option>
                                            ))}
                                    </Select>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default BeslutterOversikt;
