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

interface State {
    deltakerFnr: string;
    arbeidsgiverFnr: string;
    deltakerFeilmelding: string;
    arbeidsgiverFeilmelding: string;
}

const FNR_FEILMELDING = 'Det kreves 11 siffer i et fødselsnummer';

class OpprettAvtale extends React.Component<Context & RouterProps, State> {
    state: State = {
        deltakerFnr: '',
        arbeidsgiverFnr: '',
        deltakerFeilmelding: '',
        arbeidsgiverFeilmelding: '',
    };

    endredeltakerFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;
        const inneholderBareTall = fnr.match(/^[0-9]+$/);
        if (fnr.length <= 11 && inneholderBareTall) {
            this.setState({ deltakerFnr: fnr });
        }
    };

    endreArbeidsgiverFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;
        const inneholderBareTall = fnr.match(/^[0-9]+$/);
        if (fnr.length <= 11 && inneholderBareTall) {
            this.setState({ arbeidsgiverFnr: fnr });
        }
    };

    onKlikkUtAvDeltakerInput = () => {
        if (this.state.deltakerFnr.length !== 11) {
            this.setState({ deltakerFeilmelding: FNR_FEILMELDING });
        } else {
            this.setState({ deltakerFeilmelding: '' });
        }
    };

    onKlikkUtAvArbeidsgiverInput = () => {
        if (this.state.arbeidsgiverFnr.length !== 11) {
            this.setState({ arbeidsgiverFeilmelding: FNR_FEILMELDING });
        } else {
            this.setState({ arbeidsgiverFeilmelding: '' });
        }
    };

    opprettAvtaleKlikk = () => {
        if (
            this.state.deltakerFnr.length === 11 &&
            this.state.arbeidsgiverFnr.length === 11
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
                        feil={
                            this.state.deltakerFeilmelding.length > 0
                                ? {
                                      feilmelding: this.state
                                          .deltakerFeilmelding,
                                  }
                                : undefined
                        }
                        onBlur={this.onKlikkUtAvDeltakerInput}
                    />
                    <Input
                        label={<Element>Arbeidsgivers fødselsnummer</Element>}
                        value={this.state.arbeidsgiverFnr}
                        onChange={this.endreArbeidsgiverFnr}
                        className="opprett-avtale__arbeidsgiver-fnr"
                        feil={
                            this.state.arbeidsgiverFeilmelding.length > 0
                                ? {
                                      feilmelding: this.state
                                          .arbeidsgiverFeilmelding,
                                  }
                                : undefined
                        }
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
