import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import ValutaInput from '@/komponenter/form/ValutaInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Beregningsgrunnlag } from '@/types/avtale';
import React, { FunctionComponent, useContext, useState } from 'react';
import EndringsTilskuddUtregningPanel from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndringsTilskuddUtregningPanel';
import { AvtaleContext } from '@/AvtaleProvider';
import OtpProsentInput from '@/AvtaleSide/steg/BeregningTilskudd/OtpProsentInput';
import { oppdateretilskuddsBeregning } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Normaltekst } from 'nav-frontend-typografi';
import './EndreTilskuddsberegning.less';
import Lenke from 'nav-frontend-lenker';
import { Task } from '@navikt/ds-icons/cjs';

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

const EndreTilskuddsberegning: FunctionComponent = () => {
    const cls = BEMHelper('endreTilskuddsBeregning');
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
            await oppdateretilskuddsBeregning(context.avtale, nyBeregning);
        } catch (err) {
            console.warn('feilet med å lagre oppdaterte beregninger: ', err);
        }
        setModalApen(false);
        await context.hentAvtale(context.avtale.id);
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
        <div className={cls.className}>
            <ValutaInput
                name="manedslonn"
                bredde="M"
                label="Månedslønn før skatt"
                value={nyBeregning.manedslonn}
                onChange={event => settNyBeregningsverdi('manedslonn', parseFloat(event.target.value))}
                min={0}
            />
            <div className={cls.element('radioPanel')}>
                <Normaltekst className={cls.element('radioPanel', 'tittel')}>
                    Velg sats for feriepenger som arbeidstaker skal ha
                </Normaltekst>
                <RadioPanelGruppeHorisontal
                    radios={mapAvgiftSatser(ferieSatser)}
                    name="feriepengesats"
                    checked={nyBeregning.feriepengesats + ''}
                    legend=""
                    onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                        settNyBeregningsverdi('feriepengesats', parseFloat(verdi))
                    }
                />
            </div>

            <OtpProsentInput
                name="tjenestepensjon"
                bredde="M"
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
                bredde="m"
                options={mapAvgiftSatser(arbeidsgiveravgiftSatser)}
                label="Sats for arbeidsgiveravgift"
                children=""
                value={nyBeregning.arbeidsgiveravgift}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    settNyBeregningsverdi('arbeidsgiveravgift', parseFloat(event.target.value))
                }
            />
            <div className={cls.element('panel')}>
                <EndringsTilskuddUtregningPanel endreBeregning={{ ...nyBeregning }} avtale={context.avtale} />
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                onClick={event => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <Task className={cls.element('ikon')} />
                </div>
                Endre tilskuddsberegning
            </Lenke>
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

export default EndreTilskuddsberegning;