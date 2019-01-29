import * as React from 'react';
import { Maal } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './MaalKort.less';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import LagretMaal from './LagretMaal/LagretMaal';
import { Maalkategori } from '../../maalkategorier';

interface Props {
    maal: Maal;
    slettMaal: (maal: Maal) => void;
    lagreMaal: (maal: Maal) => void;
    ledigeMaalkategorier: Maalkategori[];
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

    lagreMaal = (maal: Maal) => {
        this.settEndreModus(false);
        this.props.lagreMaal(maal);
    };

    endreMaal = () => {
        this.settEndreModus(true);
    };

    slettMaal = () => {
        if (window.confirm("Er du sikker på at du vil slette dette målet?")) {
            this.props.slettMaal(this.props.maal);
        }
    };

    render() {
        return (
            <Innholdsboks className="maalkort">
                {this.state.iEndreModus ? (
                    <RedigerMaal
                        defaultMaal={this.props.maal}
                        ledigeMaalkategorier={this.props.ledigeMaalkategorier}
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
