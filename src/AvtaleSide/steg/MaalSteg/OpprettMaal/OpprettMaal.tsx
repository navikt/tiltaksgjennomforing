import { TemporaryLagring } from '@/AvtaleContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Godkjenninger, Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    ledigeMaalkategorier: Maalkategori[];
    mellomLagretMaal: TemporaryLagring;
    setMellomLagring: (maalInput: TemporaryLagring) => void;
    fjernMellomLagring: () => void;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
}

class OpprettMaal extends React.Component<Props & Godkjenninger> {
    setInnMellomLagring = () => {
        return this.props.mellomLagretMaal.maal !== undefined && this.props.mellomLagretMaal.maalTekst !== '';
    };

    state = {
        visRedigerMaal: this.setInnMellomLagring(),
    };

    visRedigerMaal = (skalVises: boolean) => {
        this.setState({ visRedigerMaal: skalVises });
    };

    nyttMaalOnClick = () => {
        this.props.utforHandlingHvisRedigerbar(() => {
            this.visRedigerMaal(true);
        });
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
                <SkjemaTittel>Opprett mål</SkjemaTittel>
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
