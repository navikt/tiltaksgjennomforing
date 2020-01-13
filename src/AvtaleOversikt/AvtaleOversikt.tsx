import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { ReactComponent as Info } from '@/assets/ikoner/info.svg';
import Banner from '@/komponenter/Banner/Banner';
import { pathTilInformasjonssideInnlogget, pathTilOpprettAvtale } from '@/paths';
import RestService from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { SokeTyper } from '@/types/soke-typer';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { lagQueryParams } from '@/utils/queryParamUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import AvtalekortMobil from './AvtalekortMobil';
import './AvtaleOversikt.less';
import AvtaleOversiktSkeleton from './AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import IngenAvtaler from './IngenAvtaler/IngenAvtaler';
import SokEtterAvtaler, { Søk } from './SokEtterAvtaler/SokEtterAvtaler';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent<RouteComponentProps> = props => {
    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });

    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const defaultSøkeType = innloggetBruker.erNavAnsatt ? { veilederNavIdent: innloggetBruker.identifikator } : {};
    const [queryParams, setQueryParams] = useState<SokeTyper>(defaultSøkeType);

    useEffect(() => {
        RestService.hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        RestService.hentAvtalerForInnloggetBruker(queryParams)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error }));
    }, [queryParams]);

    const sokEtterAvtaler = (sok: Søk) => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        setQueryParams(lagQueryParams(innloggetBruker, sok));
    };

    const opprettAvtaleKnapp = innloggetBruker.erNavAnsatt && (
        <div className={cls.element('opprett-avtale')}>
            <Hovedknapp onClick={() => props.history.push(pathTilOpprettAvtale)}>Opprett ny avtale</Hovedknapp>
        </div>
    );

    return (
        <>
            <Banner tekst="Dine arbeidstreningsavtaler" />

            <div className="avtaleoversikt">
                <div className={cls.element('informasjonsBanner')}>
                    <LenkepanelBase>
                        <Info width="24" height="24" />
                        <Link to={pathTilInformasjonssideInnlogget} className={cls.element('lenke')}>
                            Om tiltaksgjennomføring
                        </Link>
                    </LenkepanelBase>
                </div>
                {opprettAvtaleKnapp}

                <div className={cls.element('innhold')}>
                    {innloggetBruker.erNavAnsatt && <SokEtterAvtaler sokEtterAvtaler={sokEtterAvtaler} />}
                    <div className={cls.element('avtalelistecontainer')}>
                        {avtalelisteRessurs.status === Status.Lastet && avtalelisteRessurs.data.length === 0 ? (
                            <div>
                                <IngenAvtaler />
                            </div>
                        ) : (
                            <div className={cls.element('avtaleliste')}>
                                {avtalelisteRessurs.status === Status.LasterInn && (
                                    <AvtaleOversiktSkeleton erNavAnsatt={innloggetBruker.erNavAnsatt} />
                                )}
                                {avtalelisteRessurs.status === Status.Lastet && (
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
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(AvtaleOversikt);
