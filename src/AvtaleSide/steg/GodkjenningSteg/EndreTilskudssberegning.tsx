import { AvtaleContext } from '@/AvtaleProvider';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import ValutaInput from '@/komponenter/form/ValutaInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Beregningsgrunnlag } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useContext, useState } from 'react';
import UtregningPanel from '../BeregningTilskudd/UtregningPanel';
import * as RestService from '../../../services/rest-service';
import { handterFeil } from '@/utils/apiFeilUtils';

type EndreBeregning = Pick<
    Beregningsgrunnlag,
    | 'manedslonn'
    | 'feriepengesats'
    | 'arbeidsgiveravgift'
    | 'otpSats'
    | 'stillingprosent'
    | 'otpBelop'
    | 'arbeidsgiveravgiftBelop'
    | 'feriepengerBelop'
    | 'sumLonnsutgifter'
>;

const feriepengeAlternativer = () => {
    const satser = [0.12, 0.143, 0.102, 0.125];
    return satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));
};

const arbeidsgiveravgiftAlternativer = () => {
    const satser = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
    const satserVerdier = [{ label: 'Velg', value: '' }];
    satser.forEach((sats: number) =>
        satserVerdier.push({
            label: (sats * 100).toFixed(1) + ' %',
            value: sats.toString(),
        })
    );
    return satserVerdier;
};

const EndreTilskudssberegning: FunctionComponent = () => {
    const avtale = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [nyBeregning, setNyBeregning] = useState<EndreBeregning>({});

    const endreBeregning = async () => {
        //...
    };

    const settOgKalkulerBeregningsverdier = async <
        K extends keyof NonNullable<EndreBeregning>,
        T extends NonNullable<EndreBeregning>
    >(
        key: any,
        verdi: any
    ) => {
        setNyBeregning({ ...nyBeregning, key: verdi });
        try {
            const nyAvtale = { ...avtale.avtale, ...nyBeregning };

            const etterDryRun = await RestService.lagreAvtaleDryRun(nyAvtale);
        } catch (error) {
            //handterFeil(error, visFeilmelding);
        }
    };

    const endreBeregningInnhold = (
        <>
            <ValutaInput
                name="manedslonn"
                bredde="S"
                label="Månedslønn før skatt"
                value={nyBeregning.manedslonn}
                onChange={event => {
                    setNyBeregning({ ...nyBeregning, manedslonn: parseFloat(event.target.value) });
                }}
                min={0}
            />
            <RadioPanelGruppeHorisontal
                radios={feriepengeAlternativer()}
                name="feriepengesats"
                checked={nyBeregning.feriepengesats + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    setNyBeregning({ ...nyBeregning, feriepengesats: parseFloat(verdi) })
                }
            />
            <ValutaInput
                name="manedslonn"
                bredde="S"
                label="Obligatorisk tjenestpensjon fra 0 - 30 %"
                value={nyBeregning.otpSats}
                onChange={event => {
                    setNyBeregning({ ...nyBeregning, otpSats: parseFloat(event.target.value) });
                }}
                min={0}
            />
            <SelectInput
                name="arbeidsgiveravgift"
                bredde="s"
                options={arbeidsgiveravgiftAlternativer()}
                label="Sats for arbeidsgiveravgift"
                children=""
                value={nyBeregning.arbeidsgiveravgift}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setNyBeregning({ ...nyBeregning, arbeidsgiveravgift: parseFloat(event.target.value) })
                }
            />
            <UtregningPanel
                manedslonn={nyBeregning.manedslonn}
                feriepengesats={nyBeregning.feriepengesats}
                arbeidsgiveravgift={nyBeregning.arbeidsgiveravgift}
                otpSats={nyBeregning.otpSats}
                stillingprosent={avtale.avtale.stillingprosent}
                otpBelop={avtale.avtale.otpBelop}
                arbeidsgiveravgiftBelop={avtale.avtale.arbeidsgiveravgiftBelop}
                feriepengerBelop={avtale.avtale.feriepengerBelop}
                sumLonnsutgifter={avtale.avtale.sumLonnsutgifter}
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
