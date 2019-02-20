import React from 'react';
import {
    Innholdstittel,
    Normaltekst,
    Element,
    Systemtittel,
} from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import VeilederpanelMedUtklippstavle from '../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import {
    absoluttPathTilAvtaleForBrukerOgAG,
    pathTilAvtale,
    pathTilKontaktinformasjonSteg,
} from '../../paths';
import { Context, medContext } from '../../AvtaleContext';
import Veilederpanel from 'nav-frontend-veilederpanel';
import avsjekkSirkelIkon from './avsjekk-sirkel.svg';

import './OpprettelseFullfort.less';
import { Input } from 'nav-frontend-skjema';

const OpprettelseFullfort: React.FunctionComponent<
    Context & RouterProps
> = props => {
    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
    };

    const hrefTilAvtaleForBrukerOgAG = absoluttPathTilAvtaleForBrukerOgAG(
        props.avtale.id
    );

    const inputLabel = (
        <Element className="opprettelseFullfort__undertittel">
            Kopier denne lenken for å dele
        </Element>
    );

    const veilederpanel = (
        <VeilederpanelMedUtklippstavle>
            <Systemtittel className="opprettelseFullfort__innholdstittel">
                Dette må du gjøre videre
            </Systemtittel>
            <Normaltekst>
                For at arbeidsgiver og deltaker skal kunne logge seg inn og
                fylle ut avtalen må du sende dem lenken vist nedenfor. De kan da
                logge seg inn i avtalen med ID-porten.
            </Normaltekst>

            <div className="opprettelseFullfort__lenkedeling">
                <Input
                    label={inputLabel}
                    className="opprettelseFullfort__inputfelt"
                    value={hrefTilAvtaleForBrukerOgAG}
                    readOnly={true}
                />
                <CopyToClipboard text={hrefTilAvtaleForBrukerOgAG}>
                    <Hovedknapp className="opprettelseFullfort__kopier-knapp">
                        Kopier lenke
                    </Hovedknapp>
                </CopyToClipboard>
            </div>
        </VeilederpanelMedUtklippstavle>
    );

    return (
        <div className="opprettelseFullfort">
            <div className="opprettelseFullfort__sidetittel-wrapper">
                <img
                    src={avsjekkSirkelIkon}
                    className="opprettelseFullfort__sidetittel-ikon"
                    alt="avsjekk-ikon"
                />
                <Innholdstittel>Avtalen ble opprettet</Innholdstittel>
            </div>
            {veilederpanel}
            <Hovedknapp
                onClick={tilAvtalenKlikk}
                className="opprettelseFullfort__knapp"
            >
                Gå til avtalen
            </Hovedknapp>
            <a className="lenke" onClick={() => props.history.goBack()}>
                Tilbake
            </a>
        </div>
    );
};

export default medContext(OpprettelseFullfort);
