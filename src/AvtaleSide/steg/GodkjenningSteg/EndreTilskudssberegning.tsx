import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import ValutaInput from '@/komponenter/form/ValutaInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Beregningsgrunnlag } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';

type EndreBeregning = Pick<Beregningsgrunnlag, 'manedslonn' | 'feriepengesats' | 'arbeidsgiveravgift' | 'otpSats'>;

const feriepengeAlternativer = () => {
    const satser = [0.12, 0.143, 0.102, 0.125];
    return satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));
};

const EndreTilskudssberegning: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const [nyBeregning, setNyBeregning] = useState<EndreBeregning>({});

    const endreBeregning = async () => {
        //...
    };

    const endreBeregningInnhold = (
        <>
            <Undertittel>Månedslønn</Undertittel>
            <ValutaInput
                name="manedslonn"
                bredde="S"
                label="Månedslønn før skatt"
                value={nyBeregning.manedslonn}
                onChange={event => {
                    setNyBeregning({ manedslonn: parseFloat(event.target.value) });
                }}
                min={0}
            />
            <Undertittel>Feriepengesats</Undertittel>
            <RadioPanelGruppeHorisontal
                radios={feriepengeAlternativer()}
                name="feriepengesats"
                checked={nyBeregning.feriepengesats + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    setNyBeregning({ feriepengesats: parseFloat(verdi) })
                }
            />
        </>
    );

    return (
        <>
            <div>
                <Knapp onClick={() => setModalApen(true)}>Endre tilskuddsberegning</Knapp>
            </div>

            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre tilskuddsberegning"
                modalIsOpen={modalApen}
                bekreftOnClick={endreBeregning}
                lukkModal={() => setModalApen(false)}
                varselTekst={endreBeregningInnhold}
            />
        </>
    );
};

export default EndreTilskudssberegning;
