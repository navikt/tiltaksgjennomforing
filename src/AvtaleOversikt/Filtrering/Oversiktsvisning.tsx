import Banner from '@/komponenter/Banner/Banner';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import { Path } from '@/Router';
import { litenForbokstav } from '@/utils/stringUtils';
import VeilederFiltrering from './VeilederFiltrering';
import ArbeidsgiverFiltrering from './ArbeidsgiverFiltrering';

const Oversiktsvisning = () => {
    return (
        <>
            <Dokumenttittel tittel={oversiktTekst} />
            <Banner
                byttetOrg={(org) => {
                    endreFilter({ bedriftNr: org });
                }}
                tekst={oversiktTekst}
                undertittel={`Logget inn som ${litenForbokstav(innloggetBruker.rolle)}`}
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
                                <LenkeKnapp path={Path.OPPRETT_AVTALE} icon={<PlussIkon />}>
                                    Opprett ny avtale
                                </LenkeKnapp>
                            </div>
                            <VeilederFiltrering />
                        </aside>
                    )}
                    {innloggetBruker.rolle === 'ARBEIDSGIVER' &&
                        innloggetBruker.altinnOrganisasjoner.length > 0 &&
                        innloggetBruker.tilganger[filtre.bedriftNr!] && (
                            <aside style={layout.stylingAvFilter}>
                                {harTilgangerSomArbeidsgiver && (
                                    <div style={{ margin: '0.2rem 0 1rem 0' }}>
                                        <LenkeKnapp path={Path.OPPRETT_AVTALE_ARBEIDSGIVER} icon={<PlussIkon />}>
                                            Opprett ny avtale
                                        </LenkeKnapp>
                                    </div>
                                )}
                                <ArbeidsgiverFiltrering />
                            </aside>
                        )}
                    <section style={layout.stylingAvTabell}>
                        <Avtaler
                            avtalelisteRessurs={nettressursCtx}
                            innloggetBruker={innloggetBruker}
                            varsler={varsler}
                        />
                        <AvtaleOversiktArbeidsgiverInformasjon rolle={innloggetBruker.rolle} cls={cls} />
                        <div className={clsPagination.className}>
                            {nettressursCtx.status === Status.LASTER_INN && <VerticalSpacer rem={3.9} />}
                            {pageNumber &&
                                nettressursCtx.status === Status.LASTET &&
                                nettressursCtx.data.totalPages > 0 && (
                                    <>
                                        <Pagination
                                            page={pageNumber}
                                            onPageChange={(x) => {
                                                endreFilter({ page: '' + x });
                                            }}
                                            count={nettressursCtx.data.totalPages}
                                            boundaryCount={1}
                                            siblingCount={1}
                                            className={clsPagination.element('pagination')}
                                        />
                                        <Select
                                            label=""
                                            className={clsPagination.element('page-select')}
                                            onChange={(x) => endreFilter({ page: x.target.value })}
                                            value={pageNumber}
                                        >
                                            {[...Array(nettressursCtx.data.totalPages).keys()]
                                                .map((x) => x + 1)
                                                .map((x) => (
                                                    <option value={x} key={x}>
                                                        {x}
                                                    </option>
                                                ))}
                                        </Select>
                                    </>
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
