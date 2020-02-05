import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import * as React from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import LagretMaal from './LagretMaal/LagretMaal';
import './MaalKort.less';

interface Props {
    maal: Maal;
    slettMaal: (maal: Maal) => void;
    lagreMaal: (maal: Maal) => Promise<any>;
    ledigeMaalkategorier: Maalkategori[];
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
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
        this.props.utforHandlingHvisRedigerbar(() => {
            this.settEndreModus(true);
        });
    };

    avbrytEndreMaal = () => {
        this.settEndreModus(false);
    };

    slettMaal = () => {
        this.props.utforHandlingHvisRedigerbar(() => {
            this.props.slettMaal(this.props.maal);
        });
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
                    <LagretMaal maal={this.props.maal} endreOnClick={this.endreMaal} slettOnClick={this.slettMaal} />
                )}
            </Innholdsboks>
        );
    }
}

export default MaalKort;
