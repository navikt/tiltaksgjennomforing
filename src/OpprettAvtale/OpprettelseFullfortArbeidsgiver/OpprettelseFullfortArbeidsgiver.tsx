import React from 'react';
import './OpprettelseFullfortArbeidsgiver.less';
import Banner from '@/komponenter/Banner/Banner';
import LenkeKnapp from '@/komponenter/LenkeKnapp';
import { RouteComponentProps } from 'react-router';
import { BodyShort, Heading } from '@navikt/ds-react';
import { pathTilKontaktinformasjonSteg } from '@/paths';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

const OpprettelseFullfortArbeidsgiver: React.FunctionComponent<RouteComponentProps<{ avtaleId: string }>> = (props) => {
    const avtaleId = props.match.params.avtaleId;

    return (
        <>
            <Banner tekst="Opprettelse fullført" />

            <div className="opprettelseFullfortArbeidsgiver">
                <VeilederpanelMedAvsjekkIkon>
                    <Heading size="medium" className="opprettelseFullfortArbeidsgiver__innholdstittel">
                        Avtalen er opprettet
                    </Heading>
                    <BodyShort size="small" className="opprettelseFullfortArbeidsgiver__undertittel">
                        Avtalen er nå opprettet og du kan begynne å fylle den ut. Avtalen er nå også tilgjengelig for
                        veilederne på NAV-kontoret til deltakeren.
                    </BodyShort>
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
