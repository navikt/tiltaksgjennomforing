import { Hovedknapp } from 'nav-frontend-knapper';
import React, { Component } from 'react';
import ApiError from '../../api-error';
import Varsel from '../Varsel/Varsel';
import './LagreKnapp.less';
import UfullstendigError from '../../ufullstendig-error';

interface State {
    suksessmelding: string;
    feilmelding: string;
    spinner: boolean;
}

interface Props {
    lagre: () => Promise<any>;
    className?: string;
    suksessmelding?: string;
    label: React.ReactNode;
}

class LagreKnapp extends Component<Props, State> {
    state = {
        suksessmelding: '',
        feilmelding: '',
        spinner: false,
    };

    lagreKnappOnClick = async () => {
        this.setState({ spinner: true });
        try {
            await this.props.lagre();
            this.visSuksessmelding();
        } catch (error) {
            if (
                error instanceof ApiError ||
                error instanceof UfullstendigError
            ) {
                this.visFeilmelding(error.message);
            } else {
                throw error;
            }
        } finally {
            this.fjernSpinner();
        }
    };

    visFeilmelding = (feilmelding: string) => {
        this.setState({ feilmelding });
    };

    visSuksessmelding = () => {
        if (this.props.suksessmelding) {
            this.setState({ suksessmelding: this.props.suksessmelding });
        }
    };

    fjernSuksessmelding = () => {
        this.setState({ suksessmelding: '' });
    };

    fjernFeilmelding = () => {
        this.setState({ feilmelding: '' });
    };

    fjernSpinner = () => {
        this.setState({ spinner: false });
    };

    render() {
        return (
            <>
                {this.state.suksessmelding && (
                    <Varsel
                        kanLukkes={false}
                        timeout={5000}
                        type={'suksess'}
                        onLukkVarsel={this.fjernSuksessmelding}
                        className={'lagreknapp__varsel'}
                    >
                        {this.state.suksessmelding}
                    </Varsel>
                )}
                {this.state.feilmelding && (
                    <Varsel
                        kanLukkes={true}
                        type={'advarsel'}
                        onLukkVarsel={this.fjernFeilmelding}
                        className={'lagreknapp__varsel'}
                    >
                        {this.state.feilmelding}
                    </Varsel>
                )}
                <Hovedknapp
                    htmlType="button"
                    onClick={this.lagreKnappOnClick}
                    className={this.props.className}
                    spinner={this.state.spinner}
                >
                    {this.props.label}
                </Hovedknapp>
            </>
        );
    }
}

export default LagreKnapp;
