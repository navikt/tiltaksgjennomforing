import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';

class MaalSteg extends React.Component<Context> {
    render() {
        const maalListe = this.props.avtale.maal.map(maal => (
            <MaalKort
                maal={maal}
                key={maal.id}
                lagreMaal={this.props.lagreMaal}
                slettMaal={this.props.slettMaal}
            />
        ));

        return (
            <>
                <OpprettMaal lagreMaal={this.props.lagreMaal} />
                {maalListe}
            </>
        );
    }
}

export default medContext(MaalSteg);
