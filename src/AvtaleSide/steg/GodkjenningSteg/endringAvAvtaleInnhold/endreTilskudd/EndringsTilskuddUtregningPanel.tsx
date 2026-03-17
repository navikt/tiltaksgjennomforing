import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { oppdateretilskuddsBeregningDryRun } from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { debounce } from '@navikt/ds-react';

interface Props {
    endreBeregning: EndreBeregning;
    avtale: Avtale;
}

const EndringsTilskuddUtregningPanel: FunctionComponent<Props> = (props) => {
    const { manedslonn, feriepengesats, arbeidsgiveravgift, otpSats, stillingprosent } = props.endreBeregning;
    const [nyAvtale, settNyAvtale] = useState<Avtale>(props.avtale);

    const kalkulerNyBeregningsverdi = useCallback(
        debounce(async (avtale: Avtale, endreBeregning: EndreBeregning) => {
            try {
                const oppdatertAvtale = await oppdateretilskuddsBeregningDryRun(avtale, endreBeregning);
                settNyAvtale((prevState) => ({ ...prevState, ...oppdatertAvtale }));
            } catch (error) {
                console.warn('feilet med å oppdatere utregningene: ', error);
            }
        }, 250),
        [oppdateretilskuddsBeregningDryRun, settNyAvtale],
    );

    useEffect(() => {
        kalkulerNyBeregningsverdi(props.avtale, props.endreBeregning);
    }, [kalkulerNyBeregningsverdi, props.endreBeregning, props.avtale]);

    return (
        <div>
            <UtregningPanel
                arbeidsgiveravgift={arbeidsgiveravgift}
                arbeidsgiveravgiftBelop={nyAvtale.gjeldendeInnhold.arbeidsgiveravgiftBelop}
                feriepengerBelop={nyAvtale.gjeldendeInnhold.feriepengerBelop}
                feriepengesats={feriepengesats}
                lonnstilskuddProsent={nyAvtale.gjeldendeInnhold.lonnstilskuddProsent}
                manedslonn={manedslonn}
                otpBelop={nyAvtale.gjeldendeInnhold.otpBelop}
                otpSats={otpSats}
                stillingprosent={stillingprosent}
                sumLonnstilskudd={nyAvtale.gjeldendeInnhold.sumLonnstilskudd}
                sumLonnsutgifter={nyAvtale.gjeldendeInnhold.sumLonnsutgifter}
                tilskuddstrinn={nyAvtale.gjeldendeInnhold.tilskuddstrinn}
                tiltakstype={nyAvtale.tiltakstype}
            />
        </div>
    );
};
export default EndringsTilskuddUtregningPanel;
