import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps } from 'react-router';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg, pathTilOversiktISelvbetjeningProd } from '@/paths';
import './OpprettelseFullfortArbeidsgiver.less';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '@/komponenter/Banner/Banner';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const OpprettelseFullfortArbeidsgiver: React.FunctionComponent<RouteComponentProps<{ avtaleId: string }>> = props => {
    const avtaleId = props.match.params.avtaleId;

    return (
        <>
            <Banner tekst="Opprettelse fullført" />

            <div className="opprettelseFullfortArbeidsgiver">
                <VeilederpanelMedAvsjekkIkon>
                    <Systemtittel className="opprettelseFullfortArbeidsgiver__innholdstittel">
                        Avtalen er opprettet
                    </Systemtittel>
                    <Normaltekst className="opprettelseFullfortArbeidsgiver__undertittel">
                        For at arbeidsgiver og deltaker skal kunne fylle ut og godkjenne avtalen, må du kopiere og sende
                        dem lenken under. De må da logge seg inn via ID-porten.
                    </Normaltekst>
                    <div className="opprettelseFullfortArbeidsgiver__lenkedeling">
                        <div className="opprettelseFullfortArbeidsgiver__lenke">
                            <Lenke href={pathTilOversiktISelvbetjeningProd}>{pathTilOversiktISelvbetjeningProd}</Lenke>
                        </div>
                        <CopyToClipboard text={pathTilOversiktISelvbetjeningProd}>
                            <Hovedknapp className="opprettelseFullfortArbeidsgiver__kopier-knapp">
                                Kopier lenke
                            </Hovedknapp>
                        </CopyToClipboard>
                    </div>
                </VeilederpanelMedAvsjekkIkon>
                <VerticalSpacer rem={2} />
                <LenkeKnapp path={pathTilKontaktinformasjonSteg(avtaleId)} tekst={'Gå til avtalen'} />
                <VerticalSpacer rem={1} />
                <TilbakeTilOversiktLenke />
            </div>
        </>
    );
};

export default OpprettelseFullfortArbeidsgiver;
