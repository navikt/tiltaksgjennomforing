import classNames from 'classnames';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import Lukknapp from 'nav-frontend-lukknapp';
import * as React from 'react';
import './Varsel.less';

interface Props {
    timeout?: number;
    kanLukkes: boolean;
    onLukkVarsel?: () => void;
    type: AlertStripeType;
    className?: string;
}

interface State {
    display: boolean;
}

class VarselKomponent extends React.Component<Props, State> {
    private timerHandle: any;

    state = {
        display: true,
    };

    componentDidMount = (): void => {
        if (this.props.timeout) {
            this.timerHandle = setTimeout(() => {
                this.lukkVarsel();
            }, this.props.timeout);
        }
    };

    componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
    }

    lukkVarsel = () => {
        this.setState({ display: false });
        this.props.onLukkVarsel && this.props.onLukkVarsel();
    };

    render() {
        return (
            this.state.display && (
                <AlertStripe
                    type={this.props.type}
                    className={classNames('varsel', this.props.className)}
                >
                    <div className="varsel__innhold">
                        <div>{this.props.children}</div>
                        {this.props.kanLukkes && (
                            <Lukknapp
                                bla={this.props.type === 'info'}
                                onClick={this.lukkVarsel}
                                className="varsel__innhold__lukknapp"
                            />
                        )}
                    </div>
                </AlertStripe>
            )
        );
    }
}

export default VarselKomponent;
