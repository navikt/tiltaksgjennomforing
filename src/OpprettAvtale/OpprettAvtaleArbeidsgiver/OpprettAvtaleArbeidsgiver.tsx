import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import useValidering from '@/komponenter/useValidering';
import { tiltakstypeTekst } from '@/messages';
import { pathTilOpprettAvtaleFullfortArbeidsgiver } from '@/paths';
import { opprettAvtaleSomArbeidsgiver } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { setFnrBrukerOnChange, validatorer, validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { storForbokstav } from '@/utils/stringUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Input, RadioPanel, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './OpprettAvtaleArbeidsgiver.less';
import { opprettMentorAvtale } from '@/services/rest-service';
import { Avtalerolle } from '@/OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';

const cls = BEMHelper('opprett-avtale-arbeidsgiver');

const OpprettAvtaleArbeidsgiver: FunctionComponent = () => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [mentorFnr, setMentorFnr] = useState('');
    const [uyldigAvtaletype, setUyldigAvtaletype] = useState(false);
    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>(undefined);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    const featureToggleContext = useContext(FeatureToggleContext);
    const inkluderingstilskuddToggle = featureToggleContext[Feature.Inkluderingstiskudd];

    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(
        deltakerFnr,
        validatorer('Deltaker', mentorFnr)
    );
    const [mentorFnrFeil, setMentorFnrFeil, validerMentorFnr] = useValidering(
        mentorFnr,
        validatorer('Mentor', deltakerFnr)
    );

    const setFeilmelding = (melding: Feilkode) => {
        if (melding === 'SOMMERJOBB_FOR_GAMMEL') {
            setDeltakerFnrFeil(Feilmeldinger.SOMMERJOBB_FOR_GAMMEL);
        }
    };

    const opprettAvtaleKlikk = async () => {
        let valgtAvtaleType = false;
        let feilDeltakerFNR = '';
        let feilBedriftNr = '';

        if (!valgtTiltaksType) {
            valgtAvtaleType = true;
        }
        if (!validerFnr(deltakerFnr)) {
            feilDeltakerFNR = Feilmeldinger.UGYLDIG_FØDSELSNUMMER;
        }
        if (!validerOrgnr(valgtBedriftNr)) {
            feilBedriftNr = Feilmeldinger.UGYLDIG_VIRKSOMHETSNUMMER;
        }

        if (feilBedriftNr.length === 0 && feilDeltakerFNR.length === 0 && valgtTiltaksType) {
            if (valgtTiltaksType === 'MENTOR') {
                const mentorAvtale = await opprettMentorAvtale(
                    deltakerFnr,
                    mentorFnr,
                    valgtBedriftNr,
                    valgtTiltaksType,
                    Avtalerolle.ARBEIDSGIVER
                );
                amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
                history.push(pathTilOpprettAvtaleFullfortArbeidsgiver(mentorAvtale.id));
                return;
            }
            const avtale = await opprettAvtaleSomArbeidsgiver(deltakerFnr, valgtBedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet-arbeidsgiver', { tiltakstype: valgtTiltaksType });
            history.push({
                pathname: pathTilOpprettAvtaleFullfortArbeidsgiver(avtale.id),
                search: window.location.search,
            });
            return;
        }
        setUyldigAvtaletype(valgtAvtaleType);
        setDeltakerFnrFeil(feilDeltakerFNR);
    };

    const valgtBedriftNr = new URLSearchParams(window.location.search).get('bedrift')!;
    const valgtBedriftNavn = innloggetBruker.altinnOrganisasjoner.find(
        (org) => org.OrganizationNumber === valgtBedriftNr
    )?.Name;

    const mentorToggle = featureToggleContext[Feature.Mentor];
    const erTiltakstypeSkruddPå = (tiltakstype: TiltaksType) => {
        if (tiltakstype === 'MENTOR') {
            return mentorToggle;
        } else if (tiltakstype === 'INKLUDERINGSTILSKUDD') {
            return inkluderingstilskuddToggle;
        } else {
            return true;
        }
    };

    return (
        <>
            <Dokumenttittel tittel="Opprett avtale" />
            <Banner tekst="Opprett avtale" />
            <div className={cls.className}>
                <Innholdsboks>
                    <Systemtittel>Før du oppretter en avtale</Systemtittel>
                    <Normaltekst>
                        Er det første gang du skal opprette en avtale bør du lese gjennom {''}
                        <EksternLenke href="/informasjonsside/uinnlogget">
                            introduksjon til hvordan løsningen fungerer {''}
                        </EksternLenke>
                        og vite om{' '}
                        <EksternLenke
                            onClick={() => amplitude.logEvent('#tiltak-arbeidsgiver-alle-tiltak-link-apnet')}
                            href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                        >
                            de ulike støtteordningene.
                        </EksternLenke>
                    </Normaltekst>
                </Innholdsboks>
                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Systemtittel className={cls.element('innholdstittel')}>Velg type avtale</Systemtittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Du kan kun opprette tiltaktstyper du har tilgang til i virksomheten du har valgt.
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('tiltakstypeWrapper')}>
                        {innloggetBruker.tilganger[valgtBedriftNr]
                            .filter((tiltakstype) => erTiltakstypeSkruddPå(tiltakstype))
                            .map((tiltakType: TiltaksType, index: number) => (
                                <RadioPanel
                                    key={index}
                                    name="tiltakstype"
                                    label={storForbokstav(tiltakstypeTekst[tiltakType])}
                                    value={tiltakType}
                                    checked={valgtTiltaksType === tiltakType}
                                    onChange={() => {
                                        setTiltaksType(tiltakType);
                                        setUyldigAvtaletype(false);
                                    }}
                                />
                            ))}
                    </div>
                    {uyldigAvtaletype && (
                        <SkjemaelementFeilmelding>{Feilmeldinger.UGYLDIG_AVTALETYPE}</SkjemaelementFeilmelding>
                    )}
                </Innholdsboks>
                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Systemtittel className={cls.element('innholdstittel')}>Hvem skal inngå i avtalen</Systemtittel>
                    <VerticalSpacer rem={1} />
                    <AlertStripeInfo>
                        I feltet “Opprettes på bedrift” er det viktig at virksomhetsnummeret er det samme som der det
                        blir registrert inntekt for deltaker i A-meldingen.
                    </AlertStripeInfo>
                    <VerticalSpacer rem={1} />
                    <Input
                        className="typo-element"
                        label="Deltakers fødselsnummer"
                        value={deltakerFnr}
                        bredde={'L'}
                        onChange={(event) => setFnrBrukerOnChange(event, setDeltakerFnr, setDeltakerFnrFeil)}
                        onBlur={validerDeltakerFnr}
                        feil={deltakerFnrFeil}
                    />
                    <VerticalSpacer rem={1} />
                    <Input
                        className="typo-element"
                        bredde={'L'}
                        label="Opprettes på bedrift"
                        description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                        value={`${valgtBedriftNavn} (${valgtBedriftNr})`}
                        disabled={true}
                    />
                    <VerticalSpacer rem={1} />
                    {valgtTiltaksType === 'MENTOR' && (
                        <>
                            <Input
                                className="typo-element"
                                label="Mentors fødselsnummer"
                                value={mentorFnr}
                                bredde={'M'}
                                onChange={(event) => setFnrBrukerOnChange(event, setMentorFnr, setMentorFnrFeil)}
                                onBlur={validerMentorFnr}
                                feil={mentorFnrFeil}
                            />
                            <Normaltekst>
                                Du kan kun opprette tiltaktstyper du har tilgang til i virksomheten du har valgt.
                            </Normaltekst>
                            {uyldigAvtaletype && (
                                <SkjemaelementFeilmelding>{Feilmeldinger.UGYLDIG_AVTALETYPE}</SkjemaelementFeilmelding>
                            )}
                        </>
                    )}
                </Innholdsboks>

                <AlertStripeInfo>
                    <Element>Dette skjer etter at du har opprettet avtalen</Element>
                    <Normaltekst>
                        <ul>
                            <li>Du kan begynne å fylle ut avtalen.</li>
                            <li>
                                Avtalen blir tilgjengelig for veilederne på NAV kontoret til deltakeren. Når avtalen har
                                blitt fordelt til en veileder vil du se kontaktinformasjonen til denne veilederen inne i
                                avtalen.
                            </li>
                        </ul>
                    </Normaltekst>
                </AlertStripeInfo>

                <div className={cls.element('knappRad')}>
                    <LagreKnapp
                        lagre={opprettAvtaleKlikk}
                        setFeilmelding={setFeilmelding}
                        label={'Opprett avtale'}
                        className="opprett-avtale__knapp"
                    />
                    <TilbakeTilOversiktLenke />
                </div>
            </div>
        </>
    );
};

export default OpprettAvtaleArbeidsgiver;
