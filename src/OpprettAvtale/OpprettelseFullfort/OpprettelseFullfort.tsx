import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import VeilederpanelMedAvsjekkIkon from '../../komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import {
    pathTilKontaktinformasjonSteg,
    pathTilOversikt,
    pathTilOversiktISelvbetjeningProd,
} from '../../paths';

import './OpprettelseFullfort.less';

const OpprettelseFullfort: React.FunctionComponent<
    RouteComponentProps<{ avtaleId: string }>
> = props => {
    const avtaleId = props.match.params.avtaleId;

    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    };

    const inputLabel = (
        <Normaltekst className="opprettelseFullfort__undertittel">
            For at arbeidsgiver og deltaker skal kunne fylle ut og godkjenne
            avtalen, må du kopiere og sende dem lenken under. De må da logge seg
            inn via ID-porten.
        </Normaltekst>
    );

    const veilederpanel = (
        <VeilederpanelMedAvsjekkIkon>
            <Systemtittel className="opprettelseFullfort__innholdstittel">
                Avtalen er opprettet
            </Systemtittel>
            {inputLabel}
            <div className="opprettelseFullfort__lenkedeling">
                <div className="opprettelseFullfort__lenke">
                    <Lenke href={pathTilOversiktISelvbetjeningProd}>
                        {pathTilOversiktISelvbetjeningProd}
                    </Lenke>
                </div>
                <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                    <Hovedknapp className="opprettelseFullfort__kopier-knapp">
                        Kopier lenke
                    </Hovedknapp>
                </CopyToClipboard>
            </div>
        </VeilederpanelMedAvsjekkIkon>
    );

    return (
        <div className="opprettelseFullfort">
            {veilederpanel}
            <Hovedknapp
                onClick={tilAvtalenKlikk}
                className="opprettelseFullfort__knapp"
            >
                Gå til avtalen
            </Hovedknapp>
            <Link className="lenke" to={pathTilOversikt}>
                <VenstreChevron />
                Tilbake
            </Link>
        </div>
    );
};

export default OpprettelseFullfort;
