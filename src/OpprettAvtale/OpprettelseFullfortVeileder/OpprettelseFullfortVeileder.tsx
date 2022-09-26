import { Hovedknapp } from 'nav-frontend-knapper';
import { Link } from '@navikt/ds-react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps } from 'react-router';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg, pathTilOversiktISelvbetjeningProd } from '@/paths';


import './OpprettelseFullfortVeileder.less';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

const OpprettelseFullfortVeileder: React.FunctionComponent<RouteComponentProps<{ avtaleId: string }>> = (props) => {
    const avtaleId = props.match.params.avtaleId;

    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    };

    const inputLabel = (
        <>
            <Normaltekst className="opprettelseFullfortVeileder__undertittel">
                For at arbeidsgiver skal kunne fylle ut og godkjenne avtalen må du kopiere og sende dem lenken under.
            </Normaltekst>
            <Normaltekst className="opprettelseFullfortVeileder__undertittel">
                Når du har fylt ut telefonnummeret til alle i avtalen, så kan du sende den på SMS via "del lenke til
                avtalen" i menyen.
            </Normaltekst>
            <Normaltekst className="opprettelseFullfortVeileder__undertittel">
                Hvis det er ønskelig å sende lenke til avtalen via andre kanaler, for eksempel aktivitetsplanen eller
                e-post, er det adressen under som må benyttes.
            </Normaltekst>
        </>
    );

    const veilederpanel = (
        <VeilederpanelMedAvsjekkIkon>
            <Systemtittel className="opprettelseFullfortVeileder__innholdstittel">Avtalen er opprettet</Systemtittel>
            {inputLabel}
            <div className="opprettelseFullfortVeileder__lenkedeling">
                <div className="opprettelseFullfortVeileder__lenke">
                    <Link href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Link>
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
