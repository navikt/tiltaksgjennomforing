import { useAvtale } from '@/AvtaleProvider';
import EndringsTilskuddUtregningPanel from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndringsTilskuddUtregningPanel';
import ProsentInput from '@/komponenter/form/ProsentInput';
import SelectInput from '@/komponenter/form/SelectInput';
import ValutaInput from '@/komponenter/form/ValutaInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import RadioPanelGruppeHorisontal from '@/komponenter/radiopanel/RadioPanelGruppeHorisontal';
import { oppdateretilskuddsBeregning } from '@/services/rest-service';
import { ArbeidsAvgiftSats, Beregningsgrunnlag, FerieSatser, Varighet } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Task } from '@navikt/ds-icons/cjs';
import { BodyShort, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';
import './EndreTilskuddsberegning.less';
import { formaterNorskeTall } from '@/utils';

export type EndreBeregning = Pick<
    Beregningsgrunnlag & Varighet,
    'manedslonn' | 'otpSats' | 'feriepengesats' | 'arbeidsgiveravgift' | 'stillingprosent' | 'lonnstilskuddProsent'
>;

const ARBEIDSGIVER_AVGIFT_SATSER: ArbeidsAvgiftSats[] = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
const FERIE_SATSER: FerieSatser[] = [0, 0.12, 0.143, 0.102, 0.125];

function getAvgiftsatserForRadioValg(satser: number[]): Array<{ label: string; value: string }> {
    return satser.map((sats: number) => ({
        label: formaterNorskeTall(sats * 100) + ' %',
        value: sats.toString(),
    }));
}

const EndreTilskuddsberegning: FunctionComponent = () => {
    const cls = BEMHelper('endreTilskuddsBeregning');
    const [modalApen, setModalApen] = useState(false);
    const { avtale, hentAvtale } = useAvtale();

    const { tiltakstype, gjeldendeInnhold } = avtale;
    const { manedslonn, feriepengesats, otpSats, arbeidsgiveravgift, stillingprosent, lonnstilskuddProsent } =
        gjeldendeInnhold;

    const [nyBeregning, setNyBeregning] = useState<EndreBeregning>({
        stillingprosent: stillingprosent,
        manedslonn: manedslonn,
        otpSats: otpSats,
        feriepengesats: feriepengesats,
        arbeidsgiveravgift: arbeidsgiveravgift,
        lonnstilskuddProsent: lonnstilskuddProsent,
    });

    const endreBeregning = async (): Promise<void> => {
        await oppdateretilskuddsBeregning(avtale, nyBeregning);
        setModalApen(false);
        await hentAvtale(avtale.id);
    };

    const settNyBeregningsverdi = <K extends keyof EndreBeregning, V extends EndreBeregning>(key: K, verdi: V[K]) => {
        setNyBeregning((prevState) => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    return (
        <>
            <Link
                onClick={(event) => {
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
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre tilskuddsberegning"
                modalIsOpen={modalApen}
                bekreftOnClick={endreBeregning}
                lukkModal={() => setModalApen(false)}
            >
                <div className={cls.className}>
                    {'VARIG_LONNSTILSKUDD' === tiltakstype && (
                        <>
                            <ProsentInput
                                name="lonnstilskuddProsent"
                                width="S"
                                label="Tilskuddsprosent"
                                value={nyBeregning.lonnstilskuddProsent}
                                onChange={(event) => {
                                    settNyBeregningsverdi('lonnstilskuddProsent', parseFloat(event.target.value));
                                }}
                                min={0}
                                max={75}
                            />
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    <ValutaInput
                        name="manedslonn"
                        size="medium"
                        label="Månedslønn før skatt"
                        value={nyBeregning.manedslonn}
                        onChange={(event: any) => settNyBeregningsverdi('manedslonn', parseFloat(event.target.value))}
                        min={0}
                    />
                    <div className={cls.element('radioPanel')}>
                        <BodyShort size="small" className={cls.element('radioPanel-tittel')}>
                            Velg sats for feriepenger som arbeidstaker skal ha
                        </BodyShort>
                        <RadioPanelGruppeHorisontal
                            radios={getAvgiftsatserForRadioValg(FERIE_SATSER)}
                            name="feriepengesats"
                            checked={nyBeregning.feriepengesats + ''}
                            legend=""
                            onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                                settNyBeregningsverdi('feriepengesats', parseFloat(verdi))
                            }
                        />
                    </div>

                    <ProsentInput
                        size="medium"
                        label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
                        min={0}
                        max={30}
                        maxLength={4}
                        autoComplete={'off'}
                        value={
                            nyBeregning.otpSats !== undefined && nyBeregning.otpSats !== null
                                ? formaterNorskeTall(nyBeregning.otpSats * 100)
                                : ''
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settNyBeregningsverdi(
                                'otpSats',
                                event.target.value === '' ? undefined : parseFloat(event.target.value) / 100,
                            )
                        }
                    />
                    <VerticalSpacer rem={1} />
                    <SelectInput
                        name="arbeidsgiveravgift"
                        size="medium"
                        options={getAvgiftsatserForRadioValg(ARBEIDSGIVER_AVGIFT_SATSER)}
                        label="Sats for arbeidsgiveravgift"
                        children=""
                        value={nyBeregning.arbeidsgiveravgift}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            settNyBeregningsverdi('arbeidsgiveravgift', parseFloat(event.target.value))
                        }
                    />
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('panel')}>
                        <EndringsTilskuddUtregningPanel endreBeregning={{ ...nyBeregning }} avtale={avtale} />
                    </div>
                </div>
            </BekreftelseModal>
        </>
    );
};

export default EndreTilskuddsberegning;
