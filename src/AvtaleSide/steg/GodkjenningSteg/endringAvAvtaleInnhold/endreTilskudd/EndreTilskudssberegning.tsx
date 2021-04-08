import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import ValutaInput from '@/komponenter/form/ValutaInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Beregningsgrunnlag } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useContext, useState } from 'react';
import EndringsTilskuddUtregningPanel from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndringsTilskuddUtregningPanel';
import { AvtaleContext } from '@/AvtaleProvider';
import OtpProsentInput from '@/AvtaleSide/steg/BeregningTilskudd/OtpProsentInput';
import { oppdateretilskuddsBeregning } from '@/services/rest-service';

export type EndreBeregning = Pick<
    Beregningsgrunnlag,
    'manedslonn' | 'otpSats' | 'feriepengesats' | 'arbeidsgiveravgift'
>;

const arbeidsgiveravgiftSatser = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
const ferieSatser = [0.12, 0.143, 0.102, 0.125];

const mapAvgiftSatser = (satser: number[]) =>
    satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));

const EndreTilskudssberegning: FunctionComponent = () => {
    const context = useContext(AvtaleContext);
    const { manedslonn, feriepengesats, otpSats, arbeidsgiveravgift } = context.avtale;
    const [modalApen, setModalApen] = useState(false);
    const [nyBeregning, setNyBeregning] = useState<EndreBeregning>({
        manedslonn: manedslonn,
        otpSats: otpSats,
        feriepengesats: feriepengesats,
        arbeidsgiveravgift: arbeidsgiveravgift,
    });

    const endreBeregning = async (): Promise<void> => {
        try {
            const oppdatertAvtale = await oppdateretilskuddsBeregning(context.avtale, nyBeregning);
            context.settNyAvtale(oppdatertAvtale);
        } catch (err) {
            console.warn('feilet med å lagre oppdaterte beregninger: ', err);
        }
    };

    const settNyBeregningsverdi = async <K extends keyof EndreBeregning, V extends EndreBeregning>(
        key: K,
        verdi: V[K]
    ) => {
        await setNyBeregning(prevState => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const endreBeregningInnhold = (
        <>
            <ValutaInput
                name="manedslonn"
                bredde="S"
                label="Månedslønn før skatt"
                value={nyBeregning.manedslonn}
                onChange={event => settNyBeregningsverdi('manedslonn', parseFloat(event.target.value))}
                min={0}
            />
            <RadioPanelGruppeHorisontal
                radios={mapAvgiftSatser(ferieSatser)}
                name="feriepengesats"
                checked={nyBeregning.feriepengesats + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    settNyBeregningsverdi('feriepengesats', parseFloat(verdi))
                }
            />
            <OtpProsentInput
                name="tjenestepensjon"
                bredde="S"
                max={30}
                min={0}
                label="Obligatorisk tjenestepensjon fra 0 - 30%"
                value={nyBeregning.otpSats}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settNyBeregningsverdi('otpSats', parseFloat(event.target.value) / 100)
                }
                onBlur={() => void 0}
            />
            <SelectInput
                name="arbeidsgiveravgift"
                bredde="s"
                options={mapAvgiftSatser(arbeidsgiveravgiftSatser)}
                label="Sats for arbeidsgiveravgift"
                children=""
                value={nyBeregning.arbeidsgiveravgift}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    settNyBeregningsverdi('arbeidsgiveravgift', parseFloat(event.target.value))
                }
            />
            <EndringsTilskuddUtregningPanel endreBeregning={{ ...nyBeregning }} avtale={context.avtale} />
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
