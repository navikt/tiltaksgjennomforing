import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import {lagreAvtale, oppdateretilskuddsBeregningDryRun} from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import React, { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    endreBeregning: EndreBeregning;
    avtale: Avtale;
}

const EndringsTilskuddUtregningPanel: FunctionComponent<Props> = (props) => {
    const { manedslonn, feriepengesats, arbeidsgiveravgift, otpSats, stillingprosent } = props.endreBeregning;
    const [nyAvtale, settNyAvtale] = useState<Avtale>(props.avtale);

    useEffect(() => {
        const kalkulerNyBeregningsverdi = async (): Promise<void> => {
            try {
                const avtale = await oppdateretilskuddsBeregningDryRun(props.avtale, props.endreBeregning);
                settNyAvtale((prevState) => ({ ...prevState, ...avtale }));
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
                stillingprosent={stillingprosent}
                otpBelop={nyAvtale.gjeldendeInnhold.otpBelop}
                arbeidsgiveravgiftBelop={nyAvtale.gjeldendeInnhold.arbeidsgiveravgiftBelop}
                feriepengerBelop={nyAvtale.gjeldendeInnhold.feriepengerBelop}
                sumLonnsutgifter={nyAvtale.gjeldendeInnhold.sumLonnsutgifter}
                lonnstilskuddProsent={nyAvtale.gjeldendeInnhold.lonnstilskuddProsent}
                datoForRedusertProsent={nyAvtale.gjeldendeInnhold.datoForRedusertProsent}
                sumLonnstilskudd={nyAvtale.gjeldendeInnhold.sumLonnstilskudd}
                sumLønnstilskuddRedusert={nyAvtale.gjeldendeInnhold.sumLønnstilskuddRedusert}
            />
        </div>
    );
};
export default EndringsTilskuddUtregningPanel;
