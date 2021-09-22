import { ReactComponent as PlussIkon } from '@/assets/ikoner/pluss-tegn.svg';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import VeilederFiltrering from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import { pathTilOpprettAvtale, pathTilOpprettAvtaleArbeidsgiver } from '@/paths';
import { hentAvtalerForInnloggetBruker, hentUlesteVarsler } from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvtaleOversikt.less';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import Banner from '@/komponenter/Banner/Banner';
import ArbeidsgiverFiltrering from "@/AvtaleOversikt/Filtrering/ArbeidsgiverFiltrering";

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);

    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });

    const { filtre, endreFilter } = useFilter();

    useEffect(() => {
        hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        hentAvtalerForInnloggetBruker(filtre)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error: error }));
    }, [filtre]);

    const layout = useAvtaleOversiktLayout();

    const harTilgangerSomArbeidsgiver =
        innloggetBruker.rolle === 'ARBEIDSGIVER' &&
        filtre.bedriftNr &&
        innloggetBruker.tilganger[filtre.bedriftNr]?.length > 0;

    const oversiktTekt = 'Tiltaksoversikt';
    return (
        <>
            <Dokumenttittel tittel={oversiktTekt} />
            <Banner
                byttetOrg={(org) => {
                    if (filtre.bedriftNr !== org.OrganizationNumber) {
                        endreFilter({ bedriftNr: org.OrganizationNumber });
                    }
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
                                <LenkeKnapp
                                    path={pathTilOpprettAvtale}
                                    style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                                >
                                    <PlussIkon style={{ width: '24', height: '24', marginRight: '0.5rem' }} />
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
                                        <LenkeKnapp
                                            path={pathTilOpprettAvtaleArbeidsgiver}
                                            style={{
                                                paddingLeft: '1.5rem',
                                                paddingRight: '1.5rem',
                                            }}
                                        >
                                            <PlussIkon style={{ width: '24', height: '24', marginRight: '0.5rem' }} />
                                            Opprett ny avtale
                                        </LenkeKnapp>
                                    </div>
                                )}
                                <ArbeidsgiverFiltrering />
                            </aside>
                        )}
                    <section style={layout.stylingAvTabell}>
                        <Avtaler
                            avtalelisteRessurs={avtalelisteRessurs}
                            innloggetBruker={innloggetBruker}
                            varsler={varsler}
                        />
                        <VerticalSpacer rem={1} />
                        {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                            <>
                                <Ekspanderbartpanel
                                    tittel={
                                        <div>
                                            <Element>Finner du ikke avtalen du leter etter?</Element>
                                            <Normaltekst>
                                                Det kan være flere årsaker til dette. Les hva du kan gjøre.
                                            </Normaltekst>
                                        </div>
                                    }
                                >
                                    <Element>Avtalen du leter etter er opprettet på en annen virksomhet</Element>
                                    <Normaltekst>
                                        Det kan være at avtalen du leter etter er opprettet på en annen virskomhet. Du
                                        kan prøve å bytte virksomhet i virksomhetsvelgeren oppe til høyre på skjermen.
                                    </Normaltekst>
                                    <VerticalSpacer rem={1} />
                                    <Element>
                                        Du mangler tilgang til rett avtaletype for den virksomheten du har valgt.
                                    </Element>
                                    <Normaltekst>Da kan du be om tilgang i Altinn.</Normaltekst>
                                </Ekspanderbartpanel>
                                <VerticalSpacer rem={1} />
                            </>
                        )}
                        <LesMerOmLøsningen />
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
