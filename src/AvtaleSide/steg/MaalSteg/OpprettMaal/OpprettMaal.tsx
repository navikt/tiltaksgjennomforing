import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';
import { TemporaryLagring } from '@/AvtaleContext';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    ledigeMaalkategorier: Maalkategori[];
    mellomLagretMaal: TemporaryLagring;
    setMellomLagring: (maalInput: TemporaryLagring) => void;
    fjernMellomLagring: () => void;
}

class OpprettMaal extends React.Component<Props> {
    setInnMellomLagring = () => {
        return this.props.mellomLagretMaal.maal !== '' && this.props.mellomLagretMaal.maalTekst !== '';
    };

    state = {
        visRedigerMaal: this.setInnMellomLagring(),
    };

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
                        mellomLagretData={this.props.mellomLagretMaal}
                        setMellomLagring={this.props.setMellomLagring}
                        fjernMellomLagring={this.props.fjernMellomLagring}
                    />
                ) : (
                    <Knapp className="opprett-maal__knapp" htmlType="button" onClick={this.nyttMaalOnClick}>
                        + Legg til nytt mål
                    </Knapp>
                )}
            </Innholdsboks>
        );
    }
}

export default OpprettMaal;
