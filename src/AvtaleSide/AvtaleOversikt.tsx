import moment from 'moment';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { InnloggetBruker } from '../InnloggingBoundary/useInnlogget';
import StatusIkon from '../komponenter/StatusIkon/StatusIkon';
import {
    basename,
    pathTilKontaktinformasjonSteg,
    pathTilOpprettAvtale,
} from '../paths';
import RestService from '../services/rest-service';
import { Avtale } from './avtale';
import './AvtaleOversikt.less';
import Banner from '../komponenter/Banner/Banner';
import Natur from './natur';
import classNames from 'classnames';
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../utils/bem';

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
            href={basename + pathTilKontaktinformasjonSteg(avtale.id)}
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

    const tilbakemeldingHvisIngenAvtale = erVeileder
        ? 'Du har ikke opprettet noen avtaler enda.' // NAV
        : 'Det har ikke blitt opprettet noen avtaler hvor du er med enda. Vennligst vent på veileder i NAV.'; // Deltaker/AG
    return (
        <>
            <Banner tekst="Dine arbeidstreningsavtaler" />

            <div className="avtaleoversikt">
                <div className={cls.element('informasjonsBanner')}>
                    <AlertStripe type="info">
                        Dette er en ny digital løsning for avtale om
                        arbeidstrening.{' '}
                        <Lenke href="/informasjonsside/innlogget">
                            Les mer om hvordan dette fungerer her
                        </Lenke>
                        .
                    </AlertStripe>
                </div>
                {avtaletabell || (
                    <div className={cls.element('natur-logo')}>
                        <MediaQuery minWidth={576}>
                            <Natur />
                        </MediaQuery>
                        <MediaQuery maxWidth={576}>
                            <Natur width={'300'} height={'100'} />
                        </MediaQuery>
                        <Undertittel className={cls.element('natur-header')}>
                            Ingen avtaler
                        </Undertittel>
                        <Normaltekst className={cls.element('natur-tekst')}>
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
