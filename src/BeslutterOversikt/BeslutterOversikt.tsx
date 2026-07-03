import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import { hentAvtalerForInnloggetBeslutter } from '@/services/rest-service';
import { AvtalelisteMinimalForBeslutterRessurs, PageableAvtaleMinimalForBeslutter } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { Pagination, Select } from '@navikt/ds-react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import styles from '../AvtaleOversikt/AvtaleOversikt.module.less';
import AvtalerBeslutter from './AvtalerBeslutter';

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { filtre, endreFilter } = useFilterGammel();
    const [currentPage, setCurrentPage] = useState<PageableAvtaleMinimalForBeslutter>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteMinimalForBeslutterRessurs>({
        status: Status.IKKE_LASTET,
    });

    useEffect(() => {
        setNettressurs({ status: Status.LASTER_INN });
        const page = parseInt(filtre.page ? filtre.page : '1', 10);
        hentAvtalerForInnloggetBeslutter(filtre, 10, page - 1).then(
            (pagableAvtale: PageableAvtaleMinimalForBeslutter) => {
                setCurrentPage(pagableAvtale);
                setNettressurs({ status: Status.LASTET, data: pagableAvtale.avtaler });
            },
        );
    }, [filtre]);

    const pageNumber = parseInt(filtre.page || '1', 10);

    return (
        <div className={styles.avtaleoversikt}>
            <Dokumenttittel tittel={'Tilskuddsoversikt'} />
            <div className={styles.avtaleoversiktBannerNavAnsatt}>
                <BannerNAVAnsatt
                    tekst={`Tilskuddsoversikt ${currentPage ? '(' + currentPage.totalItems.toString() + ' avtaler)' : ''}`}
                />
            </div>
            <main className={styles.avtaleoversiktMain}>
                <div
                    className={styles.avtaleoversiktFilterOgTabell}
                    aria-label={'filter og tabell'}
                    role="complementary"
                >
                    <aside className={styles.avtaleoversiktFilter}>
                        <BeslutterFiltrering />
                    </aside>

                    <section className={styles.avtaleoversiktTabell}>
                        <AvtalerBeslutter
                            avtalelisteRessurs={nettressurs}
                            innloggetBruker={innloggetBruker}
                            varsler={[]}
                        />
                        <div className={styles.avtaleoversiktPagination}>
                            {pageNumber && nettressurs.status === Status.LASTET && currentPage!.totalPages > 0 && (
                                <>
                                    <Pagination
                                        page={pageNumber}
                                        onPageChange={(x) => {
                                            endreFilter({ page: '' + x });
                                        }}
                                        count={currentPage!.totalPages}
                                        boundaryCount={1}
                                        siblingCount={1}
                                        className={styles.avtaleoversiktPaginationPagination}
                                    />
                                    <Select
                                        label="Gå til side"
                                        hideLabel
                                        className={styles.avtaleoversiktPaginationPageSelect}
                                        onChange={(x) => endreFilter({ page: x.target.value })}
                                    >
                                        {[...Array(currentPage!.totalPages).keys()]
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
        </div>
    );
};

export default BeslutterOversikt;
