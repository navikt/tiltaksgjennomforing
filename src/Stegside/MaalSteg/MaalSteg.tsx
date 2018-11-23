import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import './MaalSteg.less';
import MaalKort from './MaalKort/MaalKort';
import { Maal } from '../avtale';
import OpprettMaal from './OpprettMaal/OpprettMaal';

class MaalSteg extends React.Component<Context> {
    lagreMaal = (maalTilLagring: Maal) => {
        const nyeMaal = this.props.avtale.maal
            .filter(maal => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        this.props.settAvtaleVerdi('maal', nyeMaal);
    };

    slettMaal = (maalTilSletting: Maal) => {
        const nyeMaal = this.props.avtale.maal.filter(
            maal => maal.id !== maalTilSletting.id
        );
        this.props.settAvtaleVerdi('maal', nyeMaal);
    };

    render() {
        const maalListe = this.props.avtale.maal.map(maal => (
            <MaalKort
                maal={maal}
                key={maal.id}
                lagreMaal={this.lagreMaal}
                slettMaal={this.slettMaal}
            />
        ));

        return (
            <div className="maalsteg">
                <OpprettMaal lagreMaal={this.lagreMaal} />
                {maalListe}
            </div>
        );
    }
}

export default medContext(MaalSteg);
