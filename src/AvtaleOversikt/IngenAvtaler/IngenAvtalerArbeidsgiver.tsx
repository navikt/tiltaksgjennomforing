import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Ingress, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
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
        <>
            enkelttjenesten
            <ul>
                <li>Avtale om arbeidstrening</li>
            </ul>
        </>
    );

    const antallOrgTilgangTil = innloggetBruker.organisasjoner.length;
    const harTilgangPaMinstEnOrg = antallOrgTilgangTil > 0;
    const organisasjonsListe = innloggetBruker.organisasjoner.map(org => (
        <li key={org.bedriftNr}>
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
                            <Normaltekst tag="div">
                                Du har ingen avtaler her enda, men du har rettigheter på virksomheten(e) vist under.
                                Hvis det blir opprettet en avtale på noen av disse virksomhetene, vil du få tilgang til
                                denne avtalen.
                                <VerticalSpacer twentyPx={true} />
                                <Ekspanderbartpanel
                                    tittel="Virksomheter du har rettigheter i"
                                    border
                                    apen={antallOrgTilgangTil < 5}
                                >
                                    <ul>{organisasjonsListe}</ul>
                                </Ekspanderbartpanel>
                                <VerticalSpacer twentyPx={true} />
                            </Normaltekst>
                            <VerticalSpacer thirtyTwoPx={true} />
                            <Systemtittel>Hvordan får jeg tilgang?</Systemtittel>
                            <VerticalSpacer sixteenPx={true} />
                            <Normaltekst tag="div">
                                Hvis du er ute etter en avtale registrert på en annen bedrift enn de overnevnte må du i
                                Altinn enten ha rollen
                                <ul>
                                    <li>Helse-, sosial- og velferdstjenester</li>
                                </ul>
                                eller {enkeltRettighet}
                                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                    Les mer om roller og rettigheter på Altinn.no
                                </EksternLenke>
                            </Normaltekst>
                        </div>
                    )}

                    {!harTilgangPaMinstEnOrg && (
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <VarselIkon width="35" height="35" className={cls.element('headerIkon')} />
                                <Innholdstittel>Du mangler rettigheter i Altinn</Innholdstittel>
                            </div>
                            <div>
                                <Ingress>
                                    Du har ikke nødvendig tilgang på noen bedrifter. Tilgang til avtaler på din bedrift
                                    forutsetter at du har fått tildelt korrekt rolle eller rettighet i Altinn.
                                </Ingress>
                                <VerticalSpacer thirtyTwoPx={true} />
                                <Normaltekst>
                                    <Systemtittel>Hvordan får jeg tilgang?</Systemtittel>
                                    <VerticalSpacer sixteenPx={true} />
                                    For å få tilgang på avtaler til din bedrift må du i Altinn enten ha rollen{' '}
                                    <ul>
                                        <li>Helse-, sosial- og velferdstjenester</li>
                                    </ul>{' '}
                                    eller {enkeltRettighet}
                                </Normaltekst>

                                <div className={cls.element('rolleinfo')}>
                                    <Systemtittel>Hvem kan gi deg tilgang?</Systemtittel>
                                    <VerticalSpacer sixteenPx={true} />
                                    <Normaltekst>
                                        Det er virksomheten din som må gi deg tilgang. Tilgang kan delegeres av personer
                                        som selv har tilgang, dersom de også har rollen Tilgangsstyring.
                                        <VerticalSpacer sixteenPx={true} />
                                        <div>
                                            I store virksomheter er det vanlig at HR-personell har fått tilgangsstyring
                                            fra ledelsen for å kunne delegere Altinn-roller på vegne av virksomheten.
                                            Hvis tilgangsstyring ikke er delegert til HR-personell må man få tildelt
                                            tilgang fra daglig leder eller andre fra eiersiden.
                                            <VerticalSpacer twentyPx={true} />
                                            <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                                Les mer om roller og rettigheter på Altinn.no
                                            </EksternLenke>
                                        </div>
                                    </Normaltekst>
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
