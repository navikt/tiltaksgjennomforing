import * as React from 'react';
import { Maal } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './MaalKort.less';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import LagretMaal from './LagretMaal';

interface Props {
    maal: Maal;
    slettMaal: (maal: Maal) => void;
    lagreMaal: (maal: Maal) => void;
}

interface State {
    iEndreModus: boolean;
}

class MaalKort extends React.Component<Props, State> {
    state = {
        iEndreModus: false,
    };

    settEndreModus = (modus: boolean) => {
        this.setState({ iEndreModus: modus });
    };

    lagreMaal = () => {
        this.settEndreModus(false);
        this.props.lagreMaal(this.props.maal);
    };

    endreMaal = () => {
        this.settEndreModus(true);
    };

    slettMaal = () => {
        this.props.slettMaal(this.props.maal);
    };

    render() {
        return (
            <Innholdsboks>
                {this.state.iEndreModus ? (
                    <RedigerMaal
                        defaultMaal={this.props.maal}
                        lagreMaal={this.lagreMaal}
                    />
                ) : (
                    <LagretMaal
                        maal={this.props.maal}
                        endreOnClick={this.endreMaal}
                        slettOnClick={this.slettMaal}
                    />
                )}
            </Innholdsboks>
        );
    }
}

export default MaalKort;
