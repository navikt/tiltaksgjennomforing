import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import {Feature, FeatureToggleContext} from '@/FeatureToggleProvider';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import {pathTilOpprettAvtaleFullfortVeileder} from '@/paths';
import {hentBedriftBrreg, opprettAvtaleSomVeileder} from '@/services/rest-service';
import {TiltaksType} from '@/types/avtale';
import amplitude from '@/utils/amplitude';
import {handterFeil} from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import {validerFnr} from '@/utils/fnrUtils';
import {validerOrgnr} from '@/utils/orgnrUtils';
import {Input, RadioPanel} from 'nav-frontend-skjema';
import {Innholdstittel, Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import React, {ChangeEvent, FunctionComponent, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './OpprettAvtale.less';
import {FeilProviderContext} from "@/FeilProvider";
import FeilmeldingWrapper from "@/AvtaleSide/FeilmeldingWrapper/FeilmeldingWrapper";
import {Feilkode} from "@/types/feilkode";
import EksternLenke from "@/komponenter/navigation/EksternLenke";

const cls = BEMHelper('opprett-avtale');

const OpprettAvtaleVeileder: FunctionComponent = (props) => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [feilmeldinger, setFeilmeldinger] = useContext(FeilProviderContext);
    const [bedriftNr, setBedriftNr] = useState('');
    const [bedriftNavn, setBedriftNavn] = useState('');
    const history = useHistory();

    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(deltakerFnr, [
         (verdi) => {
            if (!verdi) {
                return 'Fødselsnummer er påkrevd';
            }
             setFeilmeldinger({feilkoder: new Set([])});
        },
        (verdi) => {
            if (!validerFnr(verdi)) {
                return 'Ugyldig fødselsnummer';
            }
            setFeilmeldinger({feilkoder: new Set([])});
        },
    ]);

    const [bedriftNrFeil, setBedriftNrFeil, validerBedriftNr] = useValidering(bedriftNr, [
        (verdi) => {
            if (!verdi) {
                return 'Bedriftsnummer er påkrevd';
            }
        },
        (verdi) => {
            if (!validerOrgnr(verdi)) {
                return 'Ugyldig bedriftsnummer';
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

    const opprettAvtaleKlikk = async () => {
        const mangel: Feilkode[] = [];
        if (!valgtTiltaksType) {
            mangel.push("UGYLDIG_AVTALETYPE");
        }
        if (!validerFnr(deltakerFnr)) {
            mangel.push("UGYLDIG_FØDSELSNUMMER");
        }
        if (!validerOrgnr(bedriftNr)) {
            mangel.push("UGYLDIG_BEDRIFTSNUMMER");
        }
        setFeilmeldinger({feilkoder:new Set(mangel)});
        if (feilmeldinger.feilkoder.size === 0 && valgtTiltaksType) {
            const avtale = await opprettAvtaleSomVeileder(deltakerFnr, bedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
            history.push(pathTilOpprettAvtaleFullfortVeileder(avtale.id));
        }
    };

    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>();

    const featureToggleContext = useContext(FeatureToggleContext);

    const mentorToggle = featureToggleContext[Feature.Mentor];

    const radiopaneler = (
        <Innholdsboks>
            <Systemtittel>Velg type avtale</Systemtittel>
            <Normaltekst>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                hvordan kan NAV hjelpe med inkludering
            </EksternLenke>
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <FeilmeldingWrapper feilkoder={["UGYLDIG_AVTALETYPE"]} feilmeldinger={feilmeldinger.feilkoder} >
            <div className={cls.element('tiltakstypeWrapper')}>
                <RadioPanel
                    name="tiltakstype"
                    label="Arbeidstrening"
                    value="ARBEIDSTRENING"
                    checked={valgtTiltaksType === 'ARBEIDSTRENING'}
                    onChange={() => setTiltaksType('ARBEIDSTRENING')}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Midlertidig lønnstilskudd"
                    value="MIDLERTIDIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'MIDLERTIDIG_LONNSTILSKUDD'}
                    onChange={() => setTiltaksType('MIDLERTIDIG_LONNSTILSKUDD')}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Varig lønnstilskudd"
                    value="VARIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'VARIG_LONNSTILSKUDD'}
                    onChange={() => setTiltaksType('VARIG_LONNSTILSKUDD')}
                />
                {mentorToggle && (
                    <RadioPanel
                        name="tiltakstype"
                        label="Mentor"
                        value="MENTOR"
                        checked={valgtTiltaksType === 'MENTOR'}
                        onChange={() => setTiltaksType('MENTOR')}
                    />
                )}
                <RadioPanel
                    name="tiltakstype"
                    label="Sommerjobb"
                    value="SOMMERJOBB"
                    checked={valgtTiltaksType === 'SOMMERJOBB'}
                    onChange={() => setTiltaksType('SOMMERJOBB')}
                />
            </div>
            </FeilmeldingWrapper>
        </Innholdsboks>
    );

    return (
        <div className="opprett-avtale">
            <Dokumenttittel tittel="Opprett avtale" />

            <VerticalSpacer rem={1} />
            <Innholdstittel style={{ textAlign: 'center' }}>Opprett avtale</Innholdstittel>
            <VerticalSpacer rem={2} />
            <Innholdsboks>
                <Systemtittel>Hvem skal inngå i avtalen?</Systemtittel>
                <VerticalSpacer rem={1} />
                        <FeilmeldingWrapper feilkoder={["SOMMERJOBB_FOR_GAMMEL","UGYLDIG_FØDSELSNUMMER"]} feilmeldinger={feilmeldinger.feilkoder} >
                        <Input
                            className="typo-element"
                            label="Deltakers fødselsnummer"
                            value={deltakerFnr}
                            onChange={fnrOnChange}
                            onBlur={validerDeltakerFnr}
                            feil={deltakerFnrFeil}
                        />
                        </FeilmeldingWrapper>
                <VerticalSpacer rem={2} />
                          <FeilmeldingWrapper feilkoder={["UGYLDIG_BEDRIFTSNUMMER"]} feilmeldinger={feilmeldinger.feilkoder}  >

                                <Input
                                    className="typo-element"
                                    label="Virksomhetsnummer"
                                    value={bedriftNr}
                                    onChange={orgnrOnChange}
                                    onBlur={orgnrOnBlur}
                                    feil={bedriftNrFeil}
                                />
                              <Normaltekst>
                                  Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen.
                              </Normaltekst>
                          </FeilmeldingWrapper>
                        {bedriftNavn && (
                            <Normaltekst className="opprett-avtale__bedriftNavn">{bedriftNavn}</Normaltekst>
                        )}
            </Innholdsboks>
            <VerticalSpacer rem={2} />
            {radiopaneler}
            <VerticalSpacer rem={2} />

            <div className={cls.element('knappRad')}>
                <LagreKnapp lagre={opprettAvtaleKlikk} feilmeldinger={feilmeldinger.feilkoder} setFeilmeldinger={setFeilmeldinger} label={'Opprett avtale'} className="opprett-avtale__knapp" />

                <TilbakeTilOversiktLenke />
            </div>
        </div>
    );
};

export default OpprettAvtaleVeileder;
