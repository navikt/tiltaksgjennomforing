import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import { pathTilOpprettAvtale } from '@/paths';
import RestService from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import AvtalekortMobil from './AvtalekortMobil';
import './AvtaleOversikt.less';
import AvtaleOversiktSkeleton from './AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import IngenAvtaler from './IngenAvtaler/IngenAvtaler';
import Filtrering, { Søkekriterier } from '@/AvtaleOversikt/Filtrering';
import LesMerOmLosningen from '@/AvtaleOversikt/LesMerOmLosningen';
import LenkeKnapp from '@/komponenter/LenkeKnapp';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent = () => {
    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });
    const [søkekriterier, setSøkekriterier] = useState<Søkekriterier>({});

    const innloggetBruker = useContext(InnloggetBrukerContext);
    const feilVarsel = useContext(FeilVarselContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const defaultSøkeType = innloggetBruker.erNavAnsatt ? { veilederNavIdent: innloggetBruker.identifikator } : {};

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

    let avtalerInnhold;
    if (avtalelisteRessurs.status === Status.LasterInn) {
        avtalerInnhold = <AvtaleOversiktSkeleton erNavAnsatt={innloggetBruker.erNavAnsatt} />;
    } else if (avtalelisteRessurs.status === Status.Lastet && avtalelisteRessurs.data.length === 0) {
        avtalerInnhold = <IngenAvtaler />;
    } else if (avtalelisteRessurs.status === Status.Lastet) {
        avtalerInnhold = (
            <>
                <MediaQuery minWidth={700}>
                    <AvtaleTabell
                        avtaler={avtalelisteRessurs.data}
                        varsler={varsler}
                        innloggetBruker={innloggetBruker}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={699}>
                    <AvtalekortMobil avtaler={avtalelisteRessurs.data} varsler={varsler} />
                </MediaQuery>
            </>
        );
    } else if (avtalelisteRessurs.status === Status.Feil) {
        feilVarsel(avtalelisteRessurs.error);
    }

    return (
        <>
            <Banner tekst="Tiltaksoversikt" />

            <main className={cls.className}>
                {innloggetBruker.erNavAnsatt && <LenkeKnapp path={pathTilOpprettAvtale} tekst="Opprett ny avtale" />}

                <div className={cls.element('filter-og-tabell')}>
                    {innloggetBruker.erNavAnsatt && (
                        <aside className={cls.element('filter')}>
                            <Filtrering
                                endreSøkeverdi={(søkefelt, søkeverdi) => {
                                    setSøkekriterier({ ...søkekriterier, [søkefelt]: søkeverdi });
                                }}
                            />
                        </aside>
                    )}
                    <section className={cls.element('avtaletabell')}>{avtalerInnhold}</section>
                </div>
                <LesMerOmLosningen />
            </main>
        </>
    );
};

export default AvtaleOversikt;
