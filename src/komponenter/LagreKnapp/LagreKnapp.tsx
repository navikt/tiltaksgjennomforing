import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { Feilkode } from '@/types/feilkode';
import { handterFeil } from '@/utils/apiFeilUtils';
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
    lagre: () => Promise<any> | void;
    className?: string;
    suksessmelding?: string;
    label: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
    knapptype?: typeof KnappBase.defaultProps.type;
    setFeilmelding?: (value: Feilkode) => void;
}

class LagreKnapp extends Component<Props, State> {
    private varselRef: any;

    constructor(props: Props) {
        super(props);
        this.varselRef = React.createRef();

        this.state = {
            suksessmelding: '',
            feilmelding: '',
            spinner: false,
            isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    setFocus = () => {
        if (this.varselRef) {
            this.varselRef.current.focus();
        }
    };

    lagreKnappOnClick = async () => {
        this.enableSpinner(true);
        try {
            await this.props.lagre();
            this.visSuksessmelding();
            this.fjernFeilmelding();
        } catch (error: any) {
            try {
                if (this.props.setFeilmelding) {
                    this.props.setFeilmelding(error.message);
                }
                handterFeil(error, this.visFeilmelding);
            } catch (er) {
                this.visFeilmelding('Det skjedde en uventet feil');
            }
        } finally {
            if (this.state.isMounted) {
                this.enableSpinner(false);
            }
        }
    };

    visFeilmelding = (feilmelding: string) => {
        this.setState({ feilmelding }, () => {
            this.setFocus();
        });
    };

    visSuksessmelding = () => {
        if (this.props.suksessmelding) {
            this.setState({ suksessmelding: this.props.suksessmelding }, () => {
                this.setFocus();
            });
        }
    };

    setFocusElement = (id: string): void => {
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };

    fjernSuksessmelding = () => {
        this.setState({ suksessmelding: '' }, () => {
            this.setFocusElement('lagre-knapp');
        });
    };

    fjernFeilmelding = () => {
        this.setState({ feilmelding: '' }, () => {
            this.setFocusElement('lagre-knapp');
        });
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
                        type={'success'}
                        onLukkVarsel={this.fjernSuksessmelding}
                        className={'lagreknapp__varsel'}
                        varselRef={this.varselRef}
                    >
                        {this.state.suksessmelding}
                    </VarselKomponent>
                )}
                {this.state.feilmelding && (
                    <VarselKomponent
                        kanLukkes={true}
                        type={'warning'}
                        onLukkVarsel={this.fjernFeilmelding}
                        className={'lagreknapp__varsel'}
                        varselRef={this.varselRef}
                    >
                        {this.state.feilmelding}
                    </VarselKomponent>
                )}
                <Knapp
                    hidden={this.props.hidden}
                    type={this.props.knapptype || 'hoved'}
                    htmlType="button"
                    onClick={this.lagreKnappOnClick}
                    className={this.props.className}
                    spinner={this.state.spinner}
                    disabled={this.state.spinner || this.props.disabled}
                    id="lagre-knapp"
                >
                    {this.props.label}
                </Knapp>
            </>
        );
    }
}

export default LagreKnapp;
