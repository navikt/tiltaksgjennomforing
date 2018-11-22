import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import { Systemtittel } from 'nav-frontend-typografi';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import '../MaalSteg.less';
import { Maal } from '../../avtale';

interface Props {
    lagreMaal: (maal: Maal) => void;
}

class OpprettMaal extends React.Component<Props> {
    state = {
        visRedigerMaal: false,
    };

    visMaal = (skalVises: boolean) => {
        this.setState({ visRedigerMaal: skalVises });
    };

    nyttMaalOnClick = () => {
        this.visMaal(true);
    };

    lagreMaal = (maal: Maal) => {
        this.props.lagreMaal(maal);
        this.visMaal(false);
    };

    render() {
        return (
            <Innholdsboks>
                <Systemtittel tag="h1" className="maalsteg__nytt-maal-tittel">
                    Opprett mål
                </Systemtittel>
                {this.state.visRedigerMaal ? (
                    <RedigerMaal lagreMaal={this.lagreMaal} />
                ) : (
                    <Knapp
                        className="maalsteg__nytt-maal-knapp"
                        htmlType="button"
                        onClick={this.nyttMaalOnClick}
                    >
                        + Legg til nytt mål
                    </Knapp>
                )}
            </Innholdsboks>
        );
    }
}

export default OpprettMaal;
