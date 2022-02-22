import Avtaler from '@/AvtaleOversikt/Avtaler';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentAvtalerForInnloggetBeslutter } from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import '../AvtaleOversikt/AvtaleOversikt.less';
import BeslutterFiltrering from '@/AvtaleOversikt/Filtrering/BeslutterFiltrering';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const cls = BEMHelper('avtaleoversikt');

const BeslutterOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const { filtre } = useFilter();

    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        hentAvtalerForInnloggetBeslutter(filtre)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error: error }));
    }, [filtre]);

    const layout = useAvtaleOversiktLayout();

    return (
        <>
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
                        <Avtaler
                            avtalelisteRessurs={avtalelisteRessurs}
                            innloggetBruker={innloggetBruker}
                            varsler={[]}
                        />
                        <VerticalSpacer rem={10} />
                    </section>
                </div>
            </main>
        </>
    );
};

export default BeslutterOversikt;
