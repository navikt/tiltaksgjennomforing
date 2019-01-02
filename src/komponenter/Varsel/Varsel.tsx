import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import './Varsel.less';

interface Props {
    timeout?: number;
}

interface State {
    toggle: boolean;
}

class Varsel extends React.Component<Props, State> {
    state = {
        toggle: true,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        /*window.setTimeout(() => {
            this.setState({ toggle: false });
        }, this.props.timeout || 10000);*/
    }

    render() {
        return (
            this.state.toggle && (
                <AlertStripe type={'advarsel'} solid={true} className="varsel">
                    {this.props.children}
                </AlertStripe>
            )
        );
    }
}

export default Varsel;
