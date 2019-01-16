import React from 'react';
import { Innholdstittel, Normaltekst, Sidetittel, Element } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import { pathTilKontaktinformasjonSteg } from '../../paths';
import { Context, medContext } from '../../AvtaleContext';
import Veilederpanel from 'nav-frontend-veilederpanel';
import utklippstavleIkon from '../utklippstavle.svg';
import avsjekkSirkelIkon from './avsjekk-sirkel.svg';

import './OpprettelseFullfort.less'

const OpprettelseFullfort: React.FunctionComponent<Context & RouterProps> = props => {
    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
    };

    const hrefTilAvtaleForBrukerOgAG = `https://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${props.avtale.id}`;

    const veilederpanel = (
        <Veilederpanel
            svg={<img className="opprettelseFullfort__ikon" src={utklippstavleIkon} />}
            kompakt={true}
            type="plakat"
        >
            <Innholdstittel className="opprettelseFullfort__innholdstittel">
                Dette må du gjøre videre
            </Innholdstittel>
            <Normaltekst>
                For at arbeidsgiver og kandidat skal kunne logge seg inn og fylle ut avtalen må du sende dem lenken vist nedenfor. De kan da kunne logge seg inn i avtalen med Min ID.
            </Normaltekst>
            <Element className="opprettelseFullfort__undertittel">
                Kopier denne lenken for å dele
            </Element>
            <div className="opprettelseFullfort__kopierLenke-wrapper">
                <Normaltekst>
                    <a href={hrefTilAvtaleForBrukerOgAG} className="lenke nav-frontend-lenke">{hrefTilAvtaleForBrukerOgAG}</a>
                </Normaltekst>
                <Hovedknapp>Kopier lenke</Hovedknapp>
            </div>
        </Veilederpanel>
    );

    return (
        <div className="opprettelseFullfort">
            <div className="opprettelseFullfort__sidetittel-wrapper">
                <img src={avsjekkSirkelIkon} className="opprettelseFullfort__sidetittel-ikon"/>
                <Sidetittel>Avtalen ble opprettet</Sidetittel>
            </div>
            {veilederpanel}
            <Hovedknapp onClick={tilAvtalenKlikk} className="opprettelseFullfort__knapp">
                Gå til avtalen
            </Hovedknapp>
            <a className="lenke" onClick={() => props.history.goBack()}>Tilbake</a>
        </div>
    );
};

export default medContext(OpprettelseFullfort);
