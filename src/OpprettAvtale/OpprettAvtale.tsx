import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import './OpprettAvtale.less';
import { Context, medContext } from '../AvtaleContext';
import { RouterProps } from 'react-router';
import { pathTilOpprettetAvtaleBekreftelse } from '../paths';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import utklippstavleIkon from './utklippstavle.svg';
import { erGyldigFnr, midlertidigGyldigFnr } from '../utils/fnrUtils';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

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
        deltakerFnrFeil: undefined,
        arbeidsgiverFnrFeil: undefined,
    };

    endredeltakerFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;
        if (midlertidigGyldigFnr(fnr)) {
            this.setState({ deltakerFnr: fnr });
        }
    };

    endreArbeidsgiverFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;
        if (midlertidigGyldigFnr(fnr)) {
            this.setState({ arbeidsgiverFnr: fnr });
        }
    };

    onKlikkUtAvDeltakerInput = () => {
        if (erGyldigFnr(this.state.deltakerFnr)) {
            this.setState({ deltakerFnrFeil: undefined });
        } else {
            this.setState({
                deltakerFnrFeil: { feilmelding: FNR_FEILMELDING },
            });
        }
    };

    onKlikkUtAvArbeidsgiverInput = () => {
        if (erGyldigFnr(this.state.arbeidsgiverFnr)) {
            this.setState({ arbeidsgiverFnrFeil: undefined });
        } else {
            this.setState({
                arbeidsgiverFnrFeil: { feilmelding: FNR_FEILMELDING },
            });
        }
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
        return (
            <div className="opprett-avtale">
                <Innholdstittel className="opprett-avtale__tittel">
                    Opprett avtale om arbeidstrening
                </Innholdstittel>
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
                                fødselsnummeret til personen hos bedriften som
                                skal fylle ut avtalen
                            </Normaltekst>
                        </li>
                    </ul>
                </Veilederpanel>
                <Ekspanderbartpanel
                    tittel="Sånn fungerer det"
                    tittelProps="element"
                    border={true}
                >
                    TODO: Her kommer det noe forklarender tekst med ikoner på
                    siden.
                </Ekspanderbartpanel>

                <div className="opprett-avtale__input-wrapper">
                    <Input
                        label={<Element>Kandidatens fødselsnummer</Element>}
                        value={this.state.deltakerFnr}
                        onChange={this.endredeltakerFnr}
                        className="opprett-avtale__kandidat-fnr"
                        feil={this.state.deltakerFnrFeil}
                        onBlur={this.onKlikkUtAvDeltakerInput}
                    />
                    <Input
                        label={<Element>Arbeidsgivers fødselsnummer</Element>}
                        value={this.state.arbeidsgiverFnr}
                        onChange={this.endreArbeidsgiverFnr}
                        className="opprett-avtale__arbeidsgiver-fnr"
                        feil={this.state.arbeidsgiverFnrFeil}
                        onBlur={this.onKlikkUtAvArbeidsgiverInput}
                    />
                </div>
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
