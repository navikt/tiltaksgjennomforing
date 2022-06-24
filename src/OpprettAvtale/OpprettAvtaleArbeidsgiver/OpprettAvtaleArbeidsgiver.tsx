import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import { tiltakstypeTekst } from '@/messages';
import { pathTilOpprettAvtaleFullfortArbeidsgiver } from '@/paths';
import { opprettAvtaleSomArbeidsgiver } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { storForbokstav } from '@/utils/stringUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Input, RadioPanel } from 'nav-frontend-skjema';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './OpprettAvtaleArbeidsgiver.less';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { Feilmeldinger } from '@/types/feilkode';
import { Feilkode } from '@/types/feilkode';
import { validerOrgnr } from '@/utils/orgnrUtils';

const cls = BEMHelper('opprett-avtale-arbeidsgiver');

const OpprettAvtaleArbeidsgiver: FunctionComponent = () => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [uyldigAvtaletype, setUyldigAvtaletype] = useState(false);
    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>(undefined);
    const innloggetBruker = useContext(InnloggetBrukerContext);
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

    const fnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value.replace(/\D/g, '');
        if (/^\d{0,11}$/.test(verdi)) {
            setDeltakerFnr(verdi);
            setDeltakerFnrFeil(undefined);
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
        if (!validerOrgnr(valgtBedriftNr)) {
            feilBedriftNr = Feilmeldinger.UGYLDIG_VIRKSOMHETSNUMMER;
        }

        if (feilBedriftNr.length === 0 && feilDeltakerFNR.length === 0 && valgtTiltaksType) {
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
                        {innloggetBruker.tilganger[valgtBedriftNr].map((tiltakType: TiltaksType, index: number) => (
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
                        onChange={fnrOnChange}
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
