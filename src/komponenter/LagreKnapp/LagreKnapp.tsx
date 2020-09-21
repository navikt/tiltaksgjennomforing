import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { ApiError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import React, { Component } from 'react';
import './LagreKnapp.less';

interface State {
    suksessmelding: string;
    feilmelding: string;
    spinner: boolean;
    isMounted: boolean;
}

interface Props {
    lagre: () => Promise<any>;
    className?: string;
    suksessmelding?: string;
    label: React.ReactNode;
    knapptype?: typeof KnappBase.defaultProps.type;
}

class LagreKnapp extends Component<Props, State> {
    state = {
        suksessmelding: '',
        feilmelding: '',
        spinner: false,
        isMounted: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    componentWillUnmount() {
        // eslint-disable-next-line
        this.state.isMounted = false;
    }

    lagreKnappOnClick = async () => {
        this.enableSpinner(true);
        try {
            await this.props.lagre();
            this.visSuksessmelding();
        } catch (error) {
            if (error instanceof FeilkodeError) {
                this.visFeilmelding(Feilmeldinger[error.message as Feilkode]);
            } else if (error instanceof ApiError || error instanceof UfullstendigError) {
                this.visFeilmelding(error.message);
            } else {
                this.visFeilmelding('Det har skjedd en uventet feil');
                throw error;
            }
        } finally {
            if (this.state.isMounted) {
                this.enableSpinner(false);
            }
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

    enableSpinner = (state: boolean) => {
        this.setState({ spinner: state });
    };

    render() {
        return (
            <>
                {this.state.suksessmelding && (
                    <VarselKomponent
                        kanLukkes={false}
                        timeout={5000}
                        type={'suksess'}
                        onLukkVarsel={this.fjernSuksessmelding}
                        className={'lagreknapp__varsel'}
                    >
                        {this.state.suksessmelding}
                    </VarselKomponent>
                )}
                {this.state.feilmelding && (
                    <VarselKomponent
                        kanLukkes={true}
                        type={'advarsel'}
                        onLukkVarsel={this.fjernFeilmelding}
                        className={'lagreknapp__varsel'}
                    >
                        {this.state.feilmelding}
                    </VarselKomponent>
                )}
                <Knapp
                    type={this.props.knapptype || 'hoved'}
                    htmlType="button"
                    onClick={this.lagreKnappOnClick}
                    className={this.props.className}
                    spinner={this.state.spinner}
                >
                    {this.props.label}
                </Knapp>
            </>
        );
    }
}

export default LagreKnapp;
