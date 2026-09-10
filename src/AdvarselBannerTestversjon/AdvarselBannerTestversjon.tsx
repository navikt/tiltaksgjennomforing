import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';
import { Alert } from '@navikt/ds-react';
import './AdvarselBannerTestversjon.less';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const cls = BEMHelper('advarsel-banner-testversjon');

const AdvarselBannerTestversjon = () => {
    return (
        <>
            {window.location.hostname.includes('-labs') && (
                <Alert variant="warning" className={cls.className}>
                    <b>Dette er en testversjon</b>
                    <br />
                    Her kan du bli bedre kjent med digitale avtaler for tiltaksgjennomføring.
                    <br />
                    <b>Vi ber også om at du ikke registrer ekte data i denne løsningen.</b>
                    <LesMerPanel åpneLabel="Les mer" lukkLabel="Lukk">
                        <p>
                            Hvis du er veileder i Nav,{' '}
                            <EksternLenke href="https://tiltaksgjennomforing.intern.nav.no/tiltaksgjennomforing">
                                klikk her
                            </EksternLenke>{' '}
                            for å registrere ekte avtaler.
                            <br />
                            Hvis du er arbeidsgiver eller deltaker kan du logge deg inn{' '}
                            <EksternLenke href="https://arbeidsgiver.nav.no/tiltaksgjennomforing">her</EksternLenke>.
                        </p>
                        <p>
                            For å teste flyten, kan du opprette avtaler på fnr: <b>23090170716</b> (fiktivt) og
                            bedriftnr: <b>999999999</b>.
                            <br />
                            Skal du opprette mentor-avtale kan du bruke fnr: <b>23090170716</b> som mentor og fnr:{' '}
                            <b>00000000000</b> som deltaker.
                        </p>
                        <p>
                            <b>Testløsinge oppdateres uregelmessig</b>
                            <br />
                            Noen funksjoner kan til tider derfor være utilgjengelige eller avvike fra
                            produksjonsløsningen.
                        </p>
                    </LesMerPanel>
                </Alert>
            )}
        </>
    );
};

export default AdvarselBannerTestversjon;
