import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KnappBase from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { RouterProps } from 'react-router';
import RestService from '.././services/rest-service';
import ApiError from '../api-error';
import { ReactComponent as AvtaleSignering } from '../assets/ikoner/avtaleSignering.svg';
import { ReactComponent as CheckCircleIkon } from '../assets/ikoner/check-circle.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '../assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as NokkelPunktForAvtale } from '../assets/ikoner/nokkelPunktForAvtale.svg';
import { Context, medContext } from '../AvtaleContext';
import EkstbanderbartPanelRad from '../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import FnrInput from '../komponenter/FnrInput/FnrInput';
import LagreKnapp from '../komponenter/LagreKnapp/LagreKnapp';
import PakrevdInput from '../komponenter/PakrevdInput/PakrevdInput';
import VeilederpanelMedUtklippstavleIkon from '../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { pathTilOpprettetAvtaleBekreftelse, pathTilOversikt } from '../paths';
import BEMHelper from '../utils/bem';
import { erGyldigFnr } from '../utils/fnrUtils';
import { validerOrgnr } from '../utils/orgnrUtils';
import './OpprettAvtale.less';

const cls = BEMHelper('opprett-avtale');

interface State {
    deltakerFnr: string;
    bedriftNr: string;
    deltakerFnrFeil?: SkjemaelementFeil;
    bedriftNrFeil?: string;
    bedriftNavn: string;
}

const FNR_FEILMELDING = 'Ugyldig fødselsnummer';

class OpprettAvtale extends React.Component<Context & RouterProps, State> {
    state: State = {
        deltakerFnr: '',
        bedriftNr: '',
        bedriftNavn: '',
    };

    endreDeltakerFnr = (fnr: string) => {
        this.setState({ deltakerFnr: fnr });
    };

    endreArbeidsgiverFnr = (bedriftnr: string) => {
        this.setState({ bedriftNr: bedriftnr });
    };

    orgnrOnChange = (event: any) => {
        const bedriftNr = event.target.value.replace(/\s/g, '');

        if (!bedriftNr) {
            // Tomt
            this.setState({ bedriftNrFeil: undefined, bedriftNavn: '' });
        } else if (validerOrgnr(bedriftNr)) {
            // Gyldig
            RestService.hentBedriftBrreg(bedriftNr)
                .then(response => {
                    this.setState({
                        bedriftNavn: response.bedriftNavn,
                        bedriftNrFeil: undefined,
                    });
                })
                .catch(error => {
                    this.setState({ bedriftNrFeil: error.message });
                });
        } else {
            // Ikke gyldig
            this.setState({
                bedriftNrFeil: 'Ugyldig bedriftsnummer',
                bedriftNavn: '',
            });
        }
        this.setState({ bedriftNr });
    };

    hvaMangler = () => {
        if (
            !erGyldigFnr(this.state.deltakerFnr) &&
            !validerOrgnr(this.state.bedriftNr)
        ) {
            return 'Må oppgi gyldig fødselsnummer for deltaker og gyldig bedriftsnummer';
        } else if (
            erGyldigFnr(this.state.deltakerFnr) &&
            !validerOrgnr(this.state.bedriftNr)
        ) {
            return 'Må oppgi gyldig bedriftsnummer';
        } else if (
            validerOrgnr(this.state.bedriftNr) &&
            !erGyldigFnr(this.state.deltakerFnr)
        ) {
            return 'Må oppgi gyldig fødselsnummer for deltaker';
        }
    };

    opprettAvtaleKlikk = () => {
        if (
            erGyldigFnr(this.state.deltakerFnr) &&
            validerOrgnr(this.state.bedriftNr)
        ) {
            return this.props
                .opprettAvtale(this.state.deltakerFnr, this.state.bedriftNr)
                .then(() => {
                    this.props.history.push(
                        pathTilOpprettetAvtaleBekreftelse(this.props.avtale.id)
                    );
                });
        } else {
            throw new ApiError(this.hvaMangler());
        }
    };

    render() {
        const veilederpanel = (
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
        );

        const ekspanderbartpanel = (
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
        );

        const inputFelter = (
            <>
                <div className="opprett-avtale__input-wrapper">
                    <div className="opprett-avtale__kandidat-fnr">
                        <FnrInput
                            className="typo-element"
                            label="Deltakers fødselsnummer"
                            verdi={this.state.deltakerFnr}
                            feilmelding={FNR_FEILMELDING}
                            onChange={this.endreDeltakerFnr}
                        />
                    </div>

                    <div className="opprett-avtale__arbeidsgiver-bedriftNr">
                        <PakrevdInput
                            className="typo-element"
                            label="Bedriftsnummer"
                            verdi={this.state.bedriftNr}
                            onChange={this.orgnrOnChange}
                            feilmelding={this.state.bedriftNrFeil}
                        />
                        {this.state.bedriftNavn && (
                            <Normaltekst className="opprett-avtale__bedriftNavnBrreg">
                                {this.state.bedriftNavn}
                            </Normaltekst>
                        )}
                    </div>
                </div>
            </>
        );

        return (
            <div className="opprett-avtale">
                <Innholdstittel className="opprett-avtale__tittel">
                    Opprett avtale om arbeidstrening
                </Innholdstittel>
                {veilederpanel}
                {ekspanderbartpanel}
                {inputFelter}
                <div className={cls.element('knappRad')}>
                    <LagreKnapp
                        lagre={this.opprettAvtaleKlikk}
                        label={'Opprett avtale'}
                        className="opprett-avtale__knapp"
                    />

                    <KnappBase
                        type={'flat'}
                        className={cls.element('avbryt')}
                        onClick={() => {
                            this.props.history.push(pathTilOversikt);
                        }}
                    >
                        avbryt
                    </KnappBase>
                </div>
            </div>
        );
    }
}

export default medContext<RouterProps>(OpprettAvtale);
