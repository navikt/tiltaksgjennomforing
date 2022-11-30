import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import DittForholdTilArbeidsmiljLoven from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/deltakerInstruks/tekster/DittForholdTilArbeidsmiljøloven';
import GiBeskjedHvisDuErBorteFraJobb from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/deltakerInstruks/tekster/GiBeskjedHvisDuErBorteFraJobb';
import BehandlingAvPersonopplysninger from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/deltakerInstruks/tekster/BehandlingAvPersonopplysninger';

interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const DeltakerInstruksNy: FunctionComponent<Props> = (props) => {
    const { erLaast, tiltakstype } = props;
    return (
        <>
            {!erLaast && <BodyShort size="small">Når du godkjenner avtalen godtar du kravene fra NAV</BodyShort>}
            <VeilederpanelMedUtklippstavleIkon>
                <DittForholdTilArbeidsmiljLoven tiltakstype={tiltakstype} />
                <GiBeskjedHvisDuErBorteFraJobb tiltakstype={tiltakstype} />
                <BehandlingAvPersonopplysninger tiltakstype={tiltakstype} />
            </VeilederpanelMedUtklippstavleIkon>
        </>
    );
};

export default DeltakerInstruksNy;
