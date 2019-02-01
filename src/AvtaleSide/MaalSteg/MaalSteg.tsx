import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { ApiError } from '../ApiError';
import { Maal } from '../avtale';
import { finnLedigeMaalkategorier } from './maal-utils';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';

const MaalSteg: React.FunctionComponent<Context> = (props: Context) => {
    const slettMaal = async (maal: Maal) => {
        try {
            await props.slettMaal(maal);
        } catch (error) {
            if (error instanceof ApiError) {
                props.visFeilmelding(error.message);
            } else {
                throw error;
            }
        }
    };

    const valgteMaalkategorier = props.avtale.maal.map(maal => maal.kategori);
    const ledigeMaalkategorier = finnLedigeMaalkategorier(valgteMaalkategorier);

    const maalListe = props.avtale.maal.map(maal => (
        <MaalKort
            ledigeMaalkategorier={ledigeMaalkategorier}
            maal={maal}
            key={maal.id}
            lagreMaal={props.lagreMaal}
            slettMaal={slettMaal}
        />
    ));

    return (
        <>
            <OpprettMaal
                ledigeMaalkategorier={ledigeMaalkategorier}
                lagreMaal={props.lagreMaal}
            />
            {maalListe}
        </>
    );
};

export default medContext<{}>(MaalSteg);
