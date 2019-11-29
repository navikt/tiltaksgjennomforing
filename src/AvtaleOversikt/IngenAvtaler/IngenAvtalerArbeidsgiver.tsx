import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { ReactComponent as StopIkon } from '@/assets/ikoner/stop.svg';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { Ingress, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';
type Props = {};

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const lonnstilskuddToggle = featureToggleContext[Feature.Lonnstilskudd];

    const enkeltRettighet = lonnstilskuddToggle ? (
        <>
            en av enkelttjenestene
            <ul>
                <li>Avtale om arbeidstrening</li>
                <li>Avtale om lønnstilskudd</li>
            </ul>
        </>
    ) : (
        <> enkelttjenesten Avtale om arbeidstrening</>
    );

    const harTilgangPaMinstEnOrg = innloggetBruker.organisasjoner.length > 0;
    const organisasjonsListe = innloggetBruker.organisasjoner.map(org => (
        <li>
            {org.bedriftNavn} ({org.bedriftNr})
        </li>
    ));

    return (
        <div>
            <Innholdsboks>
                <div className={cls.element('container')}>
                    {harTilgangPaMinstEnOrg && (
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <InfoIkon className={cls.element('headerIkon')} />
                                <Innholdstittel>Ingen avtaler</Innholdstittel>
                            </div>
                            <Ingress>
                                Du har ingen avtaler her enda, men du har rettigheter på bedriften(e) under. Skulle det
                                bli opprettet en avtale på noen av disse bedriftene vil du få tilgang til denne avtalen.
                                <ul>{organisasjonsListe}</ul>
                            </Ingress>

                            <Undertittel>Hvordan får jeg tilgang?</Undertittel>
                            <Ingress>
                                Hvis du er ute etter en avtale registrert på en annen bedrift enn de overnevnte må du i
                                Altinn enten ha rollen
                                <ul>
                                    <li>Helse-, sosial- og velferdstjenester</li>
                                </ul>
                                eller {enkeltRettighet}
                                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                    Les mer om roller og rettigheter på Altinn.no
                                </EksternLenke>
                            </Ingress>
                        </div>
                    )}

                    {!harTilgangPaMinstEnOrg && (
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <StopIkon width="35" height="35" className={cls.element('headerIkon')} />
                                <Innholdstittel>Du mangler rettigheter i Altinn</Innholdstittel>
                            </div>
                            <div>
                                <Ingress>
                                    Du har ikke nødvendig tilgang på noen bedrifter. Tilgang til avtaler på din bedrift
                                    forutsetter at du har fått tildelt korrekt rolle eller rettighet i Altinn.
                                </Ingress>

                                <Ingress>
                                    <VerticalSpacer twentyPx={true} />
                                    <Undertittel>Hvordan får jeg tilgang?</Undertittel>For å få tilgang på avtaler til
                                    din bedrift må du i Altinn enten ha rollen{' '}
                                    <ul>
                                        <li>Helse-, sosial- og velferdstjenester</li>
                                    </ul>{' '}
                                    eller {enkeltRettighet}
                                </Ingress>

                                <div className={cls.element('rolleinfo')}>
                                    <Undertittel>Hvem kan gi deg tilgang?</Undertittel>
                                    <Ingress>
                                        Det er virksomheten som må gi deg tilgang. Tilgang kan delegeres av personer som
                                        selv har tilgang, dersom de også har rollen Tilgangsstyring.
                                        <div className={cls.element('rolleinfo2')}>
                                            I store virksomheter er det vanlig at HR-personell har fått tilgangsstyring
                                            fra ledelsen for å kunne delegere Altinn-roller på vegne av virksomheten.
                                            Hvis tilgangsstyring ikke er delegert til HR-personell må man få tildelt
                                            tilgang fra daglig leder eller andre fra eiersiden.{' '}
                                            <VerticalSpacer twentyPx={true} />
                                            <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                                Les mer om roller og rettigheter på Altinn.no
                                            </EksternLenke>
                                        </div>
                                    </Ingress>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Innholdsboks>
        </div>
    );
};

export default IngenAvtalerArbeidsgiver;
