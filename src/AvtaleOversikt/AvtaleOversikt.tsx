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
import { BodyShort, Button, Label } from '@navikt/ds-react';
import { Accordion } from '@navikt/ds-react';
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import Banner from '@/komponenter/Banner/Banner';
import ArbeidsgiverFiltrering from '@/AvtaleOversikt/Filtrering/ArbeidsgiverFiltrering';
import { useLaster } from '@/utils/useLaster';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import './AvtaleOversikt.less';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { filtre, parseWindowLocationSearch } = useFilter();

    const { kanLasteMer, lasterMer, lastMer, nettressurs } = useLaster(
        useCallback((skip: number, limit: number) => hentAvtalerForInnloggetBruker(filtre, skip, limit), [filtre]),
        10
    );

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

    const oversiktTekt = 'Tiltaksoversikt';
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
                        <LesMerOmLøsningen />
                        {kanLasteMer && (
                            <>
                                <VerticalSpacer rem={3} />
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="secondary"
                                        title="Last inn mer"
                                        onClick={lastMer}
                                        loading={lasterMer}
                                        disabled={lasterMer}
                                    >
                                        Last inn flere avtaler ...
                                    </Button>
                                </div>
                                <VerticalSpacer rem={3} />
                            </>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
