import Avtaler from '@/AvtaleOversikt/Avtaler';
import Filtrering from '@/AvtaleOversikt/Filtrering/Filtrering';
import LesMerOmLøsningen from '@/AvtaleOversikt/LesMerOmLøsningen/LesMerOmLøsningen';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import { pathTilOpprettAvtale } from '@/paths';
import RestService from '@/services/rest-service';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvtaleOversikt.less';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [søkekriterier, setSøkekriterier] = useState<Partial<Avtale>>(
        innloggetBruker.erNavAnsatt ? { veilederNavIdent: innloggetBruker.identifikator } : {}
    );

    const [varsler, setVarsler] = useState<Varsel[]>([]);

    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });

    useEffect(() => {
        RestService.hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        RestService.hentAvtalerForInnloggetBruker(søkekriterier)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error: error.message }));
    }, [søkekriterier]);

    const layout = useAvtaleOversiktLayout();

    const endreSøk = (endredeSøkekriterier: Partial<Avtale>) => {
        setSøkekriterier({ ...søkekriterier, ...endredeSøkekriterier });
    };

    return (
        <>
            <Banner tekst="Tiltaksoversikt" />

            <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
                {innloggetBruker.erNavAnsatt && <LenkeKnapp path={pathTilOpprettAvtale} tekst="Opprett ny avtale" />}

                <div style={layout.stylingAvFilterOgTabell} className={cls.element('filter-og-tabell')}>
                    {innloggetBruker.erNavAnsatt && (
                        <aside style={layout.stylingAvFilter}>
                            <Filtrering endreSøk={endreSøk} />
                        </aside>
                    )}
                    <section style={layout.stylingAvTabell}>
                        <Avtaler
                            avtalelisteRessurs={avtalelisteRessurs}
                            innloggetBruker={innloggetBruker}
                            varsler={varsler}
                        />
                    </section>
                </div>
                <LesMerOmLøsningen />
            </main>
        </>
    );
};

export default AvtaleOversikt;
