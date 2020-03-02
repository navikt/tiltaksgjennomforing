import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import './AdvarselBannerHeroku.less';
import BEMHelper from '@/utils/bem';

const cls = BEMHelper('advarsel-banner-heroku');

const AdvarselBannerHeroku = () => {
    return (
        <>
            {process.env.REACT_APP_ON_HEROKU !== 'true' && (
                <AlertStripeAdvarsel className={cls.className}>
                    <b>Dette er en testversjon</b>
                    <br />
                    Her kan du bli bedre kjent med digitale avtaler for tiltaksgjennomføring.
                    <br />
                    Hvis du er veileder i NAV må du bruke arbeidsgiver.nais.adeo.no/tiltaksgjennomforing for å lage en
                    ekte avtale.
                    <br />
                    Hvis du er arbeidsgiver eller deltaker logger du deg på her:
                    arbeidsgiver.nav.no/tiltaksgjennomforing.
                </AlertStripeAdvarsel>
            )}
        </>
    );
};

export default AdvarselBannerHeroku;
