import React from 'react';
import { Context, medContext } from '../AvtaleContext';
import { RouteComponentProps } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { pathTilKontaktinformasjonSteg } from '../paths';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import veilederIkon from './veileder.svg';
import './LandingsSide.less';

interface MatchProps {
    avtaleId: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

const LandingsSide: React.FunctionComponent<Props> = props => {
    const veileder = (
        <Veileder
            className="landingsside__veileder"
            center={true}
            tekst={
                <>
                    <Element>Hei</Element>
                    <Normaltekst>
                        Dette er en avtale mellom arbeidsgiver, kandidaten på
                        arbeidstrening og NAV.
                    </Normaltekst>
                </>
            }
        >
            <img src={veilederIkon} />
        </Veileder>
    );

    const avtaleId = props.match.params.avtaleId;
    const gaTilAvtaleKlikk = () =>
        props.history.push(pathTilKontaktinformasjonSteg(avtaleId));

    return (
        <div className="landingsside">
            <div className="landingsside__banner" />
            {veileder}
            <Innholdstittel className="landingsside__tittel">
                Avtale om arbeidstrening
            </Innholdstittel>
            <Normaltekst className="landingsside__beskrivelse">
                Alle tre partene må godkjenne avtalen før dere kan begynne
                arbeidstreningen
            </Normaltekst>
            <Hovedknapp
                className="landingsside__knapp"
                onClick={gaTilAvtaleKlikk}
            >
                Gå til avtalen
            </Hovedknapp>
        </div>
    );
};

export default medContext<Props>(LandingsSide);
