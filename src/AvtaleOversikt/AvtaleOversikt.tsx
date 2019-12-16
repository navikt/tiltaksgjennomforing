import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { pathTilInformasjonssideInnlogget, pathTilOpprettAvtale } from '@/paths';
import RestService from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import { SokeTyper, Søk } from '@/types/SokeTyper';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { lagQueryParams } from '@/utils/queryParamUtils';
import classNames from 'classnames';
import AlertStripe from 'nav-frontend-alertstriper';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import AvtalekortMobil from './AvtalekortMobil';
import './AvtaleOversikt.less';
import AvtaleOversiktSkeleton from './AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import SokEtterAvtaler from './SokEtterAvtaler/SokEtterAvtaler';
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

    const tilbakemeldingHvisIngenAvtale = innloggetBruker.erNavAnsatt ? (
        <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
            <InfoIkon />
            <VerticalSpacer sixteenPx={true} />
            <Undertittel>Finner ingen avtaler</Undertittel>
        </div>
    ) : (
        <div className={cls.element('ingen-avtaler-tekst')}>
            <Undertittel className={cls.element('ingen-avtaler-header')}>Ingen avtaler</Undertittel>
            <p>
                <Element>Hvis du er deltaker:</Element>
                <Normaltekst>
                    Det har ikke blitt opprettet noen avtaler hvor du er med enda. Vennligst vent på veileder i NAV.
                </Normaltekst>
            </p>
            <p>
                <Element>Hvis du er arbeidsgiver:</Element>
                <Normaltekst>
                    Du har ingen avtaler her enda. Det kan være på grunn av følgende årsaker:
                    <ol>
                        <li>
                            Du har ikke riktig tilgang i Altinn. Du må enten ha rollen{' '}
                            <i>Helse-, sosial- og velferdstjenester</i> eller enkelttjenesten{' '}
                            <i>Avtale om arbeidstrening.</i>{' '}
                            <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                Les mer om roller og rettigheter på Altinn.no
                            </EksternLenke>
                        </li>
                        <li>NAV-veileder har ikke opprettet avtalen med bedriftsnummeret ditt enda.</li>
                    </ol>
                    <p>Hvis alternativ 1 og 2 ikke er tilfelle, ta kontakt med veileder i NAV.</p>
                </Normaltekst>
            </p>
        </div>
    );

    return (
        <>
            <Banner tekst="Dine arbeidstreningsavtaler" />

            <div className="avtaleoversikt">
                <div className={cls.element('informasjonsBanner')}>
                    <AlertStripe type="info">
                        <Link to={pathTilInformasjonssideInnlogget} className="lenke">
                            Les om hvordan den nye digitale løsningen for avtale om arbeidstrening fungerer her
                        </Link>
                        <HoyreChevron />
                    </AlertStripe>
                </div>
                {opprettAvtaleKnapp}

                <div className={cls.element('innhold')}>
                    {innloggetBruker.erNavAnsatt && <SokEtterAvtaler sokEtterAvtaler={sokEtterAvtaler} />}
                    <div className={cls.element('avtaleliste2')}>
                        {avtalelisteRessurs.status === Status.Lastet && avtalelisteRessurs.data.length === 0 ? (
                            tilbakemeldingHvisIngenAvtale
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
