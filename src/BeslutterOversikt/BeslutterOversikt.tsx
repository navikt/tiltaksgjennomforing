import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentAvtalerForInnloggetBeslutter } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { useLaster } from '@/utils/useLaster';
import { Alert } from '@navikt/ds-react';
import { Knapp } from 'nav-frontend-knapper';
import { FunctionComponent, useCallback, useContext } from 'react';
import '../AvtaleOversikt/AvtaleOversikt.less';
import AvtalerBeslutter from './AvtalerBeslutter';

const cls = BEMHelper('avtaleoversikt');

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const { filtre } = useFilter();
    const { kanLasteMer, lasterMer, lastMer, nettressurs} = useLaster(
        useCallback((skip, limit) => hentAvtalerForInnloggetBeslutter(filtre, skip, limit), [filtre]),
        50
    );
    const layout = useAvtaleOversiktLayout();

    return (
        <>
            <Alert variant="warning">
                Denne oversikten kan oppleves tregere enn vanlig. Vi jobber med å utbedre dette.
            </Alert>
            <Dokumenttittel tittel={'Tilskuddsoversikt'} />
            <BannerNAVAnsatt tekst={'Tilskuddsoversikt'} />
            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                <div
                    style={layout.stylingAvFilterOgTabell}
                    className={cls.element('filter-og-tabell')}
                    aria-label={'filter og tabell'}
                    role="complementary"
                >
                    <aside style={layout.stylingAvFilter}>
                        <BeslutterFiltrering />
                    </aside>

                    <section style={layout.stylingAvTabell}>
                        <AvtalerBeslutter
                            avtalelisteRessurs={nettressurs}
                            innloggetBruker={innloggetBruker}
                            varsler={[]}
                        />
                        {kanLasteMer && (
                            <>
                                <VerticalSpacer rem={3} />
                                <div style={{ textAlign: 'center' }}>
                                    <Knapp
                                        title="Last inn mer"
                                        onClick={lastMer}
                                        spinner={lasterMer}
                                        disabled={lasterMer}
                                    >
                                        Last inn flere tilskudd ...
                                    </Knapp>
                                </div>
                                <VerticalSpacer rem={3} />
                            </>
                        )}
                        {!kanLasteMer && (
                            <>
                                <VerticalSpacer rem={2} />
                                <div style={{ textAlign: 'center' }}>
                                    Alle avtaler er lastet
                                </div>
                            </>
                        )}
                        <VerticalSpacer rem={10} />
                    </section>
                </div>
            </main>
        </>
    );
};

export default BeslutterOversikt;
