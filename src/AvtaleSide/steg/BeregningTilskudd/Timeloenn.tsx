import React, { useContext, useEffect, useState } from 'react';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ValutaInput from '@/komponenter/form/ValutaInput';
import ProsentInput from '@/komponenter/form/ProsentInput';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';
import { Column, Row } from '@/komponenter/NavGrid/Grid';

interface Props {
    cls: BEMWrapper;
}

const HOURS_PER_UNIT = Object.freeze({
    Årslønn: 1950,
    Månedslønn: 1950 / 12,
    Ukelønn: 1950 / 52,
    Dagslønn: 1950 / 260,
    Timelønn: 1,
} as const);

type LonnType = keyof typeof HOURS_PER_UNIT;

const LONN_OPTIONS = (Object.keys(HOURS_PER_UNIT) as LonnType[]).map((unit) => ({
    label: unit,
    value: unit,
}));

interface LonnState {
    lonn: number;
    type: LonnType;
}

const Timeloenn: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const [lonnState, setLonnState] = useState<LonnState>({ lonn: 780000, type: 'Årslønn' });
    const [stillingsprosent, setStillingsprosent] = useState(100);
    const [beregnetTimelonn, setBeregnetTimelonn] = useState<number>(0);

    //const baseHourly = mentorLoenn / HOURS_PER_UNIT[selectedType];

    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as LonnType;
        if (newType === lonnState.type) return;

        const newAmount = (lonnState.lonn / HOURS_PER_UNIT[lonnState.type]) * HOURS_PER_UNIT[newType];
        setLonnState({ lonn: newAmount, type: newType });
    };

    const handleMentorLoennChange = (raw: string) => {
        // Handle culture-specific number formats
        const cleaned = raw.replace(/\s/g, '').replace(',', '.');
        const n = parseFloat(cleaned);
        if (!Number.isNaN(n)) {
            setLonnState((prevState) => ({ ...prevState, lonn: n }));
        }
    };

    useEffect(() => {
        let hourly: number;

        if (lonnState.type === 'Timelønn') {
            hourly = lonnState.lonn;
        } else {
            if (stillingsprosent > 0) {
                hourly = (lonnState.lonn / HOURS_PER_UNIT[lonnState.type]) * (100 / stillingsprosent);
            } else {
                hourly = 0;
            }
        }

        setBeregnetTimelonn(hourly);

        // Round the value before sending it to the context to match what the context expects.
        const currentTimelonn = avtale.gjeldendeInnhold.mentorTimelonn || 0;
        if (hourly.toFixed(2) !== currentTimelonn.toFixed(2)) {
            // Send the full-precision value to the context.
            settOgKalkulerBeregningsverdier({ mentorTimelonn: hourly });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lonnState, stillingsprosent]); // Dependency on the state object

    return (
        <div className={cls.className}>
            <Row className={cls.element('rad')}>
                <Column md="7">
                    <SelectInput
                        label="Lønn per arbeidsavtale"
                        name="mentorTimelonn"
                        options={LONN_OPTIONS}
                        value={lonnState.type}
                        onChange={handleSelectedTypeChange}
                        children={''}
                    />
                </Column>
            </Row>
            <VerticalSpacer rem={1.5} />
            <Row className={cls.element('rad')}>
                <Column md="7">
                    <ValutaInput
                        className="input"
                        name="manedslonn"
                        label={'Mentors ' + lonnState.type.charAt(0).toLowerCase() + lonnState.type.slice(1)}
                        autoComplete={'off'}
                        value={lonnState.lonn}
                        onChange={(e) => handleMentorLoennChange(e.target.value)}
                        min={0}
                    />
                </Column>
                {lonnState.type !== 'Timelønn' && (
                    <Column md="5">
                        <ProsentInput
                            name="lonnstilskuddProsent"
                            label="Stillingsprosent"
                            value={stillingsprosent}
                            min={0}
                            onChange={(e) => setStillingsprosent(parseInt(e.target.value, 10) || 0)}
                        />
                    </Column>
                )}
            </Row>
            <VerticalSpacer rem={1.5} />
            {lonnState.type !== 'Timelønn' && (
                <Row className={cls.element('rad')}>
                    <Column md="7">
                        <ValutaInput value={beregnetTimelonn} label="Beregnet timelønn" readOnly />
                    </Column>
                </Row>
            )}
            <div>
                <LesMerPanel åpneLabel="Slik beregnes timelønn" lukkLabel="Lukk" className={cls.element('LesMerPanel')}>
                    <TimeloennHjelpetekst />
                </LesMerPanel>
            </div>
        </div>
    );
};
export default Timeloenn;
