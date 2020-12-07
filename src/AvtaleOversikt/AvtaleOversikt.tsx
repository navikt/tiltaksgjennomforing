import { ReactComponent as PlussIkon } from '@/assets/ikoner/pluss-tegn.svg';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import VeilederFiltrering from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import BannerVeileder from '@/komponenter/Banner/BannerVeileder';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import { pathTilOpprettAvtale, pathTilOpprettAvtaleArbeidsgiver } from '@/paths';
import { hentAvtalerForInnloggetBruker, hentUlesteVarsler } from '@/services/rest-service';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvtaleOversikt.less';
import ArbeidsgiverFiltrering from './Filtrering/ArbeidsgiverFiltrering';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const arbeidsgiverOppretterToggle = featureToggleContext[Feature.ArbeidsgiverOppretter];

    const sokeKriterer = () => {
        switch (innloggetBruker.rolle) {
            case 'ARBEIDSGIVER':
                return { bedriftNr: new URLSearchParams(window.location.search).get('bedrift')! };
            case 'VEILEDER':
                return { veilederNavIdent: innloggetBruker.identifikator };
            case 'DELTAKER':
            default:
                return {};
        }
    };

    const [søkekriterier, setSøkekriterier] = useState<Partial<Avtale>>(sokeKriterer());

    const [varsler, setVarsler] = useState<Varsel[]>([]);

    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        hentAvtalerForInnloggetBruker(søkekriterier)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error: error }));
    }, [søkekriterier]);

    const layout = useAvtaleOversiktLayout();

    const endreSøk = (endredeSøkekriterier: Partial<Avtale>) => {
        setSøkekriterier({ ...søkekriterier, ...endredeSøkekriterier });
    };

    const harTilgangerSomArbeidsgiver =
        innloggetBruker.rolle === 'ARBEIDSGIVER' &&
        søkekriterier.bedriftNr &&
        innloggetBruker.tilganger[søkekriterier.bedriftNr]?.length > 0;

    return (
        <>
            <Banner
                byttetOrg={org => {
                    if (søkekriterier.bedriftNr !== org.OrganizationNumber) {
                        setSøkekriterier({ bedriftNr: org.OrganizationNumber });
                    }
                }}
                tekst="Tiltaksoversikt"
            />
            <BannerVeileder tekst="Tiltaksoversikt" />

            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                <div
                    style={layout.stylingAvFilterOgTabell}
                    className={cls.element('filter-og-tabell')}
                    aria-labelledby={cls.element('filter-og-tabell')}
                    role="complementary"
                >
                    {innloggetBruker.erNavAnsatt && (
                        <aside style={layout.stylingAvFilter}>
                            {innloggetBruker.erNavAnsatt && (
                                <div style={{ margin: '0.2rem 0 1rem 0' }}>
                                    <LenkeKnapp
                                        path={pathTilOpprettAvtale}
                                        style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                                    >
                                        <PlussIkon style={{ width: '24', height: '24', marginRight: '0.5rem' }} />
                                        Opprett ny avtale
                                    </LenkeKnapp>
                                </div>
                            )}
                            <VeilederFiltrering endreSøk={endreSøk} />
                        </aside>
                    )}
                    {innloggetBruker.rolle === 'ARBEIDSGIVER' &&
                        innloggetBruker.altinnOrganisasjoner.length > 0 &&
                        innloggetBruker.tilganger[søkekriterier.bedriftNr!] && (
                            <aside style={layout.stylingAvFilter}>
                                {arbeidsgiverOppretterToggle && harTilgangerSomArbeidsgiver && (
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
                                <ArbeidsgiverFiltrering endreSøk={endreSøk} />
                            </aside>
                        )}
                    <section style={layout.stylingAvTabell}>
                        <Avtaler
                            avtalelisteRessurs={avtalelisteRessurs}
                            innloggetBruker={innloggetBruker}
                            varsler={varsler}
                            sokekriterier={søkekriterier}
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
                        <Knapp
                            onClick={() => {
                                throw new Error('En feil');
                            }}
                        >
                            Feiltestknapp
                        </Knapp>
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
