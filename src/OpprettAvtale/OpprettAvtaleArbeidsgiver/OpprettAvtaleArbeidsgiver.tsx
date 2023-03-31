import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import useValidering from '@/komponenter/useValidering';
import { tiltakstypeTekst } from '@/messages';
import { Avtalerolle } from '@/OpprettAvtale/OpprettAvtaleVeileder/OpprettAvtaleVeileder';
import { basename, pathTilInformasjonssideInnlogget, pathTilOpprettAvtaleFullfortArbeidsgiver } from '@/paths';
import { opprettAvtaleSomArbeidsgiver, opprettMentorAvtale } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { setFnrBrukerOnChange, validatorer, validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { storForbokstav } from '@/utils/stringUtils';
import { Alert, BodyShort, ErrorMessage, Heading, Label, RadioGroup, TextField } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import './OpprettAvtaleArbeidsgiver.less';

const cls = BEMHelper('opprett-avtale-arbeidsgiver');

const OpprettAvtaleArbeidsgiver: FunctionComponent = () => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [mentorFnr, setMentorFnr] = useState('');
    const [uyldigAvtaletype, setUyldigAvtaletype] = useState(false);
    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>(undefined);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const navigate = useNavigate();

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
        let feilMentorFNR = '';

        if (!valgtTiltaksType) {
            valgtAvtaleType = true;
        }
        if (!validerFnr(deltakerFnr)) {
            feilDeltakerFNR = Feilmeldinger.UGYLDIG_FØDSELSNUMMER;
        }
        if (!validerOrgnr(valgtBedriftNr)) {
            feilBedriftNr = Feilmeldinger.UGYLDIG_VIRKSOMHETSNUMMER;
        }
        if (!validerMentorFnr()) {
            feilMentorFNR = Feilmeldinger.UGYLDIG_FØDSELSNUMMER;
        }

        if (feilBedriftNr.length === 0 && feilDeltakerFNR.length === 0 && valgtTiltaksType) {
            if (valgtTiltaksType === 'MENTOR') {
                if (deltakerFnr !== mentorFnr && feilMentorFNR.length === 0) {
                    const mentorAvtale = await opprettMentorAvtale(
                        deltakerFnr,
                        mentorFnr,
                        valgtBedriftNr,
                        valgtTiltaksType,
                        Avtalerolle.ARBEIDSGIVER
                    );
                    amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
                    navigate(pathTilOpprettAvtaleFullfortArbeidsgiver(mentorAvtale.id));
                    return;
                }
                return;
            }
            const avtale = await opprettAvtaleSomArbeidsgiver(deltakerFnr, valgtBedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet-arbeidsgiver', { tiltakstype: valgtTiltaksType });
            navigate({
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
                    <Heading size="medium">Før du oppretter en avtale</Heading>
                    <BodyShort size="small">
                        Er det første gang du skal opprette en avtale bør du lese gjennom {''}
                        <EksternLenke href={`${basename}${pathTilInformasjonssideInnlogget}`}>
                            introduksjon til hvordan løsningen fungerer {''}
                        </EksternLenke>
                        og vite om{' '}
                        <EksternLenke
                            onClick={() => amplitude.logEvent('#tiltak-arbeidsgiver-alle-tiltak-link-apnet')}
                            href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                        >
                            de ulike støtteordningene.
                        </EksternLenke>
                    </BodyShort>
                </Innholdsboks>
                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Heading size="medium" className={cls.element('innholdstittel')}>
                        Velg type avtale
                    </Heading>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">
                        Du kan kun opprette tiltaktstyper du har tilgang til i virksomheten du har valgt.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                    <div>
                        <RadioGroup legend="" className={cls.element('tiltakstype-wrapper')}>
                            {innloggetBruker.tilganger[valgtBedriftNr].map((tiltakType: TiltaksType, index: number) => (
                                <RadioPanel
                                    key={index}
                                    name="tiltakstype"
                                    value={tiltakType}
                                    checked={valgtTiltaksType === tiltakType}
                                    onChange={() => {
                                        setTiltaksType(tiltakType);
                                        setUyldigAvtaletype(false);
                                    }}
                                >
                                    {storForbokstav(tiltakstypeTekst[tiltakType])}
                                </RadioPanel>
                            ))}
                        </RadioGroup>
                    </div>
                    {uyldigAvtaletype && <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>}
                </Innholdsboks>
                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Heading size="medium" className={cls.element('innholdstittel')}>
                        Hvem skal inngå i avtalen
                    </Heading>
                    <VerticalSpacer rem={1} />
                    <Alert variant="info">
                        I feltet “Opprettes på bedrift” er det viktig at virksomhetsnummeret er det samme som der det
                        blir registrert inntekt for deltaker i A-meldingen.
                    </Alert>
                    <VerticalSpacer rem={1} />
                    <TextField
                        className="typo-element"
                        label="Deltakers fødselsnummer"
                        value={deltakerFnr}
                        width={'L'}
                        onChange={(event) => setFnrBrukerOnChange(event, setDeltakerFnr, setDeltakerFnrFeil)}
                        onBlur={validerDeltakerFnr}
                        error={deltakerFnrFeil}
                    />
                    <VerticalSpacer rem={1} />
                    <TextField
                        className="typo-element"
                        width={'L'}
                        label="Opprettes på bedrift"
                        description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                        value={`${valgtBedriftNavn} (${valgtBedriftNr})`}
                        disabled={true}
                    />
                    <VerticalSpacer rem={1} />
                    {valgtTiltaksType === 'MENTOR' && (
                        <>
                            <TextField
                                className="typo-element"
                                label="Mentors fødselsnummer"
                                value={mentorFnr}
                                width={'M'}
                                onChange={(event) => setFnrBrukerOnChange(event, setMentorFnr, setMentorFnrFeil)}
                                onBlur={validerMentorFnr}
                                error={mentorFnrFeil}
                            />
                            <BodyShort size="small">
                                Du kan kun opprette tiltaktstyper du har tilgang til i virksomheten du har valgt.
                            </BodyShort>
                            {uyldigAvtaletype && <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>}
                        </>
                    )}
                </Innholdsboks>

                <Alert variant="info">
                    <Label>Dette skjer etter at du har opprettet avtalen</Label>
                    <BodyShort size="small">
                        <ul>
                            <li>Du kan begynne å fylle ut avtalen.</li>
                            <li>
                                Avtalen blir tilgjengelig for veilederne på NAV kontoret til deltakeren. Når avtalen har
                                blitt fordelt til en veileder vil du se kontaktinformasjonen til denne veilederen inne i
                                avtalen.
                            </li>
                        </ul>
                    </BodyShort>
                </Alert>

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
