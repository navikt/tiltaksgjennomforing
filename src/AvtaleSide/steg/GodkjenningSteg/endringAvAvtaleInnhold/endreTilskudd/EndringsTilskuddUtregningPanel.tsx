import React, { FunctionComponent, useEffect, useState } from 'react';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { Avtale } from '@/types/avtale';
import { oppdateretilskuddsBeregningDryRun } from '@/services/rest-service';

interface Props {
    endreBeregning: EndreBeregning;
    avtale: Avtale;
}
const EndringsTilskuddUtregningPanel: FunctionComponent<Props> = props => {
    const { manedslonn, feriepengesats, arbeidsgiveravgift, otpSats } = props.endreBeregning;
    const [nyAvtale, settNyAvtale] = useState<Avtale>(props.avtale);

    useEffect(() => {
        const kalkulerNyBeregningsverdi = async (): Promise<void> => {
            try {
                const avtale = await oppdateretilskuddsBeregningDryRun(props.avtale, props.endreBeregning);
                settNyAvtale(prevState => ({ ...prevState, ...avtale }));
            } catch (error) {
                console.warn('feilet med å oppdatere utregningene: ', error);
            }
        };

        kalkulerNyBeregningsverdi();
    }, [props.endreBeregning, props.avtale]);

    return (
        <div>
            <UtregningPanel
                manedslonn={manedslonn}
                feriepengesats={feriepengesats}
                arbeidsgiveravgift={arbeidsgiveravgift}
                otpSats={otpSats}
                stillingprosent={nyAvtale.stillingprosent}
                otpBelop={nyAvtale.otpBelop}
                arbeidsgiveravgiftBelop={nyAvtale.arbeidsgiveravgiftBelop}
                feriepengerBelop={nyAvtale.feriepengerBelop}
                sumLonnsutgifter={nyAvtale.sumLonnsutgifter}
                lonnstilskuddProsent={nyAvtale.lonnstilskuddProsent}
                datoForRedusertProsent={nyAvtale.datoForRedusertProsent}
                sumLonnstilskudd={nyAvtale.sumLonnstilskudd}
                sumLønnstilskuddRedusert={nyAvtale.sumLønnstilskuddRedusert}
            />
        </div>
    );
};
export default EndringsTilskuddUtregningPanel;
