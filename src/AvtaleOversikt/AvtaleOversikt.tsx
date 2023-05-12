import { ReactComponent as PlussIkon } from '@/assets/ikoner/pluss-tegn.svg';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import VeilederFiltrering from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilOpprettAvtale, pathTilOpprettAvtaleArbeidsgiver } from '@/paths';
import { hentAvtalerForInnloggetBruker, hentUlesteVarsler } from '@/services/rest-service';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Pagination } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import Banner from '@/komponenter/Banner/Banner';
import ArbeidsgiverFiltrering from '@/AvtaleOversikt/Filtrering/ArbeidsgiverFiltrering';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import './AvtaleOversikt.less';
import { Status } from '@/types/nettressurs';
import { AvtalelisteRessurs, PageableAvtale } from '@/types/avtale';
import AvtaleOversiktArbeidsgiverInformasjon from '@/AvtaleOversikt/AvtaleOversiktArbeidsgiverInformasjon';

const cls = BEMHelper('avtaleoversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { filtre, endreFilter } = useFilter();
    const [currentPage, setCurrentPage] = useState<PageableAvtale>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteRessurs>({ status: Status.IkkeLastet });

    useEffect(() => {
        setNettressurs({ status: Status.LasterInn });
        const page = parseInt(filtre.page ? filtre.page : '1', 10)
        hentAvtalerForInnloggetBruker(filtre, 10, page - 1).then((pagableAvtale: PageableAvtale) => {
            setCurrentPage(pagableAvtale);
            setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
        });
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

    const antalAvtalerTekst =
        currentPage && (currentPage.totalItems > 1 || currentPage.totalItems === 0) ? ' avtaler' : ' avtale';
    const oversiktTekt = 'Tiltaksoversikt (' + currentPage?.totalItems + antalAvtalerTekst + ')';

    const pageNumber = parseInt(filtre.page || '1');

    return (
        <>
            <Dokumenttittel tittel={oversiktTekt} />
            <Banner
                byttetOrg={() => {
                    //parseWindowLocationSearch();
                }}
                tekst={oversiktTekt}
            />

            <BannerNAVAnsatt tekst={oversiktTekt} />
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
