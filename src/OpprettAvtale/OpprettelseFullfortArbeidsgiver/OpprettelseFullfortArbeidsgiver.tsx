import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg } from '@/paths';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import './OpprettelseFullfortArbeidsgiver.less';

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
                        Avtalen er nå opprettet og du kan begynne å fylle den ut. Avtalen er nå også tilgjengelig for
                        veilederne på NAV-kontoret til deltakeren.
                    </Normaltekst>
                </VeilederpanelMedAvsjekkIkon>
                <VerticalSpacer rem={2} />
                <LenkeKnapp path={pathTilKontaktinformasjonSteg(avtaleId)}>Gå til avtalen</LenkeKnapp>
                <VerticalSpacer rem={1} />
                <TilbakeTilOversiktLenke />
            </div>
        </>
    );
};

export default OpprettelseFullfortArbeidsgiver;
