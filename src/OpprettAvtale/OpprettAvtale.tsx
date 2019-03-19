import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import {
    Element,
    Innholdstittel,
    Normaltekst,
    Ingress,
} from 'nav-frontend-typografi';
import React from 'react';
import { RouterProps } from 'react-router';
import ApiError from '../api-error';
import { Context, medContext } from '../AvtaleContext';
import FnrInput from '../komponenter/FnrInput/FnrInput';
import LagreKnapp from '../komponenter/LagreKnapp/LagreKnapp';
import VeilederpanelMedUtklippstavleIkon from '../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { pathTilOpprettetAvtaleBekreftelse } from '../paths';
import { erGyldigFnr } from '../utils/fnrUtils';
import './OpprettAvtale.less';
import PakrevdInput from '../komponenter/PakrevdInput/PakrevdInput';
import EkstbanderbartPanelRad from '../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import { ReactComponent as NokkelPunktForAvtale } from '../assets/ikoner/nokkelPunktForAvtale.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '../assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as CheckCircleIkon } from '../assets/ikoner/check-circle.svg';
import { ReactComponent as AvtaleSignering } from '../assets/ikoner/avtaleSignering.svg';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../utils/bem';
import KnappBase from 'nav-frontend-knapper';

const cls = BEMHelper('opprett-avtale');

interface State {
    deltakerFnr: string;
    arbeidsgiverFnr: string;
    bedriftNavn: string;
    deltakerFnrFeil?: SkjemaelementFeil;
    arbeidsgiverFnrFeil?: SkjemaelementFeil;
}

const FNR_FEILMELDING = 'Ugyldig fødselsnummer';

class OpprettAvtale extends React.Component<Context & RouterProps, State> {
    state: State = {
        deltakerFnr: '',
        arbeidsgiverFnr: '',
        bedriftNavn: '',
    };

    endreDeltakerFnr = (fnr: string) => {
        this.setState({ deltakerFnr: fnr });
    };

    endreArbeidsgiverFnr = (fnr: string) => {
        this.setState({ arbeidsgiverFnr: fnr });
    };

    endreBedriftNavn = (bedriftNavn: string) => {
        this.setState({ bedriftNavn });
    };

    hvaMangler = () => {
        if (
            !(
                erGyldigFnr(this.state.deltakerFnr) &&
                erGyldigFnr(this.state.arbeidsgiverFnr)
            ) &&
            !this.state.bedriftNavn
        ) {
            return 'Må oppgi gyldig fødselsnummer for deltaker og arbeidsgiver og navn på bedriften';
        } else if (
            !(
                erGyldigFnr(this.state.deltakerFnr) &&
                erGyldigFnr(this.state.arbeidsgiverFnr)
            ) &&
            this.state.bedriftNavn
        ) {
            return 'Må oppgi gyldig fødselsnummer for deltaker og arbeidsgiver';
        } else if (
            erGyldigFnr(this.state.deltakerFnr) &&
            erGyldigFnr(this.state.arbeidsgiverFnr) &&
            !this.state.bedriftNavn
        ) {
            return 'Må oppgi navn på bedriften';
        }
    };

    opprettAvtaleKlikk = () => {
        if (
            erGyldigFnr(this.state.deltakerFnr) &&
            erGyldigFnr(this.state.arbeidsgiverFnr) &&
            this.state.bedriftNavn
        ) {
            return this.props
                .opprettAvtale(
                    this.state.deltakerFnr,
                    this.state.arbeidsgiverFnr,
                    this.state.bedriftNavn
                )
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
                        <Normaltekst>
                            Fødselsnummeret til personen hos bedriften som skal
                            fylle ut avtalen
                        </Normaltekst>
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
                    brukes av deltaker, arbeidsgiver og NAV sin veileder.
                </EkstbanderbartPanelRad>

                <EkstbanderbartPanelRad svgIkon={<NokkelPunktForAvtale />}>
                    For at avtalen skal kunne opprettes, må avtalens parter bli
                    knyttet sammen med gyldige, unike identifikasjoner:
                    fødselsnummer. På sikt kan alle bruke Altinn til å logge
                    inn, men enn så lenge må partene i avtalen utveksle sitt
                    fødselsnummer.
                </EkstbanderbartPanelRad>
                <EkstbanderbartPanelRad
                    svgIkon={<DrofteMedAnsattePersonOpplysning />}
                >
                    Deltaker, arbeidsgiver og veileder skal sammen fylle ut
                    avtalen og blant annet bli enige om mål, arbeidsoppgaver og
                    oppfølging.
                </EkstbanderbartPanelRad>

                <EkstbanderbartPanelRad svgIkon={<CheckCircleIkon />}>
                    Til slutt skal både deltaker, arbeidsgiver og veileder
                    godkjenne avtalen slik at arbeidstreningen kan starte.
                </EkstbanderbartPanelRad>
            </Ekspanderbartpanel>
        );

        const inputFelter = (
            <>
                <div className="opprett-avtale__input-wrapper">
                    <FnrInput
                        className="opprett-avtale__kandidat-fnr"
                        label={<Element>Deltakers fødselsnummer</Element>}
                        verdi={this.state.deltakerFnr}
                        feilmelding={FNR_FEILMELDING}
                        onChange={this.endreDeltakerFnr}
                    />
                    <FnrInput
                        className="opprett-avtale__arbeidsgiver-fnr"
                        label={<Element>Arbeidsgivers fødselsnummer</Element>}
                        verdi={this.state.arbeidsgiverFnr}
                        feilmelding={FNR_FEILMELDING}
                        onChange={this.endreArbeidsgiverFnr}
                    />
                </div>

                <div className="opprett-avtale__input-wrapper-rad2">
                    <PakrevdInput
                        className="opprett-avtale__arbeidsgiver-bedriftNavn typo-element"
                        label="Bedriftens navn"
                        verdi={this.state.bedriftNavn}
                        onChange={event =>
                            this.endreBedriftNavn(event.currentTarget.value)
                        }
                    />
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
                            window.location.href =
                                '/tiltaksgjennomforing/logout';
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
