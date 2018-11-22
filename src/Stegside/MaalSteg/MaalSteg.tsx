import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import './MaalSteg.less';
import MaalKort from './MaalKort/MaalKort';
import { Maal } from '../avtale';
import OpprettMaal from './OpprettMaal/OpprettMaal';

class MaalSteg extends React.Component<Context> {
    lagreMaal = (maalTilLagring: Maal) => {
        const alleMaal = this.props.avtale.maal;
        const eksisterendeMaalIndex = this.props.avtale.maal.findIndex(
            maal => maal.id === maalTilLagring.id
        );

        if (eksisterendeMaalIndex !== -1) {
            alleMaal[eksisterendeMaalIndex] = maalTilLagring;
        } else {
            this.props.avtale.maal.push({
                id: maalTilLagring.id,
                kategori: maalTilLagring.kategori,
                beskrivelse: maalTilLagring.beskrivelse,
            });
        }
        this.props.settAvtaleVerdi('maal', alleMaal);
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
