import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
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
    lagre: () => Promise<any>;
    className?: string;
    suksessmelding?: string;
    label: React.ReactNode;
    knapptype?: typeof KnappBase.defaultProps.type;
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

    componentWillUnmount() {
        // eslint-disable-next-line
        //  this.state.isMounted = false;
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
        } catch (error) {
            try {
                handterFeil(error, this.visFeilmelding);
            } catch (error) {
                this.visFeilmelding('Det skjedde en uventet feil');
            }
        } finally {
            if (this.state.isMounted) {
                this.enableSpinner(false);
            }
        }
    };

    visFeilmelding = (feilmelding: string) => {
        this.setFocus();
        this.setState({ feilmelding });
    };

    visSuksessmelding = () => {
        if (this.props.suksessmelding) {
            this.setState({ suksessmelding: this.props.suksessmelding });
            this.setFocus();
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
                        timeout={10000}
                        type={'suksess'}
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
                        type={'advarsel'}
                        onLukkVarsel={this.fjernFeilmelding}
                        className={'lagreknapp__varsel'}
                        varselRef={this.varselRef}
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
                    disabled={this.state.spinner}
                >
                    {this.props.label}
                </Knapp>
            </>
        );
    }
}

export default LagreKnapp;
