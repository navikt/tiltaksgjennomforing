import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import GodkjenningKnapper from './GodkjenningKnapper/GodkjenningKnapper';
import Oppsummering from './Oppsummering/Oppsummering';
import GodkjenningStatus from './GodkjenningStatus/GodkjenningStatus';

const GodkjenningSteg = (props: Context) => {
    const onGodkjenningKlikk = () => {
        props.endreGodkjenning(true);
    };

    return (
        <>
            <Oppsummering avtale={props.avtale} />
            <GodkjenningKnapper
                avtale={props.avtale}
                bekreftBrukerOnClick={onGodkjenningKlikk}
                bekreftArbeidsgiverOnClick={onGodkjenningKlikk}
                bekreftVeilederOnClick={onGodkjenningKlikk}
            />
            <GodkjenningStatus avtale={props.avtale} />
        </>
    );
};

export default medContext<{}>(GodkjenningSteg);
