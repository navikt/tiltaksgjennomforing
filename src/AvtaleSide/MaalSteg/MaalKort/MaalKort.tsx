import * as React from 'react';
import { Maal } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './MaalKort.less';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import LagretMaal from './LagretMaal/LagretMaal';
import { Maalkategori } from '../../maalkategorier';

interface Props {
    maal: Maal;
    slettMaal: (maal: Maal) => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
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

    lagreMaal = async (maal: Maal) => {
        await this.props.lagreMaal(maal);
        this.settEndreModus(false);
    };

    endreMaal = () => {
        this.settEndreModus(true);
    };

    avbrytEndreMaal = () => {
        this.settEndreModus(false);
    };

    slettMaal = () => {
        if (window.confirm('Er du sikker på at du vil slette dette målet?')) {
            return this.props.slettMaal(this.props.maal);
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
                        avbrytRedigering={this.avbrytEndreMaal}
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
