import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerVeileder';
import { hentAvtalerForInnloggetBruker, hentUlesteVarsler } from '@/services/rest-service';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvtaleOversikt.less';
import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import Avtaler from '@/AvtaleOversikt/Avtaler';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const arbeidsgiverOppretterToggle = featureToggleContext[Feature.ArbeidsgiverOppretter];

    const sokeKriterer = { beslutterNavIdent: innloggetBruker.identifikator };
    const [søkekriterier, setSøkekriterier] = useState<Partial<Avtale>>(sokeKriterer);

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

    return (
        <>
            <BannerNAVAnsatt tekst="Tilskuddoversikt" />

            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                <div
                    style={layout.stylingAvFilterOgTabell}
                    className={cls.element('filter-og-tabell')}
                    aria-labelledby={cls.element('filter-og-tabell')}
                    role="complementary"
                >
                    <aside style={layout.stylingAvFilter}>
                        <BeslutterFiltrering endreSøk={endreSøk} />
                    </aside>
                    <Avtaler
                        avtalelisteRessurs={avtalelisteRessurs}
                        innloggetBruker={innloggetBruker}
                        varsler={varsler}
                        sokekriterier={søkekriterier}
                    />
                </div>
            </main>
        </>
    );
};

export default AvtaleOversikt;
