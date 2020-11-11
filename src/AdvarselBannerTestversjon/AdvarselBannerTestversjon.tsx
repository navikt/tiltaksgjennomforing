import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import './AdvarselBannerTestversjon.less';

const cls = BEMHelper('advarsel-banner-testversjon');

const AdvarselBannerTestversjon = () => {
    return (
        <>
            {window.location.hostname.includes('labs.nais.io') && (
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
                    <LesMerPanel åpneLabel="Slik tester du registrering av avtaler" lukkLabel="Lukk">
                        For å teste hele flyten, kan du logge inn som arbeidsgiver, opprette en avtale på fnr:
                        <b>15000000067</b> og bedriftnr: <b>999999999</b>.
                        <br />
                        Vi ber også om at du ikke registrer ekte data i denne løsningen, da dette er en åpen
                        testversjon.
                    </LesMerPanel>
                </AlertStripeAdvarsel>
            )}
        </>
    );
};

export default AdvarselBannerTestversjon;
