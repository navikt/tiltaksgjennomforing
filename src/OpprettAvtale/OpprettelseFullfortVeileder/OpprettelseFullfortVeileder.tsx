import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps } from 'react-router';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg, pathTilOversiktISelvbetjeningProd } from '@/paths';

import './OpprettelseFullfortVeileder.less';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

const OpprettelseFullfortVeileder: React.FunctionComponent<RouteComponentProps<{ avtaleId: string }>> = props => {
    const avtaleId = props.match.params.avtaleId;

    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    };

    const inputLabel = (
        <Normaltekst className="opprettelseFullfortVeileder__undertittel">
            For at arbeidsgiver og deltaker skal kunne fylle ut og godkjenne avtalen, må du kopiere og sende dem lenken
            under. De må da logge seg inn via ID-porten.
        </Normaltekst>
    );

    const veilederpanel = (
        <VeilederpanelMedAvsjekkIkon>
            <Systemtittel className="opprettelseFullfortVeileder__innholdstittel">Avtalen er opprettet</Systemtittel>
            {inputLabel}
            <div className="opprettelseFullfortVeileder__lenkedeling">
                <div className="opprettelseFullfortVeileder__lenke">
                    <Lenke href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Lenke>
                </div>
                <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                    <Hovedknapp className="opprettelseFullfortVeileder__kopier-knapp">Kopier lenke</Hovedknapp>
                </CopyToClipboard>
            </div>
        </VeilederpanelMedAvsjekkIkon>
    );

    return (
        <div className="opprettelseFullfortVeileder">
            {veilederpanel}
            <Hovedknapp onClick={tilAvtalenKlikk} className="opprettelseFullfortVeileder__knapp">
                Gå til avtalen
            </Hovedknapp>

            <TilbakeTilOversiktLenke />
        </div>
    );
};

export default OpprettelseFullfortVeileder;
