import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import { pathTilKontaktinformasjonSteg } from '../../paths';
import { Context, medContext } from '../../AvtaleContext';

const Bekreftelse: React.FunctionComponent<Context & RouterProps> = props => {
    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
    };

    return (
        <>
            <Innholdstittel>Avtalen ble opprettet</Innholdstittel>
            id: {props.avtale.id}
            <Hovedknapp onClick={tilAvtalenKlikk}>GÅ TIL AVTALEN</Hovedknapp>
        </>
    );
};

export default medContext(Bekreftelse);
