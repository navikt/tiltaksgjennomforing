import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import './OpprettAvtale.less';
import { Context, medContext } from '../AvtaleContext';
import { RouterProps } from 'react-router';
import { pathTilOpprettetAvtaleBekreftelse } from '../paths';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import utklippstavleIkon from './utklippstavle.svg';
import { erGyldigFnr } from '../utils/fnrUtils';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import FnrInput from '../komponenter/FnrInput/FnrInput';

interface State {
    deltakerFnr: string;
    arbeidsgiverFnr: string;
    deltakerFnrFeil?: SkjemaelementFeil;
    arbeidsgiverFnrFeil?: SkjemaelementFeil;
}

const FNR_FEILMELDING = 'Ugyldig fødselsnummer';

class OpprettAvtale extends React.Component<Context & RouterProps, State> {
    state: State = {
        deltakerFnr: '',
        arbeidsgiverFnr: '',
    };

    endreDeltakerFnr = (fnr: string) => {
        this.setState({ deltakerFnr: fnr });
    };

    endreArbeidsgiverFnr = (fnr: string) => {
        this.setState({ arbeidsgiverFnr: fnr });
    };

    opprettAvtaleKlikk = () => {
        if (
            erGyldigFnr(this.state.deltakerFnr) &&
            erGyldigFnr(this.state.arbeidsgiverFnr)
        ) {
            this.props
                .opprettAvtale(
                    this.state.deltakerFnr,
                    this.state.arbeidsgiverFnr
                )
                .then(() => {
                    this.props.history.push(pathTilOpprettetAvtaleBekreftelse);
                });
        }
    };

    render() {
        const veilederpanel = (
            <Veilederpanel
                svg={<img src={utklippstavleIkon} />}
                kompakt={true}
                type="plakat"
            >
                <Normaltekst className="opprett-avtale__du-trenger-tekst">
                    Du trenger:
                </Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>kandidatens fødselsnummer</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            fødselsnummeret til personen hos bedriften som skal
                            fylle ut avtalen
                        </Normaltekst>
                    </li>
                </ul>
            </Veilederpanel>
        );

        const ekspanderbartpanel = (
            <Ekspanderbartpanel
                tittel="Sånn fungerer det"
                tittelProps="element"
                border={true}
            >
                TODO: Her kommer det noe forklarender tekst med ikoner på siden.
            </Ekspanderbartpanel>
        );

        const inputFelter = (
            <div className="opprett-avtale__input-wrapper">
                <FnrInput
                    className="opprett-avtale__kandidat-fnr"
                    label={<Element>Kandidatens fødselsnummer</Element>}
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
        );

        return (
            <div className="opprett-avtale">
                <Innholdstittel className="opprett-avtale__tittel">
                    Opprett avtale om arbeidstrening
                </Innholdstittel>
                {veilederpanel}
                {ekspanderbartpanel}
                {inputFelter}
                <Hovedknapp
                    onClick={this.opprettAvtaleKlikk}
                    className="opprett-avtale__knapp"
                >
                    OPPRETT AVTALE
                </Hovedknapp>
            </div>
        );
    }
}

export default medContext(OpprettAvtale);
