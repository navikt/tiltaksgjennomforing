import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';
import { finnLedigeMaalkategorier } from './maal-utils';

class MaalSteg extends React.Component<Context> {
    render() {
        const valgteMaalkategorier = this.props.avtale.maal.map(maal => maal.kategori);
        const ledigeMaalkategorier = finnLedigeMaalkategorier(valgteMaalkategorier);

        const maalListe = this.props.avtale.maal.map(maal => (
            <MaalKort
                ledigeMaalkategorier={ledigeMaalkategorier}
                maal={maal}
                key={maal.id}
                lagreMaal={this.props.lagreMaal}
                slettMaal={this.props.slettMaal}
            />
        ));

        return (
            <>
                <OpprettMaal
                    ledigeMaalkategorier={ledigeMaalkategorier}
                    lagreMaal={this.props.lagreMaal}
                />
                {maalListe}
            </>
        );
    }
}

export default medContext(MaalSteg);
