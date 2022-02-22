import { AvtaleContext } from '@/AvtaleProvider';
import { finnLedigeMaalkategorier } from '@/AvtaleSide/steg/MaalSteg/maal-utils';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useContext, useState } from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import './OpprettMaal.less';

const OppretteNyttMaal: FunctionComponent = () => {
    const context = useContext(AvtaleContext);
    const { mellomLagring } = context;

    const erNoeMellomLagret = (): boolean =>
        !!mellomLagring && mellomLagring.kategori && mellomLagring.beskrivelse !== '';

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
                    ledigeMaalkategorier={finnLedigeMaalkategorier(context.avtale.gjeldendeInnhold.maal)}
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
