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
import { Avtale, PageableAvtale } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { fjernTommeFelterFraObjekt, litenForbokstav } from '@/utils/stringUtils';
import { Pagination, Select } from '@navikt/ds-react';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [, , nettressursCtx, setNettressursCtx] = useContext(FiltreringContext);

    useEffect(() => {
        if (nettressursCtx.status !== Status.Lastet) return;

        const filtreUtenPage = _.omit(filtre, 'page', 'sorteringskolonne', 'sorteringOrder');
        const erFiltreLikeNettressursFiltre = _.isEqual(
            fjernTommeFelterFraObjekt(nettressursCtx.data.sokeParametere),
            fjernTommeFelterFraObjekt(filtreUtenPage)
        );

        const filterPage = parseInt(filtre.page ? filtre.page : '1', 10);
        const sammePageIDataOgFilter = nettressursCtx.data.currentPage === filterPage - 1;
        const sammeSorteringIUrlOgFilter = searchParams.get('sorteringskolonne') === filtre.sorteringskolonne;
        const sammeSokId = searchParams.get('sokId') === nettressursCtx.data.sokId;
        const sammePageIUrlOgFilter = searchParams.get('page') === '' + filterPage;
        const sammeSorteringIDataOgFilter = nettressursCtx.data.sorteringskolonne === filtre.sorteringskolonne;

        // console.log('\nsorteringIData:', nettressursCtx.data.sorteringskolonne, '\nsorteringFilter:', filtre.sorteringskolonne, '\nsorteringUrl:', searchParams.get('sorteringskolonne'), '\nsammeSorteringIUrlOgFilter:', sammeSorteringIUrlOgFilter,
        // "\nsammeSokId", sammeSokId);
        //  console.log('innloggetBruker.rolle:', innloggetBruker.rolle);

        // Hvis alt er likt i url, filter og data fra backend - ikke gjør noe.
        if (
            sammePageIDataOgFilter &&
            erFiltreLikeNettressursFiltre &&
            sammeSorteringIDataOgFilter &&
            sammeSokId &&
            sammePageIUrlOgFilter &&
            sammeSorteringIUrlOgFilter
        ) {
            return;
        }

        setNettressursCtx({ status: Status.LasterInn });
        if (!erFiltreLikeNettressursFiltre) {
            // Filteret er endret - Nytt POST-søk
            hentAvtalerForInnloggetBrukerMedPost(filtre, 10, filterPage - 1).then((pagableAvtale: PageableAvtale) => {
                if (innloggetBruker.rolle === 'ARBEIDSGIVER') {
                    // Håndtering valg i bedriftsmyen som arbeidsgiver
                    setSearchParams(
                        fjernTommeFelterFraObjekt({
                            sokId: pagableAvtale.sokId,
                            page: '' + (pagableAvtale.currentPage + 1),
                            sorteringskolonne: filtre.sorteringskolonne,
                            bedrift: pagableAvtale.sokeParametere.bedriftNr,
                            sorteringOrder: filtre.sorteringOrder,
                        })
                    );
                } else {
                    setSearchParams(
                        fjernTommeFelterFraObjekt({
                            sokId: pagableAvtale.sokId,
                            page: '' + (pagableAvtale.currentPage + 1),
                            sorteringskolonne: filtre.sorteringskolonne,
                            sorteringOrder: filtre.sorteringOrder,
                        })
                    );
                }
                setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
            });
        } else if (!sammePageIDataOgFilter || !sammeSorteringIDataOgFilter) {
            // page/sortering er endret - Nytt GET-søk
            hentAvtalerForInnloggetBrukerMedSokId(
                searchParams.get('sokId')!,
                10,
                filterPage - 1,
                filtre.sorteringskolonne || undefined,
                filtre.sorteringOrder
            ).then((pagableAvtale: PageableAvtale) => {
                if (innloggetBruker.rolle === 'ARBEIDSGIVER') {
                    setSearchParams(
                        fjernTommeFelterFraObjekt({
                            sokId: pagableAvtale.sokId,
                            page: '' + (pagableAvtale.currentPage + 1),
                            sorteringskolonne: pagableAvtale.sorteringskolonne,
                            bedrift: pagableAvtale.sokeParametere.bedriftNr,
                            sorteringOrder: filtre.sorteringOrder,
                        })
                    );
                } else {
                    setSearchParams(
                        fjernTommeFelterFraObjekt({
                            sokId: pagableAvtale.sokId,
                            page: '' + (pagableAvtale.currentPage + 1),
                            sorteringskolonne: pagableAvtale.sorteringskolonne,
                            sorteringOrder: filtre.sorteringOrder,
                        })
                    );
                }
                setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
            });
        } else if (!sammeSokId || !sammePageIUrlOgFilter || !sammeSorteringIUrlOgFilter) {
            // sokId/page/sortering endret i en navigering - Nytt GET-søk
            // vi må da gjøre GET med sokId/page/sortering fra url, ikke fra filteret
            // Vi setter heller ingenting i searchParams her, da det er her endringen skjer via en frem/tilbake navigering, vi må derimot sette filter, da endringen ikke kommer herfra, men fra url'en.
            const sokIdFraUrl = searchParams.get('sokId')!;
            const pageFraUrl = parseInt(searchParams.get('page') || '1');
            const sorteringFraUrl = (searchParams.get('sorteringskolonne') as keyof Avtale) || '';
            const sorteringOrderFraUrl = searchParams.get('sorteringOrder') || 'ASC';
            hentAvtalerForInnloggetBrukerMedSokId(
                sokIdFraUrl,
                3,
                pageFraUrl - 1,
                sorteringFraUrl || undefined,
                sorteringOrderFraUrl
            ).then((pagableAvtale: PageableAvtale) => {
                // const eksisterendeSearchParams = lagObjektAvSearchParams(searchParams);
                // if (eksisterendeSearchParams.bedrift) setSearchParams({...eksisterendeSearchParams, bedrift: pagableAvtale.sokeParametere.bedriftNr});

                setNettressursCtx({ status: Status.Lastet, data: pagableAvtale });
                endreFilter({
                    page: '' + (pagableAvtale.currentPage + 1),
                    sorteringskolonne: pagableAvtale.sorteringskolonne,
                    ...pagableAvtale.sokeParametere,
                });
            });
        }
    }, [filtre, nettressursCtx, setNettressursCtx, searchParams, setSearchParams, endreFilter, innloggetBruker.rolle]);

    useEffect(() => {
        hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    const layout = useAvtaleOversiktLayout();

    const harTilgangerSomArbeidsgiver =
        innloggetBruker.rolle === 'ARBEIDSGIVER' &&
        filtre.bedriftNr &&
        innloggetBruker.tilganger[filtre.bedriftNr]?.length > 0;

    const antallAvtalerSuffiks =
        nettressursCtx.status === Status.Lastet &&
        (nettressursCtx.data.totalItems > 1 || nettressursCtx.data.totalItems === 0)
            ? ' avtaler'
            : ' avtale';
    const antallAvtalerTekst =
        nettressursCtx.status === Status.Lastet && nettressursCtx.data.totalItems
            ? `(${nettressursCtx.data.totalItems} ${antallAvtalerSuffiks})`
            : '';
    const oversiktTekst = `Tiltaksoversikt ${antallAvtalerTekst}`;

    const pageNumber = parseInt(filtre.page || '1');

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
                                <LenkeKnapp path={pathTilOpprettAvtale} icon={<PlussIkon />}>
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
                                        <LenkeKnapp path={pathTilOpprettAvtaleArbeidsgiver} icon={<PlussIkon />}>
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
                            {nettressursCtx.status === Status.LasterInn && <VerticalSpacer rem={3.9} />}
                            {pageNumber &&
                                nettressursCtx.status === Status.Lastet &&
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
                                        >
                                            {[...Array(nettressursCtx.data.totalPages).keys()]
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
                        <VerticalSpacer rem={2} />
                        <LesMerOmLøsningen />
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
