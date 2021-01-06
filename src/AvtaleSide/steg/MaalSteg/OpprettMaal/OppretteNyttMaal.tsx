import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';
import { FunctionComponent, useContext, useState } from 'react';
import { finnLedigeMaalkategorier } from '@/AvtaleSide/steg/MaalSteg/maal-utils';

const OppretteNyttMaal: FunctionComponent = () => {
    const context = useContext(AvtaleContext);

    const erNoeMellomLagret = (): boolean =>
        !!context.mellomLagring &&
        context.mellomLagring.kategori !== undefined &&
        context.mellomLagring.beskrivelse !== '';

    const [visRedigerMaal, setVisRedigerMaal] = useState<boolean>(erNoeMellomLagret());

    const setRedigerMaal = (skalVises: boolean) => {
        setVisRedigerMaal(skalVises);
    };

    const nyttMaalOnClick = () =>
        context.utforHandlingHvisRedigerbar(() => {
            setRedigerMaal(true);
        });

    const avsluttRedigering = () => setRedigerMaal(false);

    return (
        <Innholdsboks utfyller="veileder">
            <SkjemaTittel>Opprett mål</SkjemaTittel>
            {visRedigerMaal ? (
                <RedigerMaal
                    ledigeMaalkategorier={finnLedigeMaalkategorier(context.avtale.maal)}
                    avsluttRedigering={avsluttRedigering}
                />
            ) : (
                <Knapp className="opprett-maal__knapp" htmlType="button" onClick={nyttMaalOnClick}>
                    + Legg til nytt mål
                </Knapp>
            )}
        </Innholdsboks>
    );
};

export default OppretteNyttMaal;
