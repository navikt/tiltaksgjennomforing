import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';
import { FunctionComponent, useContext, useState } from 'react';
import { finnLedigeMaalkategorier } from '@/AvtaleSide/steg/MaalSteg/maal-utils';

const OpprettMaal: FunctionComponent = () => {
    const context = useContext(AvtaleContext);

    const erNoeMellomLagret = (): boolean =>
        !!context.mellomLagring && context.mellomLagring.maal !== undefined && context.mellomLagring.maalTekst !== '';

    const [visRedigerMaal, setVisRedigerMaal] = useState<boolean>(erNoeMellomLagret());

    const setRedigerMaal = (skalVises: boolean) => {
        setVisRedigerMaal(skalVises);
    };

    const nyttMaalOnClick = () => {
        context.utforHandlingHvisRedigerbar(() => {
            setRedigerMaal(true);
        });
    };

    const avsluttRedigering = () => {
        setRedigerMaal(false);
    };

    const lagreMaal = async (maal: Maal) => {
        await context.lagreMaal(maal);
        avsluttRedigering();
    };

    return (
        <Innholdsboks utfyller="veileder">
            <SkjemaTittel>Opprett mål</SkjemaTittel>
            {visRedigerMaal ? (
                <RedigerMaal
                    ledigeMaalkategorier={finnLedigeMaalkategorier(context.avtale.maal)}
                    lagreMaal={lagreMaal}
                    avbrytRedigering={avsluttRedigering}
                />
            ) : (
                <Knapp className="opprett-maal__knapp" htmlType="button" onClick={nyttMaalOnClick}>
                    + Legg til nytt mål
                </Knapp>
            )}
        </Innholdsboks>
    );
};

export default OpprettMaal;
