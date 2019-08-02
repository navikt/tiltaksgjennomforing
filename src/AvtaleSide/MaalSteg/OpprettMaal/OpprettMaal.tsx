import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Maal } from '../../avtale';
import { Maalkategori } from '../../maalkategorier';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    ledigeMaalkategorier: Maalkategori[];
}

class OpprettMaal extends React.Component<Props> {
    state = {
        visRedigerMaal: false,
    };

    componentWillUnmount(): void {}

    visRedigerMaal = (skalVises: boolean) => {
        this.setState({ visRedigerMaal: skalVises });
    };

    nyttMaalOnClick = () => {
        this.visRedigerMaal(true);
    };

    avbrytRedigering = () => {
        this.visRedigerMaal(false);
    };

    lagreMaal = async (maal: Maal) => {
        await this.props.lagreMaal(maal);
        this.avbrytRedigering();
    };

    render() {
        return (
            <Innholdsboks utfyller="veileder">
                <Systemtittel tag="h1" className="opprett-maal__tittel">
                    Opprett mål
                </Systemtittel>
                {this.state.visRedigerMaal ? (
                    <RedigerMaal
                        ledigeMaalkategorier={this.props.ledigeMaalkategorier}
                        lagreMaal={this.lagreMaal}
                        avbrytRedigering={this.avbrytRedigering}
                    />
                ) : (
                    <Knapp
                        className="opprett-maal__knapp"
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
