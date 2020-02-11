import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import { pathTilOpprettAvtale } from '@/paths';
import RestService from '@/services/rest-service';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvtaleOversikt.less';
import LesMerOmLosningen from '@/AvtaleOversikt/LesMerOmLosningen';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import Avtaler from '@/AvtaleOversikt/Avtaler';
import Filtrering from '@/AvtaleOversikt/Filtrering/Filtrering';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const [søkekriterier, setSøkekriterier] = useState<Partial<Avtale>>({});

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

    const innloggetBruker = useContext(InnloggetBrukerContext);

    const endreSøk = (søkefelt: keyof Avtale, søkeverdi: any) => {
        setSøkekriterier({ ...søkekriterier, [søkefelt]: søkeverdi });
    };

    return (
        <>
            <Banner tekst="Tiltaksoversikt" />

            <main className={cls.className}>
                {innloggetBruker.erNavAnsatt && <LenkeKnapp path={pathTilOpprettAvtale} tekst="Opprett ny avtale" />}

                <div className={cls.element('filter-og-tabell')}>
                    {innloggetBruker.erNavAnsatt && (
                        <aside>
                            <Filtrering endreSøk={endreSøk} />
                        </aside>
                    )}
                    <section>
                        <Avtaler
                            avtalelisteRessurs={avtalelisteRessurs}
                            innloggetBruker={innloggetBruker}
                            varsler={varsler}
                        />
                    </section>
                </div>
                <LesMerOmLosningen />
            </main>
        </>
    );
};

export default AvtaleOversikt;
