import moment from 'moment';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, HTMLProps, useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { InnloggetBruker } from '../InnloggingBoundary/useInnlogget';
import {
    basename,
    pathTilKontaktinformasjonSteg,
    pathTilOpprettAvtale,
} from '../paths';
import RestService from '../services/rest-service';
import { Avtale } from './avtale';
import './AvtaleOversikt.less';
import MediaQuery from 'react-responsive';
import { ReactComponent as CheckIkon } from '../assets/ikoner/check-circle-green.svg';
import { ReactComponent as ProblemIkon } from '../assets/ikoner/report-problem-circle.svg';
import { ReactComponent as InfoIkon } from '../assets/ikoner/infomation-circle.svg';

import SmaaIkon from '../komponenter/SmaaIkon/SmaaIkon';

const linkTilAvtale = (props: HTMLProps<HTMLElement>) => {
    return <Link to={props.href!}>Gå til</Link>;
};
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
                <div className="avtaleoversikt__lenker__status">
                    {avtale.status}
                </div>

                <SmaaIkon
                    svgSmaaIkon={
                        <ProblemIkon
                            style={{
                                display:
                                    avtale.status === 'Mangler godkjenning'
                                        ? ''
                                        : 'none',
                                width: 24,
                                height: 24,
                                margin: 0,
                            }}
                        />
                    }
                />
                <SmaaIkon
                    svgSmaaIkon={
                        <CheckIkon
                            style={{
                                display: avtale.godkjentAvVeileder
                                    ? ''
                                    : 'none',
                                width: 24,
                                height: 24,
                                margin: 0,
                            }}
                        />
                    }
                />
                <SmaaIkon
                    svgSmaaIkon={
                        <InfoIkon
                            style={{
                                display:
                                    avtale.status === 'Påbegynt' ? '' : 'none',
                                width: 24,
                                height: 24,
                                margin: 0,
                            }}
                        />
                    }
                />
            </div>
        </LenkepanelBase>
    ));

    const avtaletabell = avtaleLenker.length > 0 && (
        <div className="avtaleoversikt__lenker typo-normal">
            <div className="avtaleoversikt__lenker__header">
                <div className="avtaleoversikt__lenker__bedrift">Bedrift</div>
                <div className="avtaleoversikt__lenker__deltaker">Deltaker</div>
                <MediaQuery minWidth={576}>
                    <div className="avtaleoversikt__lenker__opprettet">
                        Dato opprettet
                    </div>
                </MediaQuery>
                <div className="avtaleoversikt__lenker__status">Status</div>
            </div>
            {avtaleLenker}
        </div>
    );

    // innloggetBruker.identifikator.length < 11 er et triks for å sjekke om man er logget inn NAV-ansatt eller ikke,
    // dette må endres senere.
    const opprettAvtaleKnapp = innloggetBruker &&
        innloggetBruker.identifikator.length < 11 && (
            <Hovedknapp
                onClick={() => props.history.push(pathTilOpprettAvtale)}
                className="avtaleoversikt__topp__knapp"
            >
                Opprett ny avtale
            </Hovedknapp>
        );

    return (
        <div className="avtaleoversikt">
            <div className="avtaleoversikt__topp">
                <Innholdstittel className="avtaleoversikt__topp__tittel">
                    Dine arbeidstreningsavtaler
                </Innholdstittel>
                <Normaltekst className="avtaleoversikt__topp__tekst">
                    Her ser du arbeidstreningsavtaler du har tilgang til.
                </Normaltekst>
                {opprettAvtaleKnapp}
            </div>
            {avtaletabell || (
                <div className="avtaleoversikt__ingen_avtaler typo-normal">
                    Ingen avtaler
                </div>
            )}
        </div>
    );
};

export default withRouter(AvtaleOversikt);
