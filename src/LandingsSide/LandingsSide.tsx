import React from 'react';
import { Context, medContext } from '../AvtaleContext';
import { RouteComponentProps } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { pathTilKontaktinformasjonSteg } from '../paths';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import veilederIkon from './veileder.svg';
import './LandingsSide.less';

interface MatchProps {
    avtaleId: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

const LandingsSide: React.FunctionComponent<Props> = props => {
    const avtaleId = props.match.params.avtaleId;
    return (
        <div className="landingsside">
            <div className="landingsside__banner" />
            <Veileder
                className="landingsside__veileder"
                center={true}
                tekst={
                    <div className="landingsside__snakkeboble">
                        <div className="landingsside__snakkeboble__tittel">
                            Hei
                        </div>
                        Dette er en avtale mellom arbeidsgiver, kandidaten på
                        arbeidstrening og NAV.
                    </div>
                }
            >
                <img src={veilederIkon} />
            </Veileder>
            <Innholdstittel className="landingsside__tittel">
                Avtale om arbeidstrening
            </Innholdstittel>
            <Normaltekst className="landingsside__beskrivelse">
                Alle tre partene må godkjenne avtalen før dere kan begynne
                arbeidstreningen
            </Normaltekst>
            <Hovedknapp
                className="landingsside__knapp"
                onClick={() =>
                    props.history.push(pathTilKontaktinformasjonSteg(avtaleId))
                }
            >
                GÅ TIL AVTALEN
            </Hovedknapp>
        </div>
    );
};

export default medContext<Props>(LandingsSide);
