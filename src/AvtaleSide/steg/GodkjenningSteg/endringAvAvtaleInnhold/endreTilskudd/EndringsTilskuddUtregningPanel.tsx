import React, { FunctionComponent, useEffect } from 'react';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
// import * as RestService from '@/services/rest-service';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskudssberegning';
import { Avtale } from '@/types/avtale';

interface Props {
    endreBeregning: EndreBeregning;
    avtale: Avtale;
}
const EndringsTilskuddUtregningPanel: FunctionComponent<Props> = props => {
    console.log('props: ', props.endreBeregning);
    const { manedslonn, feriepengesats, arbeidsgiveravgift, otpSats } = props.endreBeregning;

    useEffect(() => {
        const kalkulerNyBeregningsverdi = async (): Promise<void> => {
            try {
                const nyAvtale = { ...props.avtale, ...props.endreBeregning };
                console.log('nyAvtale: ', nyAvtale);
                // const oppdatertBeregning = await RestService.lagreAvtaleDryRun(nyAvtale);
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
                stillingprosent={props.avtale.stillingprosent}
                otpBelop={props.avtale.otpBelop}
                arbeidsgiveravgiftBelop={props.avtale.arbeidsgiveravgiftBelop}
                feriepengerBelop={props.avtale.feriepengerBelop}
                sumLonnsutgifter={props.avtale.sumLonnsutgifter}
                lonnstilskuddProsent={props.avtale.lonnstilskuddProsent}
                datoForRedusertProsent={props.avtale.datoForRedusertProsent}
                sumLonnstilskudd={props.avtale.sumLonnstilskudd}
                sumLønnstilskuddRedusert={props.avtale.sumLønnstilskuddRedusert}
            />
        </div>
    );
};
export default EndringsTilskuddUtregningPanel;
