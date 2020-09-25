import { ReactComponent as AvtaleSignering } from '@/assets/ikoner/avtaleSignering.svg';
import { ReactComponent as CheckCircleIkon } from '@/assets/ikoner/check-stroke.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '@/assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as NokkelPunktForAvtale } from '@/assets/ikoner/nokkelPunktForAvtale.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import useValidering from '@/komponenter/useValidering';
import { pathTilOpprettAvtaleFullfortVeileder } from '@/paths';
import { hentBedriftBrreg, opprettAvtale } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Input, RadioPanel } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { RouterProps, withRouter } from 'react-router';
import { ReactComponent as TilEkstern } from './ekstern-lenke.svg';
import './OpprettAvtale.less';

const cls = BEMHelper('opprett-avtale');

const OpprettAvtaleVeileder: FunctionComponent<RouterProps> = props => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [bedriftNr, setBedriftNr] = useState('');
    const [bedriftNavn, setBedriftNavn] = useState('');

    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(deltakerFnr, [
        verdi => {
            if (!verdi) {
                return { feilmelding: 'Fødselsnummer er påkrevd' };
            }
        },
        verdi => {
            if (!validerFnr(verdi)) {
                return { feilmelding: 'Ugyldig fødselsnummer' };
            }
        },
    ]);

    const [bedriftNrFeil, setBedriftNrFeil, validerBedriftNr] = useValidering(bedriftNr, [
        verdi => {
            if (!verdi) {
                return { feilmelding: 'Bedriftsnummer er påkrevd' };
            }
        },
        verdi => {
            if (!validerOrgnr(verdi)) {
                return {
                    feilmelding: 'Ugyldig bedriftsnummer',
                };
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
                .then(response => {
                    setBedriftNavn(response.bedriftNavn);
                    setBedriftNrFeil(undefined);
                })
                .catch(error => {
                    setBedriftNavn('');
                    setBedriftNrFeil({ feilmelding: error.message });
                });
        } else {
            setBedriftNavn('');
        }
    };

    const hvaMangler = () => {
        const feil = [];
        if (lonnstilskuddToggle && !valgtTiltaksType) {
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
            const avtale = await opprettAvtale(deltakerFnr, bedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet', { tiltakstype: valgtTiltaksType });
            props.history.push(pathTilOpprettAvtaleFullfortVeileder(avtale.id));
        } else {
            throw new UfullstendigError(hvaSomManglerTekst);
        }
    };

    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>();

    const featureToggleContext = useContext(FeatureToggleContext);

    const lonnstilskuddToggle = featureToggleContext[Feature.Lonnstilskudd];

    if (lonnstilskuddToggle === undefined) return null;

    const mentorToggle = featureToggleContext[Feature.Mentor];

    const tittel = lonnstilskuddToggle || mentorToggle ? 'Opprett avtale' : 'Opprett avtale om arbeidstrening';

    const enabledFeatureToggleRadioPanel = () => {
        if (!lonnstilskuddToggle && !mentorToggle) return null;

        return (
            <Innholdsboks className={cls.element('innholdsboks')}>
                <Systemtittel className={cls.element('innholdstittel')}>Velg type avtale</Systemtittel>
                <div className={cls.element('tiltakstypeWrapper')}>
                    <RadioPanel
                        name="tiltakstype"
                        label="Arbeidstrening"
                        value="ARBEIDSTRENING"
                        checked={valgtTiltaksType === 'ARBEIDSTRENING'}
                        onChange={() => setTiltaksType('ARBEIDSTRENING')}
                    />
                    {lonnstilskuddToggle && (
                        <>
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
                        </>
                    )}
                    {mentorToggle && (
                        <RadioPanel
                            name="tiltakstype"
                            label="Mentor"
                            value="MENTOR"
                            checked={valgtTiltaksType === 'MENTOR'}
                            onChange={() => setTiltaksType('MENTOR')}
                        />
                    )}
                </div>
            </Innholdsboks>
        );
    };

    return (
        <div className="opprett-avtale">
            <Innholdstittel className="opprett-avtale__tittel">{tittel}</Innholdstittel>
            {enabledFeatureToggleRadioPanel()}
            <Innholdsboks className={cls.element('innholdsboks')}>
                <Systemtittel className={cls.element('innholdstittel')}>Knytt avtalen til andre parter</Systemtittel>
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
            <Ekspanderbartpanel tittel="Slik fungerer løsningen" tittelProps="element" border={true}>
                <EkspanderbartPanelRad svgIkon={<AvtaleSignering />}>
                    Dette er en digital avtale om tiltak som skal brukes av deltaker, arbeidsgiver og veileder ved NAV.
                </EkspanderbartPanelRad>

                <EkspanderbartPanelRad svgIkon={<NokkelPunktForAvtale />}>
                    For at deltaker og arbeidsgiver skal få tilgang til avtaler må de logge seg inn via ID-porten.
                    Tilgang for arbeidsgiver styres gjennom Altinn. En representant for arbeidsgiver må gis følgende
                    tilganger til enkeltrettigheter for de ulike avtalene:
                    <ul>
                        <li>Avtale om arbeidstrening</li>
                        {lonnstilskuddToggle && <li>Avtale om midlertidig lønnstilskudd</li>}
                        {lonnstilskuddToggle && <li>Avtale om varig lønnstilskudd</li>}
                    </ul>
                    <p>
                        <Lenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/" target="_blank">
                            Finn mer informasjon om roller og rettigheter på Altinn.no
                            <TilEkstern className={cls.element('eksterntLenkeikon')} />
                        </Lenke>
                    </p>
                </EkspanderbartPanelRad>
                <EkspanderbartPanelRad svgIkon={<DrofteMedAnsattePersonOpplysning />}>
                    Deltaker, arbeidsgiver og veileder skal fylle ut avtalen sammen. Der blir de enige om innholdet i
                    avtalen.
                </EkspanderbartPanelRad>

                <EkspanderbartPanelRad svgIkon={<CheckCircleIkon />}>
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

export default withRouter(OpprettAvtaleVeileder);
