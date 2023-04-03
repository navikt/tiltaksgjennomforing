import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
//import { RouteComponentProps } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg, pathTilOversiktISelvbetjeningProd } from '@/paths';

import './OpprettelseFullfortVeileder.less';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';



const OpprettelseFullfortVeileder: React.FunctionComponent = () => {
    const { avtaleId } = useParams();
    const navigate = useNavigate();

    const tilAvtalenKlikk = () => {
        navigate(pathTilKontaktinformasjonSteg(avtaleId!));
    };

    const inputLabel = (
        <>
            <BodyShort size="small" className="opprettelseFullfortVeileder__undertittel">
                For at arbeidsgiver skal kunne fylle ut og godkjenne avtalen må du kopiere og sende dem lenken under.
            </BodyShort>
            <BodyShort size="small" className="opprettelseFullfortVeileder__undertittel">
                Når du har fylt ut telefonnummeret til alle i avtalen, så kan du sende den på SMS via "del lenke til
                avtalen" i menyen.
            </BodyShort>
            <BodyShort size="small" className="opprettelseFullfortVeileder__undertittel">
                Hvis det er ønskelig å sende lenke til avtalen via andre kanaler, for eksempel aktivitetsplanen eller
                e-post, er det adressen under som må benyttes.
            </BodyShort>
        </>
    );

    const veilederpanel = (
        <VeilederpanelMedAvsjekkIkon>
            <Heading size="medium" className="opprettelseFullfortVeileder__innholdstittel">
                Avtalen er opprettet
            </Heading>
            {inputLabel}
            <div className="opprettelseFullfortVeileder__lenkedeling">
                <div className="opprettelseFullfortVeileder__lenke">
                    <Link href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Link>
                </div>
                <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                    <Button className="opprettelseFullfortVeileder__kopier-knapp">
                        Kopier lenke
                    </Button>
                </CopyToClipboard>
            </div>
        </VeilederpanelMedAvsjekkIkon>
    );

    return (
        <div className="opprettelseFullfortVeileder">
            {veilederpanel}
            <Button onClick={tilAvtalenKlikk} className="opprettelseFullfortVeileder__knapp">
                Gå til avtalen
            </Button>
            <TilbakeTilOversiktLenke />
        </div>
    );
};

export default OpprettelseFullfortVeileder;
