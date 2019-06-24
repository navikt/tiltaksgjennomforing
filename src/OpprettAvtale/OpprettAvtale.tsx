import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Flatknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Input } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { RouterProps } from 'react-router';
import RestService from '.././services/rest-service';
import ApiError from '../api-error';
import { ReactComponent as AvtaleSignering } from '../assets/ikoner/avtaleSignering.svg';
import { ReactComponent as CheckCircleIkon } from '../assets/ikoner/check-circle.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '../assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as NokkelPunktForAvtale } from '../assets/ikoner/nokkelPunktForAvtale.svg';
import { Context, medContext } from '../AvtaleContext';
import EkstbanderbartPanelRad from '../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import LagreKnapp from '../komponenter/LagreKnapp/LagreKnapp';
import useValidering from '../komponenter/useValidering';
import VeilederpanelMedUtklippstavleIkon from '../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { pathTilOpprettetAvtaleBekreftelse, pathTilOversikt } from '../paths';
import BEMHelper from '../utils/bem';
import { validerFnr } from '../utils/fnrUtils';
import { validerOrgnr } from '../utils/orgnrUtils';
import './OpprettAvtale.less';

const cls = BEMHelper('opprett-avtale');

const OpprettAvtale: FunctionComponent<Context & RouterProps> = props => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [bedriftNr, setBedriftNr] = useState('');
    const [bedriftNavn, setBedriftNavn] = useState('');

    const [
        deltakerFnrFeil,
        setDeltakerFnrFeil,
        validerDeltakerFnr,
    ] = useValidering(deltakerFnr, [
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

    const [bedriftNrFeil, setBedriftNrFeil, validerBedriftNr] = useValidering(
        bedriftNr,
        [
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
        ]
    );

    const fnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value;
        if (/^\d{0,11}$/.test(verdi)) {
            setDeltakerFnr(verdi);
            setDeltakerFnrFeil(undefined);
        }
    };

    const orgnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value;
        if (/^\d{0,9}$/.test(verdi)) {
            setBedriftNr(verdi);
            setBedriftNrFeil(undefined);
        }
    };

    const orgnrOnBlur = () => {
        if (validerBedriftNr()) {
            RestService.hentBedriftBrreg(bedriftNr)
                .then(response => {
                    setBedriftNavn(response.bedriftNavn);
                    setBedriftNrFeil(undefined);
                })
                .catch(error => {
                    setBedriftNavn('');
                    setBedriftNrFeil({ feilmelding: error.message });
                });
        }
    };

    const hvaMangler = () => {
        let feil = [];
        if (!validerFnr(deltakerFnr)) {
            feil.push('gyldig fødselsnummer for deltaker');
        }
        if (!validerOrgnr(bedriftNr)) {
            feil.push('gyldig bedriftsnummer');
        }
        if (feil.length) {
            return 'Må oppgi ' + feil.join(' og ');
        } else {
            return '';
        }
    };

    const opprettAvtaleKlikk = () => {
        const hvaSomManglerTekst = hvaMangler();
        if (!hvaSomManglerTekst) {
            return props.opprettAvtale(deltakerFnr, bedriftNr).then(() => {
                props.history.push(
                    pathTilOpprettetAvtaleBekreftelse(props.avtale.id)
                );
            });
        } else {
            throw new ApiError(hvaSomManglerTekst);
        }
    };

    return (
        <div className="opprett-avtale">
            <Innholdstittel className="opprett-avtale__tittel">
                Opprett avtale om arbeidstrening
            </Innholdstittel>

            <VeilederpanelMedUtklippstavleIkon>
                <Element className="opprett-avtale__du-trenger-tekst">
                    Du trenger:
                </Element>
                <ul>
                    <li>
                        <Normaltekst>Deltakers fødselsnummer</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>Arbeidsgivers bedriftsnummer</Normaltekst>
                    </li>
                </ul>
            </VeilederpanelMedUtklippstavleIkon>

            <Ekspanderbartpanel
                tittel="Sånn fungerer det"
                tittelProps="element"
                border={true}
            >
                <EkstbanderbartPanelRad svgIkon={<AvtaleSignering />}>
                    Dette er en digital avtale for arbeidstrening som skal
                    brukes av deltaker, arbeidsgiver og veileder ved NAV.
                </EkstbanderbartPanelRad>

                <EkstbanderbartPanelRad svgIkon={<NokkelPunktForAvtale />}>
                    For at deltaker og arbeidsgiver skal få tilgang til avtalen
                    må de logge seg inn via ID-porten. Tilgang for arbeidsgiver
                    styres gjennom Altinn. For at en arbeidsgiver kan
                    representere en bedrift må personen ha rollen{' '}
                    <em>Helse-, sosial- og velferdstjenester</em> eller gis
                    tilgang til enkelttjenesten{' '}
                    <em>Avtale om arbeidstrening</em>. Mer informasjon om roller
                    og rettigheter finnes hos{' '}
                    <Lenke
                        href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/"
                        target="_blank"
                    >
                        Altinn
                    </Lenke>
                    .
                </EkstbanderbartPanelRad>
                <EkstbanderbartPanelRad
                    svgIkon={<DrofteMedAnsattePersonOpplysning />}
                >
                    Deltaker, arbeidsgiver og veileder skal sammen fylle ut
                    avtalen og blant annet bli enige om mål, arbeidsoppgaver og
                    oppfølging.
                </EkstbanderbartPanelRad>

                <EkstbanderbartPanelRad svgIkon={<CheckCircleIkon />}>
                    Til slutt må både deltaker, arbeidsgiver og veileder
                    godkjenne avtalen slik at arbeidstreningen kan starte.
                </EkstbanderbartPanelRad>
            </Ekspanderbartpanel>

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
                        <Normaltekst className="opprett-avtale__bedriftNavnBrreg">
                            {bedriftNavn}
                        </Normaltekst>
                    )}
                </div>
            </div>
            <div className={cls.element('knappRad')}>
                <LagreKnapp
                    lagre={opprettAvtaleKlikk}
                    label={'Opprett avtale'}
                    className="opprett-avtale__knapp"
                />

                <Flatknapp
                    className={cls.element('avbryt')}
                    onClick={() => {
                        props.history.push(pathTilOversikt);
                    }}
                >
                    Avbryt
                </Flatknapp>
            </div>
        </div>
    );
};

export default medContext<RouterProps>(OpprettAvtale);
