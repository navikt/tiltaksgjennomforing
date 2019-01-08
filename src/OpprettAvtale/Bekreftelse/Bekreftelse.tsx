import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import { pathTilKontaktinformasjonSteg } from '../../paths';
import { Context, medContext } from '../../AvtaleContext';

class Bekreftelse extends React.Component<Context & RouterProps, {}> {
    tilAvtalenKlikk = () => {
        this.props.history.push(
            pathTilKontaktinformasjonSteg(this.props.avtale.id)
        );
    };

    render() {
        return (
            <>
                <Innholdstittel>Avtalen ble opprettet</Innholdstittel>
                id: {this.props.avtale.id}
                <Hovedknapp onClick={this.tilAvtalenKlikk}>
                    GÅ TIL AVTALEN
                </Hovedknapp>
            </>
        );
    }
}

export default medContext(Bekreftelse);
