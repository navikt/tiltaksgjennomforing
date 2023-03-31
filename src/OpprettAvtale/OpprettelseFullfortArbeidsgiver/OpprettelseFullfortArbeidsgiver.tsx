import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LenkeKnapp from '@/komponenter/lenkeknapp/LenkeKnapp';
import VeilederpanelMedAvsjekkIkon from '@/komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import { pathTilKontaktinformasjonSteg } from '@/paths';
import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { useParams } from 'react-router';
import './OpprettelseFullfortArbeidsgiver.less';

const OpprettelseFullfortArbeidsgiver: React.FunctionComponent = () => {
    //const avtaleId = props.match.params.avtaleId;
    const { avtaleId } = useParams();
    
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
                <LenkeKnapp path={pathTilKontaktinformasjonSteg(avtaleId!)}>Gå til avtalen</LenkeKnapp>
                <VerticalSpacer rem={1} />
                <TilbakeTilOversiktLenke />
            </div>
        </>
    );
};

export default OpprettelseFullfortArbeidsgiver;
