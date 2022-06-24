import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import useValidering from '@/komponenter/useValidering';
import { pathTilOpprettAvtaleFullfortVeileder } from '@/paths';
import { hentBedriftBrreg, opprettAvtaleSomVeileder } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import amplitude from '@/utils/amplitude';
import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Input, RadioPanel, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './OpprettAvtale.less';

const cls = BEMHelper('opprett-avtale');

const OpprettAvtaleVeileder: FunctionComponent = (props) => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [uyldigAvtaletype, setUyldigAvtaletype] = useState(false);
    const [bedriftNr, setBedriftNr] = useState('');
    const [bedriftNavn, setBedriftNavn] = useState('');
    const history = useHistory();
    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(deltakerFnr, [
        (verdi) => {
            if (!verdi) {
                return 'Fødselsnummer er påkrevd';
            }
        },
        (verdi) => {
            if (!validerFnr(verdi)) {
                return 'Ugyldig fødselsnummer';
            }
        },
    ]);

    const [bedriftNrFeil, setBedriftNrFeil, validerBedriftNr] = useValidering(bedriftNr, [
        (verdi) => {
            if (!verdi) {
                return 'Virksomhetsnummer er påkrevd';
            }
        },
        (verdi) => {
            if (!validerOrgnr(verdi)) {
                return 'Ugyldig virksomhetsnummer';
            }
        },
    ]);

    const fnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value.replace(/\D/g, '');
        if (/^\d{0,11}$/.test(verdi)) {
            setDeltakerFnr(verdi);
            setDeltakerFnrFeil(undefined);
        }
    };

    const orgnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value.replace(/\D/g, '');
        if (/^\d{0,9}$/.test(verdi)) {
            setBedriftNr(verdi);
            setBedriftNrFeil(undefined);
            setBedriftNavn('');
        }
    };

    const orgnrOnBlur = () => {
        if (validerBedriftNr()) {
            hentBedriftBrreg(bedriftNr)
                .then((response) => {
                    setBedriftNavn(response.bedriftNavn);
                    setBedriftNrFeil(undefined);
                })
                .catch((error) => {
                    setBedriftNavn('');
                    handterFeil(error, (feilmelding) => setBedriftNrFeil(feilmelding));
                })
                .catch((e) => setBedriftNrFeil('Det oppstod en uventet feil'));
        } else {
            setBedriftNavn('');
        }
    };

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
        if (!validerOrgnr(bedriftNr)) {
            feilBedriftNr = Feilmeldinger.UGYLDIG_VIRKSOMHETSNUMMER;
        }
        if (feilBedriftNr.length === 0 && feilDeltakerFNR.length === 0 && valgtTiltaksType) {
            const avtale = await opprettAvtaleSomVeileder(deltakerFnr, bedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
            history.push(pathTilOpprettAvtaleFullfortVeileder(avtale.id));
            return;
        }

        setUyldigAvtaletype(valgtAvtaleType);
        setBedriftNrFeil(feilBedriftNr);
        setDeltakerFnrFeil(feilDeltakerFNR);
    };

    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>();

    const featureToggleContext = useContext(FeatureToggleContext);

    const mentorToggle = featureToggleContext[Feature.Mentor];
    const inkluderingstilskuddToggle = featureToggleContext[Feature.Inkluderingstiskudd];

    const radiopaneler = (
        <Innholdsboks>
            <Systemtittel>Velg type avtale</Systemtittel>
            <Normaltekst>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-hvordan-kan-nav-hjelpe-med-inkludering-apnet')}
                    href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                >
                    hvordan kan NAV hjelpe med inkludering
                </EksternLenke>
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <div className={cls.element('tiltakstypeWrapper')}>
                <RadioPanel
                    name="tiltakstype"
                    label="Arbeidstrening"
                    value="ARBEIDSTRENING"
                    checked={valgtTiltaksType === 'ARBEIDSTRENING'}
                    onChange={() => {
                        setTiltaksType('ARBEIDSTRENING');
                        setUyldigAvtaletype(false);
                    }}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Midlertidig lønnstilskudd"
                    value="MIDLERTIDIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'MIDLERTIDIG_LONNSTILSKUDD'}
                    onChange={() => {
                        setTiltaksType('MIDLERTIDIG_LONNSTILSKUDD');
                        setUyldigAvtaletype(false);
                    }}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Varig lønnstilskudd"
                    value="VARIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'VARIG_LONNSTILSKUDD'}
                    onChange={() => {
                        setTiltaksType('VARIG_LONNSTILSKUDD');
                        setUyldigAvtaletype(false);
                    }}
                />
                {mentorToggle && (
                    <RadioPanel
                        name="tiltakstype"
                        label="Mentor"
                        value="MENTOR"
                        checked={valgtTiltaksType === 'MENTOR'}
                        onChange={() => {
                            setTiltaksType('MENTOR');
                            setUyldigAvtaletype(false);
                        }}
                    />
                )}
                {inkluderingstilskuddToggle && (
                    <RadioPanel
                        name="tiltakstype"
                        label="Inkluderingstilskudd"
                        value="INKLUDERINGSTILSKUDD"
                        checked={valgtTiltaksType === 'INKLUDERINGSTILSKUDD'}
                        onChange={() => {
                            setTiltaksType('INKLUDERINGSTILSKUDD');
                            setUyldigAvtaletype(false);
                        }}
                    />
                )}
                <RadioPanel
                    name="tiltakstype"
                    label="Sommerjobb"
                    value="SOMMERJOBB"
                    checked={valgtTiltaksType === 'SOMMERJOBB'}
                    onChange={() => {
                        setTiltaksType('SOMMERJOBB');
                        setUyldigAvtaletype(false);
                    }}
                />
            </div>
            {uyldigAvtaletype && (
                <SkjemaelementFeilmelding>{Feilmeldinger.UGYLDIG_AVTALETYPE}</SkjemaelementFeilmelding>
            )}
        </Innholdsboks>
    );

    return (
        <div className="opprett-avtale">
            <Dokumenttittel tittel="Opprett avtale" />

            <VerticalSpacer rem={1} />
            <Innholdstittel style={{ textAlign: 'center' }}>Opprett avtale</Innholdstittel>
            <VerticalSpacer rem={2} />
            <Innholdsboks>
                <Normaltekst>
                    Er det første gang du skal opprette en avtale bør du lese gjennom {''}
                    <EksternLenke href="/informasjonsside/uinnlogget">
                        introduksjon til hvordan løsningen fungerer {''}
                    </EksternLenke>
                    og vite om{' '}
                    <EksternLenke
                        onClick={() => amplitude.logEvent('#tiltak-veileder-alle-tiltak-link-apnet')}
                        href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                    >
                        de ulike støtteordningene på NAV.no.
                    </EksternLenke>{' '}
                    eller {''}
                    <EksternLenke
                        onClick={() => amplitude.logEvent('#tiltak-veileder-alle-tiltak-navet-link-apnet')}
                        href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-tiltak-og-virkemidler/SitePages/Alfabetisk-oversikt-over-alle-tiltak-og-virkemidler.aspx?web=1"
                    >
                        de ulike støtteordningene på Navet.
                    </EksternLenke>
                </Normaltekst>
            </Innholdsboks>
            <VerticalSpacer rem={1} />
            <Innholdsboks>
                <Systemtittel>Hvem skal inngå i avtalen?</Systemtittel>
                <VerticalSpacer rem={1} />
                <Input
                    className="typo-element"
                    label="Deltakers fødselsnummer"
                    value={deltakerFnr}
                    bredde={'M'}
                    onChange={fnrOnChange}
                    onBlur={validerDeltakerFnr}
                    feil={deltakerFnrFeil}
                />
                <VerticalSpacer rem={1} />

                <Input
                    className="typo-element"
                    label="Virksomhetsnummer"
                    bredde={'M'}
                    description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                    value={bedriftNr}
                    onChange={orgnrOnChange}
                    onBlur={orgnrOnBlur}
                    feil={bedriftNrFeil}
                />
                {bedriftNavn && <Normaltekst className="opprett-avtale__bedriftNavn">{bedriftNavn}</Normaltekst>}
            </Innholdsboks>
            <VerticalSpacer rem={1} />
            {radiopaneler}
            <VerticalSpacer rem={1} />
            <AlertStripeInfo>
                <Element>Dette skjer etter at du har opprettet avtalen</Element>
                <ul>
                    <li>Du kan begynne å fylle ut avtalen.</li>
                    <li>
                        Avtalen blir tilgjengelig for veilederne på NAV kontoret til deltakeren. Når avtalen har blitt
                        fordelt til en veileder vil du se kontaktinformasjonen til denne veilederen inne i avtalen.
                    </li>
                </ul>
            </AlertStripeInfo>
            <VerticalSpacer rem={1} />
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
    );
};

export default OpprettAvtaleVeileder;
