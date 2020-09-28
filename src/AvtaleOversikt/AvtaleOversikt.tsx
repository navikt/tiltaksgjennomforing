import Avtaler from '@/AvtaleOversikt/Avtaler';
import VeilederFiltrering from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import { pathTilOpprettAvtale, pathTilOpprettAvtaleArbeidsgiver } from '@/paths';
import { hentAvtalerForInnloggetBruker, hentUlesteVarsler } from '@/services/rest-service';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
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
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error: error.message }));
    }, [søkekriterier]);

    const layout = useAvtaleOversiktLayout();

    const endreSøk = (endredeSøkekriterier: Partial<Avtale>) => {
        setSøkekriterier({ ...søkekriterier, ...endredeSøkekriterier });
    };

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

            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                {innloggetBruker.erNavAnsatt && <LenkeKnapp path={pathTilOpprettAvtale} tekst="Opprett ny avtale" />}
                {arbeidsgiverOppretterToggle &&
                    innloggetBruker.rolle === 'ARBEIDSGIVER' &&
                    innloggetBruker.altinnOrganisasjoner.length > 0 && (
                        <LenkeKnapp path={pathTilOpprettAvtaleArbeidsgiver} tekst="Opprett ny avtale" />
                    )}

                <div style={layout.stylingAvFilterOgTabell} className={cls.element('filter-og-tabell')}>
                    {innloggetBruker.erNavAnsatt && (
                        <aside style={layout.stylingAvFilter}>
                            <VeilederFiltrering endreSøk={endreSøk} />
                        </aside>
                    )}
                    {innloggetBruker.rolle === 'ARBEIDSGIVER' &&
                        innloggetBruker.altinnOrganisasjoner.length > 0 &&
                        innloggetBruker.tilganger[søkekriterier.bedriftNr!] && (
                            <aside style={layout.stylingAvFilter}>
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
                    </section>
                </div>
                <LesMerOmLøsningen />
            </main>
        </>
    );
};

export default AvtaleOversikt;
