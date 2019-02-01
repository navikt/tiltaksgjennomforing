import * as React from 'react';
import ApiError from '../../api-error';
import { Context, medContext } from '../../AvtaleContext';
import GodkjenningKnapper from './GodkjenningKnapper/GodkjenningKnapper';
import GodkjenningStatus from './GodkjenningStatus/GodkjenningStatus';
import Oppsummering from './Oppsummering/Oppsummering';

const GodkjenningSteg = (props: Context) => {
    const onGodkjenningKlikk = async () => {
        try {
            await props.endreGodkjenning(true);
        } catch (error) {
            if (error instanceof ApiError) {
                window.alert(error.message);
            } else {
                throw error;
            }
        }
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
