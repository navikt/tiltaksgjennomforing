import { ReactComponent as Natur } from '@/assets/ikoner/natur.svg';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { pathTilInformasjonssideInnlogget, pathTilOpprettAvtale } from '@/paths';
import RestService, { SokeTyper } from '@/services/rest-service';
import { AvtalelisteRessurs } from '@/types/avtale';
import { Status } from '@/types/nettressurs';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import AlertStripe from 'nav-frontend-alertstriper';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import AvtalekortMobil from './AvtalekortMobil';
import './AvtaleOversikt.less';
import SokEtterAvtaler from './SokEtterAvtaler/SokEtterAvtaler';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent<RouteComponentProps> = props => {
    const [avtalelisteRessurs, setAvtalelisteRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });
    const [visAlleAvtaler, setVisAlleAvtaler] = useState<boolean>(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const featureToggles = useContext(FeatureToggleContext);

    const veilederNavIdent = innloggetBruker.erNavAnsatt ? innloggetBruker.identifikator : undefined;

    useEffect(() => {
        RestService.hentUlesteVarsler()
            .then(setVarsler)
            .catch(() => setVarsler([]));
    }, []);

    useEffect(() => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        //RestService.hentAvtalerForInnloggetBruker(visAlleAvtaler ? undefined : veilederNavIdent)
        RestService.hentAvtalerForInnloggetBruker({})
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error }));
    }, [veilederNavIdent, visAlleAvtaler]);

    const sokEtterAvtaler = (sok: SokeTyper) => {
        setAvtalelisteRessurs({ status: Status.LasterInn });
        RestService.hentAvtalerForInnloggetBruker(sok === {} ? { veilederNavIdent: veilederNavIdent } : sok)
            .then((data: any) => setAvtalelisteRessurs({ status: Status.Lastet, data }))
            .catch((error: any) => setAvtalelisteRessurs({ status: Status.Feil, error }));
    };

    const opprettAvtaleKnapp = innloggetBruker.erNavAnsatt && (
        <div className={cls.element('opprett-avtale')}>
            <Hovedknapp onClick={() => props.history.push(pathTilOpprettAvtale)}>Opprett ny avtale</Hovedknapp>
        </div>
    );

    const visAlleAvtalerCheckbox = featureToggles[Feature.Kontortilgang] && innloggetBruker.erNavAnsatt && (
        <Checkbox
            label={'Vis alle avtaler du har tilgang til'}
            checked={visAlleAvtaler}
            onChange={event => setVisAlleAvtaler(event.currentTarget.checked)}
        />
    );

    const tilbakemeldingHvisIngenAvtale = innloggetBruker.erNavAnsatt ? (
        <div className={cls.element('ingen-avtaler-tekst-NAV')}>
            <Normaltekst>Du har ikke {visAlleAvtaler ? 'tilgang til' : 'opprettet'} noen avtaler</Normaltekst>
        </div>
    ) : (
        <div className={cls.element('ingen-avtaler-tekst')}>
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
                {visAlleAvtalerCheckbox}
                <div className={cls.element('innhold')}>
                    <SokEtterAvtaler sokEtterAvtaler={sokEtterAvtaler} />
                    {avtalelisteRessurs.status === Status.Lastet && avtalelisteRessurs.data.length === 0 ? (
                        <div className={cls.element('natur-logo')}>
                            <Natur />
                            <Undertittel className={cls.element('ingen-avtaler-header')}>Ingen avtaler</Undertittel>
                            <Normaltekst>{tilbakemeldingHvisIngenAvtale}</Normaltekst>
                        </div>
                    ) : (
                        <div className="avtaleoversikt__avtaleliste typo-normal">
                            {avtalelisteRessurs.status === Status.LasterInn && (
                                <div className={cls.element('spinner')}>
                                    <NavFrontendSpinner type={'XXL'} />
                                </div>
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
        </>
    );
};

export default withRouter(AvtaleOversikt);
