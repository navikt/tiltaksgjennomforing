import moment from 'moment';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import TypografiBase, {
    Undertittel,
    Normaltekst,
} from 'nav-frontend-typografi';
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
            <div className="avtaleoversikt__lenker__rad">
                <div className="avtaleoversikt__lenker__bedrift">
                    {avtale.bedriftNavn}
                </div>
                <div className="avtaleoversikt__lenker__deltaker">
                    {avtale.deltakerFornavn || ''}&nbsp;
                    {avtale.deltakerEtternavn || ''}
                </div>
                <MediaQuery minWidth={576}>
                    <div className="avtaleoversikt__lenker__opprettet">
                        {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                    </div>
                </MediaQuery>
                <div className="avtaleoversikt__lenker__statusikon">
                    <StatusIkon status={avtale.status} />
                </div>
                <div className="avtaleoversikt__lenker__status">
                    {avtale.status}
                </div>
            </div>
        </LenkepanelBase>
    ));

    const erVeileder =
        innloggetBruker && innloggetBruker.identifikator.length < 11;

    const opprettAvtaleKnapp = erVeileder && (
        <div className="avtaleoversikt__topp__knapp">
            <Hovedknapp
                onClick={() => props.history.push(pathTilOpprettAvtale)}
            >
                Opprett ny avtale
            </Hovedknapp>
        </div>
    );

    const avtaletabell = avtaleLenker.length > 0 && (
        <div className="avtaleoversikt__lenker typo-normal">
            <div className="avtaleoversikt__topp__knapp_med_avtaler">
                {opprettAvtaleKnapp}
            </div>
            <div className="avtaleoversikt__lenker__header avtaleoversikt__lenker__rad">
                <div className="avtaleoversikt__lenker__bedrift">Bedrift</div>
                <div className="avtaleoversikt__lenker__deltaker">Deltaker</div>
                <MediaQuery minWidth={576}>
                    <div className="avtaleoversikt__lenker__opprettet">
                        Opprettet
                    </div>
                </MediaQuery>
                <div className="avtaleoversikt__lenker__status">Status</div>
                <div className="avtaleoversikt__lenker__statusikon">&nbsp;</div>
            </div>
            {avtaleLenker}
        </div>
    );

    const tilbakemeldingHvisIngenAvtale = () => {
        return erVeileder
            ? 'Du har ikke opprettet noen avtaler enda.' // NAV
            : 'Det har ikke blitt opprettet noen avtaler hvor du er med enda. Vennligst vent på veileder i NAV.'; // Deltaker/AG
    };

    return (
        <>
            <Banner tekst="Dine arbeidstreningsavtaler" />

            <div className="avtaleoversikt">
                <div className="avtaleoversikt__topp">
                    {false || (
                        <div className={cls.element('natur-logo')}>
                            <MediaQuery minWidth={576}>
                                <Natur />
                            </MediaQuery>
                            <MediaQuery maxWidth={576}>
                                <Natur width={'300'} height={'100'} />
                            </MediaQuery>
                            <Undertittel
                                className={cls.element('natur-header')}
                            >
                                Ingen avtaler
                            </Undertittel>
                            <Normaltekst className={cls.element('natur-tekst')}>
                                {tilbakemeldingHvisIngenAvtale()}
                            </Normaltekst>
                            <div className="avtaleoversikt__topp__knapp_uten_avtaler">
                                {opprettAvtaleKnapp}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withRouter(AvtaleOversikt);
