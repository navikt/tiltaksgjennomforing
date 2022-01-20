import { ReactComponent as AltinnIkon } from '@/assets/ikoner/altinn.svg';
import { ReactComponent as AvtaleparterIkon } from '@/assets/ikoner/avtaleparter.svg';
import { ReactComponent as CheckCircleIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as MobilIkon } from '@/assets/ikoner/digitalAvtale.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import { pathTilOpprettAvtaleFullfortVeileder } from '@/paths';
import { hentBedriftBrreg, opprettAvtaleSomVeileder } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import amplitude from '@/utils/amplitude';
import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Input, RadioPanel } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as TilEkstern } from './ekstern-lenke.svg';
import './OpprettAvtale.less';
import MedFeilmeldingHocWrapper from "@/AvtaleSide/FeilmeldingHocWrapper/MedFeilmeldingHocWrapper";

const cls = BEMHelper('opprett-avtale');

interface Props{
    feilmelding: string;
}


const OpprettAvtaleVeileder: FunctionComponent = (props) => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
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

    const hvaMangler = () => {
        const feil = [];
        if (!valgtTiltaksType) {
            feil.push('avtaletype');
        }
        if (!validerFnr(deltakerFnr)) {
            feil.push('gyldig fødselsnummer for deltaker');
        }
        if (!validerOrgnr(bedriftNr)) {
            feil.push('gyldig bedriftsnummer');
        }
        if (feil.length) {
            return 'Du må oppgi: ' + feil.join(', ');
        } else {
            return '';
        }
    };

    const opprettAvtaleKlikk = async () => {
        const hvaSomManglerTekst = hvaMangler();
        if (!hvaSomManglerTekst && valgtTiltaksType) {
            const avtale = await opprettAvtaleSomVeileder(deltakerFnr, bedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
            history.push(pathTilOpprettAvtaleFullfortVeileder(avtale.id));
        } else {
            throw new UfullstendigError(hvaSomManglerTekst);
        }
    };

    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>();

    const featureToggleContext = useContext(FeatureToggleContext);

    const mentorToggle = featureToggleContext[Feature.Mentor];


        const test: React.FC<Props> = ({feilmelding}) => (
            <Input
                className="typo-element"
                label="Deltakers fødselsnummer"
                value={deltakerFnr}
                onChange={fnrOnChange}
                onBlur={validerDeltakerFnr}
                feil={deltakerFnrFeil}
            />
        );

    const radiopaneler = (
        <Innholdsboks>
            <Systemtittel>Velg type avtale</Systemtittel>
            <VerticalSpacer rem={1} />
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
        </Innholdsboks>
    );

    return (
        <div className="opprett-avtale">
            <Dokumenttittel tittel="Opprett avtale" />

            <VerticalSpacer rem={1} />
            <Innholdstittel style={{ textAlign: 'center' }}>Opprett avtale</Innholdstittel>
            <VerticalSpacer rem={2} />
            {radiopaneler}
            <VerticalSpacer rem={2} />
            <Innholdsboks>

                {MedFeilmeldingHocWrapper(test)}
                <Systemtittel>Knytt avtalen til andre parter</Systemtittel>
                <VerticalSpacer rem={1} />
                <div className="opprett-avtale__input-wrapper">
                    <div className="opprett-avtale__kandidat-fnr">

                            <Input
                                className="typo-element"
                                label="Deltakers fødselsnummer"
                                value={deltakerFnr}
                                onChange={fnrOnChange}
                                onBlur={validerDeltakerFnr}
                                feil={deltakerFnrFeil}
                            />

                    </div>

                    <div className="opprett-avtale__arbeidsgiver-bedriftNr">
                        <Input
                            className="typo-element"
                            label="Bedriftsnummer"
                            value={bedriftNr}
                            onChange={orgnrOnChange}
                            onBlur={orgnrOnBlur}
                            feil={bedriftNrFeil}
                        />
                        {bedriftNavn && (
                            <Normaltekst className="opprett-avtale__bedriftNavn">{bedriftNavn}</Normaltekst>
                        )}
                    </div>
                </div>
            </Innholdsboks>
            <VerticalSpacer rem={2} />
            <Ekspanderbartpanel tittel={<Element>Slik fungerer løsningen</Element>} border={true}>
                <EkspanderbartPanelRad svgIkon={<MobilIkon />} headerTekst={{ tekst: 'Digital avtale' }}>
                    Dette er en digital avtale om tiltak som skal brukes av deltaker, arbeidsgiver og veileder ved NAV.
                </EkspanderbartPanelRad>

                <EkspanderbartPanelRad svgIkon={<AltinnIkon />} headerTekst={{ tekst: 'Tilgang gjennom Altinn' }}>
                    For at deltaker og arbeidsgiver skal få tilgang til avtaler må de logge seg inn via ID-porten.
                    Tilgang for arbeidsgiver styres gjennom Altinn. En representant for arbeidsgiver må gis følgende
                    tilganger til enkeltrettigheter for de ulike avtalene:
                    <ul>
                        <li>Avtale om arbeidstrening</li>
                        <li>Avtale om midlertidig lønnstilskudd</li>
                        <li>Avtale om varig lønnstilskudd</li>
                    </ul>
                    <p>
                        <Lenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/" target="_blank">
                            Finn mer informasjon om roller og rettigheter på Altinn.no
                            <TilEkstern className={cls.element('eksterntLenkeikon')} />
                        </Lenke>
                    </p>
                </EkspanderbartPanelRad>
                <EkspanderbartPanelRad
                    svgIkon={<AvtaleparterIkon width="50" height="50" />}
                    headerTekst={{ tekst: 'Tre parter' }}
                >
                    Deltaker, arbeidsgiver og veileder skal fylle ut avtalen sammen. Der blir de enige om innholdet i
                    avtalen.
                </EkspanderbartPanelRad>

                <EkspanderbartPanelRad
                    svgIkon={<CheckCircleIkon width="50" height="50" />}
                    headerTekst={{ tekst: 'Godkjenning' }}
                >
                    Til slutt må deltaker, arbeidsgiver og veileder godkjenne avtalen slik at tiltaket kan starte.
                </EkspanderbartPanelRad>
            </Ekspanderbartpanel>
            <div className={cls.element('knappRad')}>
                <LagreKnapp lagre={opprettAvtaleKlikk} label={'Opprett avtale'} className="opprett-avtale__knapp" />

                <TilbakeTilOversiktLenke />
            </div>
        </div>
    );
};

export default OpprettAvtaleVeileder;
