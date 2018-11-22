import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel } from 'nav-frontend-typografi';
import './MaalSteg.less';
import NyttMaal from './NyttMaal/NyttMaal';
import { Knapp } from 'nav-frontend-knapper';
import MaalKort from './MaalKort/MaalKort';
import { Maal } from '../avtale';

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

    endreMaal = (maal: Maal) => {
        console.log('Endre', maal); // tslint:disable-line no-console
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
                endreMaal={this.endreMaal}
                slettMaal={this.slettMaal}
            />
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
