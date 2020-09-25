import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { tiltakstypeTekst } from '@/messages';
import { Avtale, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Ingress, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';

type Props = {
    sokekriterier: Partial<Avtale>;
};

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
                <li>Avtale om midlertidig lønnstilskudd</li>
                <li>Avtale om varig lønnstilskudd</li>
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

    const valgtBedrift = innloggetBruker.organisasjoner.find(o => o.bedriftNr === props.sokekriterier.bedriftNr)!;

    const harTilgangPaTiltakstypeIValgtBedrift = () => {
        if (props.sokekriterier.tiltakstype) {
            return valgtBedrift.tilgangstyper.includes(props.sokekriterier.tiltakstype);
        }
        return true;
    };
    const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];
    const serviceKoder = {
        ARBEIDSTRENING: '5532_1',
        MIDLERTIDIG_LONNSTILSKUDD: '5516_1',
        VARIG_LONNSTILSKUDD: '5516_2',
        MENTOR: '5216_1',
    };
    const valgtServiceKode = props.sokekriterier.tiltakstype && serviceKoder[props.sokekriterier.tiltakstype];

    const tilgangerJegIkkeHar = alleTilganger.filter(tilgang => !valgtBedrift.tilgangstyper.includes(tilgang));

    if (!harTilgangPaTiltakstypeIValgtBedrift()) {
        return (
            <Innholdsboks>
                <div className={cls.element('container')}>
                    <div className={cls.element('headerContainer')}>
                        <InfoIkon className={cls.element('headerIkon')} />
                        <Innholdstittel>Ikke tilgang på tiltak</Innholdstittel>
                    </div>
                    <Normaltekst>
                        Du har dessverre ikke tilgang på{' '}
                        <b>{tiltakstypeTekst[props.sokekriterier.tiltakstype as TiltaksType]}</b> i{' '}
                        {valgtBedrift.bedriftNavn}.
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <EksternLenke
                        href={`https://tt02.altinn.no/ui/DelegationRequest?offeredBy=${valgtBedrift.bedriftNr}&resources=${valgtServiceKode}`}
                    >
                        Be om tilgang i Altinn her
                    </EksternLenke>
                </div>
            </Innholdsboks>
        );
    }

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
                            {props.sokekriterier.tiltakstype && harTilgangPaTiltakstypeIValgtBedrift() ? (
                                <Normaltekst>
                                    Det har ikke blitt opprettet noen avtaler om{' '}
                                    {tiltakstypeTekst[props.sokekriterier.tiltakstype]}.
                                </Normaltekst>
                            ) : (
                                <>
                                    <Normaltekst tag="div">
                                        Du har ingen avtaler her enda. Du har rettigheter i bedriften til
                                        <ul>
                                            {valgtBedrift.tilgangstyper.map(t => (
                                                <li key={t}>{tiltakstypeTekst[t as TiltaksType]}</li>
                                            ))}
                                        </ul>
                                        <VerticalSpacer twentyPx={true} />
                                    </Normaltekst>
                                    <VerticalSpacer thirtyTwoPx={true} />
                                    <Systemtittel>Hvordan får jeg tilgang på andre tiltak?</Systemtittel>
                                    <VerticalSpacer sixteenPx={true} />
                                    <Normaltekst tag="div">
                                        Hvis du er ute etter en avtale om et annet tiltak, må du i Altinn ha korrekt
                                        tilgang:
                                        <ul>
                                            {tilgangerJegIkkeHar.map(t => (
                                                <li key={t}>{tiltakstypeTekst[t as TiltaksType]}</li>
                                            ))}
                                        </ul>
                                        <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                            Les mer om roller og rettigheter på Altinn.no
                                        </EksternLenke>
                                    </Normaltekst>
                                </>
                            )}
                        </div>
                    )}

                    {!harTilgangPaMinstEnOrg && (
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <VarselIkon className={cls.element('headerIkon')} />
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
                                    For å få tilgang på avtaler til din bedrift må du i Altinn ha {enkeltRettighet}
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
