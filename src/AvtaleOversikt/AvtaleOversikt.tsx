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
import { BodyShort, Label, Pagination } from '@navikt/ds-react';
import { Accordion } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import Banner from '@/komponenter/Banner/Banner';
import ArbeidsgiverFiltrering from '@/AvtaleOversikt/Filtrering/ArbeidsgiverFiltrering';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import './AvtaleOversikt.less';
import { Status } from '@/types/nettressurs';
import { AvtalelisteRessurs, PageableAvtale } from '@/types/avtale';

const cls = BEMHelper('avtaleoversikt');
const clsPagination = BEMHelper('avtaleoversikt-pagination');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { filtre, endreFilter, parseWindowLocationSearch } = useFilter();
    const [pageNumber, setPageNumber] = useState<number>(parseInt(filtre.page ? filtre.page : '1', 10));
    const [currentPage, setCurrentPage] = useState<PageableAvtale>();
    const [nettressurs, setNettressurs] = useState<AvtalelisteRessurs>({ status: Status.IkkeLastet });

    useEffect(() => {
        setNettressurs({ status: Status.LasterInn });
        endreFilter({ page: pageNumber.toString() });
        hentAvtalerForInnloggetBruker(filtre, 10, pageNumber - 1).then((pagableAvtale: PageableAvtale) => {
            setCurrentPage(pagableAvtale);
            setNettressurs({ status: Status.Lastet, data: pagableAvtale.avtaler });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, filtre.sorteringskolonne, filtre.avtaleNr, filtre.tiltakstype, filtre.bedriftNr, filtre.deltakerFnr, filtre.veilederNavIdent, filtre.navEnhet, filtre.erUfordelt, filtre.status]);

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

    const antalAvtalerTekst = currentPage && (currentPage.totalItems > 1 || currentPage.totalItems == 0) ? ' avtaler' : ' avtale';
    const oversiktTekt = 'Tiltaksoversikt (' + currentPage?.totalItems + antalAvtalerTekst + ')';

    return (
        <>
            <Dokumenttittel tittel={oversiktTekt} />
            <Banner
                byttetOrg={() => {
                    parseWindowLocationSearch();
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
                        <VerticalSpacer rem={1} />
                        {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                            <>
                                <Accordion className="accordion">
                                    <Accordion.Item>
                                        <Accordion.Header>
                                            {' '}
                                            <div>
                                                <Label size="small">Finner du ikke avtalen du leter etter?</Label>
                                                <BodyShort size="small">
                                                    Det kan være flere årsaker til dette. Les hva du kan gjøre.
                                                </BodyShort>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Content>
                                            <Label size="small">
                                                Avtalen du leter etter er opprettet på en annen virksomhet
                                            </Label>
                                            <BodyShort size="small">
                                                Det kan være at avtalen du leter etter er opprettet på en annen
                                                virskomhet. Du kan prøve å bytte virksomhet i virksomhetsvelgeren oppe
                                                til høyre på skjermen.
                                            </BodyShort>
                                            <VerticalSpacer rem={1} />
                                            <Label size="small">
                                                Du mangler tilgang til rett avtaletype for den virksomheten du har
                                                valgt.
                                            </Label>
                                            <BodyShort size="small">Da kan du be om tilgang i Altinn.</BodyShort>
                                        </Accordion.Content>
                                    </Accordion.Item>
                                </Accordion>
                                <VerticalSpacer rem={1} />
                            </>
                        )}
                        <VerticalSpacer rem={2} />
                        <div className={clsPagination.className}>
                            {nettressurs.status === Status.LasterInn && <VerticalSpacer rem={3.9} />}
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
                        <VerticalSpacer rem={2} />
                        <LesMerOmLøsningen />
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
