import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel } from 'nav-frontend-typografi';
import './MaalSteg.less';
import NyttMaal from './NyttMaal/NyttMaal';
import { Knapp } from 'nav-frontend-knapper';
import Maal from './MaalKort/MaalKort';

interface State {
    visNyttMaalForm: boolean;
}

class MaalSteg extends React.Component<Context, State> {
    state = {
        visNyttMaalForm: false,
    };

    visNyttMaalForm = () => {
        this.setState({ visNyttMaalForm: true });
    };

    skjulNyttMaalForm = () => {
        this.setState({ visNyttMaalForm: false });
    };

    leggTilNyttMaal = () => {
        this.visNyttMaalForm();
    };

    render() {
        const maalListe = this.props.avtale.maal.map(maal => (
            <Maal maal={maal} key={maal.id} />
        ));

        return (
            <div className="maalsteg">
                <Innholdsboks>
                    <Systemtittel
                        tag="h1"
                        className="maalsteg__nytt-maal-tittel"
                    >
                        Opprett mål
                    </Systemtittel>
                    {this.state.visNyttMaalForm ? (
                        <NyttMaal skjulNyttMaalForm={this.skjulNyttMaalForm} />
                    ) : (
                        <Knapp
                            className="maalsteg__nytt-maal-knapp"
                            htmlType="button"
                            onClick={this.leggTilNyttMaal}
                        >
                            + Legg til nytt mål
                        </Knapp>
                    )}
                </Innholdsboks>
                {maalListe}
            </div>
        );
    }
}

export default medContext(MaalSteg);
