import { AvtaleContext } from '@/AvtaleProvider';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import React, { FunctionComponent, useContext } from 'react';
import EndreTilskudssberegning from './endringAvAvtaleInnhold/endreTilskudd/EndreTilskudssberegning';
import ForlengAvtale from './ForlengAvtale';

const BehandleAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const status = avtaleContext.avtale.statusSomEnum;
    const kanLåsesOpp = avtaleContext.avtale.kanLåsesOpp;
    const erLønnstilskudd =
        avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtaleContext.avtale.tiltakstype === 'SOMMERJOBB';

    const featureToggleContext = useContext(FeatureToggleContext);
    const behandleAvtaleToggle = featureToggleContext[Feature.BehandleAvtale];

    return (
        <div>
            <SkjemaTittel>Behandle avtale</SkjemaTittel>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {behandleAvtaleToggle && (
                    <>
                        {status === 'KLAR_FOR_OPPSTART' && <LaasOppKnapp laasOpp={avtaleContext.laasOpp} />}
                        {status === 'GJENNOMFØRES' && (
                            <>
                                <ForlengAvtale />
                                {erLønnstilskudd && <EndreTilskudssberegning />}
                            </>
                        )}
                    </>
                )}
                {!behandleAvtaleToggle && kanLåsesOpp && <LaasOppKnapp laasOpp={avtaleContext.laasOpp} />}
            </div>
        </div>
    );
};

export default BehandleAvtale;
