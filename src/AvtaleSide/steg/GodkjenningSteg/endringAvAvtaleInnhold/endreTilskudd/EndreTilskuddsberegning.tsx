import { useAvtale } from '@/AvtaleProvider';
import EndringsTilskuddUtregningPanel from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndringsTilskuddUtregningPanel';
import ProsentInput from '@/komponenter/form/ProsentInput';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdateretilskuddsBeregning } from '@/services/rest-service';
import { ArbeidsAvgiftSats, Beregningsgrunnlag, FerieSatser, Varighet } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Link, Select } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';
import './EndreTilskuddsberegning.less';
import { formaterNorskeTall } from '@/utils';
import { TasklistIcon } from '@navikt/aksel-icons';
import KronerInput from '@/komponenter/form/KronerInput';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';

export type EndreBeregning = Pick<
    Beregningsgrunnlag & Varighet,
    'manedslonn' | 'otpSats' | 'feriepengesats' | 'arbeidsgiveravgift' | 'stillingprosent' | 'lonnstilskuddProsent'
>;

const ARBEIDSGIVER_AVGIFT_SATSER: ArbeidsAvgiftSats[] = [0.141, 0.106, 0.079, 0.064, 0.051, 0];
const FERIE_SATSER: FerieSatser[] = [0.143, 0.125, 0.12, 0.102, 0];

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
                    <TasklistIcon className={cls.element('ikon')} />
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
                                size="small"
                                label="Tilskuddsprosent"
                                verdi={nyBeregning.lonnstilskuddProsent}
                                settVerdi={(verdi) => {
                                    settNyBeregningsverdi('lonnstilskuddProsent', verdi);
                                }}
                                min={0}
                                maks={75}
                                prosentType="heltall"
                            />
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    <KronerInput
                        name="manedslonn"
                        size="medium"
                        label="Månedslønn før skatt"
                        verdi={nyBeregning.manedslonn}
                        settVerdi={(verdi) => settNyBeregningsverdi('manedslonn', verdi)}
                    />
                    <VerticalSpacer rem={1} />
                    <Select
                        label="Velg sats for feriepenger som arbeidstaker skal ha"
                        value={nyBeregning.feriepengesats}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            settNyBeregningsverdi('feriepengesats', parseFloat(event.target.value))
                        }
                    >
                        {getAvgiftsatserForRadioValg(FERIE_SATSER).map((radio) => (
                            <option key={radio.label} value={radio.value}>
                                {radio.label}
                            </option>
                        ))}
                    </Select>

                    <VerticalSpacer rem={1} />

                    <ObligatoriskTjenestepensjon
                        verdi={nyBeregning.otpSats}
                        settVerdi={(otpSats) => settNyBeregningsverdi('otpSats', otpSats)}
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
