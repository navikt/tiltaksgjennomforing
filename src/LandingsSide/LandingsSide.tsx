import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Context, medContext } from '../AvtaleContext';
import AvtaleFetcher from '../AvtaleSide/AvtaleFetcher';
import {
    pathTilGodkjenningsSteg,
    pathTilKontaktinformasjonSteg,
} from '../paths';
import './LandingsSide.less';
import veilederIkon from './veileder.svg';

interface MatchProps {
    avtaleId: string;
    stegPath?: string;
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

    const gaTilAvtaleKlikk = () =>
        props.history.push(
            pathTilKontaktinformasjonSteg(props.match.params.avtaleId)
        );

    return (
        <AvtaleFetcher
            avtaleId={props.match.params.avtaleId}
            render={() => {
                if (props.avtale.erLaast) {
                    props.history.replace(
                        pathTilGodkjenningsSteg(props.match.params.avtaleId)
                    );
                }
                return (
                    <div className="landingsside">
                        <div className="landingsside__banner" />
                        {veileder}
                        <Innholdstittel className="landingsside__tittel">
                            Avtale om arbeidstrening
                        </Innholdstittel>
                        <Normaltekst className="landingsside__beskrivelse">
                            Alle tre partene må godkjenne avtalen før dere kan
                            begynne arbeidstreningen
                        </Normaltekst>
                        <Hovedknapp
                            className="landingsside__knapp"
                            onClick={gaTilAvtaleKlikk}
                        >
                            Gå til avtalen
                        </Hovedknapp>
                    </div>
                );
            }}
        />
    );
};

export default medContext<Props>(LandingsSide);
