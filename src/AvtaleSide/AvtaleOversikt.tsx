import classNames from 'classnames';
import moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Normaltekst, Undertittel, Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { InnloggetBruker } from '../InnloggingBoundary/useInnlogget';
import Banner from '../komponenter/Banner/Banner';
import StatusIkon from '../komponenter/StatusIkon/StatusIkon';
import {
    pathTilInformasjonssideInnlogget,
    pathTilKontaktinformasjonSteg,
    pathTilOpprettAvtale,
} from '../paths';
import RestService from '../services/rest-service';
import BEMHelper from '../utils/bem';
import { Avtale } from './avtale';
import './AvtaleOversikt.less';
import Natur from './natur';
import { ReactComponent as TilEkstern } from './../assets/ikoner/external-link.svg';
import { HoyreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';

const cls = BEMHelper('avtaleoversikt');

const AvtaleOversikt: FunctionComponent<RouteComponentProps> = props => {
    const [avtaler, setAvtaler] = useState<Avtale[] | null>(null);
    const [
        innloggetBruker,
        setInnloggetBruker,
    ] = useState<InnloggetBruker | null>(null);
    useEffect(() => {
        RestService.hentAvtalerForInnloggetBruker().then(setAvtaler);
        RestService.hentInnloggetBruker().then(setInnloggetBruker);
    }, []);

    if (avtaler === null) {
        return null;
    }

    const avtaleLenker = avtaler.map((avtale: Avtale) => (
        <LenkepanelBase
            key={avtale.id}
            href={pathTilKontaktinformasjonSteg(avtale.id)}
            linkCreator={(props: any) => <Link to={props.href} {...props} />}
        >
            <div className={cls.element('rad')}>
                <div className={cls.element('deltakerOgBedrift')}>
                    {avtale.bedriftNavn}
                </div>
                <div className={cls.element('deltakerOgBedrift')}>
                    {avtale.deltakerFornavn || ''}&nbsp;
                    {avtale.deltakerEtternavn || ''}
                </div>
                <MediaQuery minWidth={576}>
                    <div className={cls.element('opprettet')}>
                        {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                    </div>
                </MediaQuery>
                <div className={cls.element('statusikon')}>
                    <StatusIkon status={avtale.status} />
                </div>
                <div className={cls.element('status')}>{avtale.status}</div>
            </div>
        </LenkepanelBase>
    ));

    const erVeileder =
        innloggetBruker && innloggetBruker.identifikator.length < 11;

    const opprettAvtaleKnapp = erVeileder && (
        <Hovedknapp onClick={() => props.history.push(pathTilOpprettAvtale)}>
            Opprett ny avtale
        </Hovedknapp>
    );

    const avtaletabell = avtaleLenker.length > 0 && (
        <div className="avtaleoversikt__lenker typo-normal">
            <div className={cls.element('topp', 'knapp_med_avtaler')}>
                {opprettAvtaleKnapp}
            </div>
            <div
                className={classNames(
                    cls.element('header'),
                    cls.element('rad')
                )}
            >
                <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                <MediaQuery minWidth={576}>
                    <div className={cls.element('opprettet')}>Opprettet</div>
                </MediaQuery>
                <div className={cls.element('status')}>Status</div>
                <div className={cls.element('statusikon')}>&nbsp;</div>
            </div>
            {avtaleLenker}
        </div>
    );

    const tilbakemeldingHvisIngenAvtale = erVeileder ? (
        <div className={cls.element('ingen-avtaler-tekst-NAV')}>
            <Normaltekst>Du har ikke opprettet noen avtaler enda</Normaltekst>
        </div> //NAV
    ) : (
        <div className={cls.element('ingen-avtaler-tekst')}>
            <p>
                <Element>Hvis du er deltaker:</Element>
                <Normaltekst>
                    Det har ikke blitt opprettet noen avtaler hvor du er med
                    enda. Vennligst vent på veileder i NAV.
                </Normaltekst>
            </p>
            <p className={cls.element('arbeidsgiver-tekst')}>
                <Element>Hvis du er arbeidsgiver:</Element>
                <Normaltekst>
                    Du har ingen avtaler her enda. Det kan være på grunn av
                    følgende årsaker:
                    <ol>
                        <li>
                            Du har ikke riktig tilgang i Altinn.{' '}
                            <Lenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                Les mer om roller og rettigheter på Altinn.no
                                <TilEkstern
                                    className={cls.element('eksterntLenkeikon')}
                                />
                            </Lenke>
                        </li>
                        <li>
                            NAV-veileder har ikke opprettet avtalen med
                            bedriftsnummeret ditt enda
                        </li>
                    </ol>
                    <p>
                        Hvis alternativ 1 og 2 ikke er tilfelle, ta kontakt med
                        veileder i NAV.
                    </p>
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
                        Dette er en ny digital løsning for avtale om
                        arbeidstrening.{' '}
                        <Link
                            to={pathTilInformasjonssideInnlogget}
                            className="lenke"
                        >
                            Les mer om hvordan dette fungerer her
                        </Link>
                        <HoyreChevron />
                    </AlertStripe>
                </div>
                {false || (
                    <div className={cls.element('natur-logo')}>
                        <MediaQuery minWidth={576}>
                            <Natur />
                        </MediaQuery>
                        <MediaQuery maxWidth={576}>
                            <Natur width={'300'} height={'100'} />
                        </MediaQuery>
                        <Undertittel
                            className={cls.element('ingen-avtaler-header')}
                        >
                            Ingen avtaler
                        </Undertittel>
                        <Normaltekst>
                            {tilbakemeldingHvisIngenAvtale}
                        </Normaltekst>
                        <div
                            className={cls.element(
                                'topp',
                                'knapp_uten_avtaler'
                            )}
                        >
                            {opprettAvtaleKnapp}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default withRouter(AvtaleOversikt);
