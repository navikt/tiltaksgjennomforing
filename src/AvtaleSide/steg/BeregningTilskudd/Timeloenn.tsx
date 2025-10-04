import React, { useContext, useState, useMemo } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ValutaInput from '@/komponenter/form/ValutaInput';
import ProsentInput from '@/komponenter/form/ProsentInput';

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

const Timeloenn: React.FC<Props> = ({ cls }: Props) => {
    const { avtale } = useContext(AvtaleContext);

    const options = useMemo(
        () => (Object.keys(HOURS_PER_UNIT) as LonnType[]).map((unit) => ({ label: unit, value: unit })),
        [],
    );

    const [selectedType, setSelectedType] = useState<LonnType>(
        (avtale.gjeldendeInnhold.mentorloennsberegningTyper as LonnType) || 'Årslønn',
    );

    const [mentorLoenn, setMentorLoenn] = useState(avtale.gjeldendeInnhold.mentorLonn || 975000);
    const [stillingsprosent, setStillingsprosent] = useState(avtale.gjeldendeInnhold.mentorStillingsprosent || 100);

    const baseHourly = mentorLoenn / HOURS_PER_UNIT[selectedType];

    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as LonnType;
        if (newType === selectedType) return;
        const newAmount = baseHourly * HOURS_PER_UNIT[newType];
        setMentorLoenn(+newAmount.toFixed(2));
        setSelectedType(newType);
    };

    const handleMentorLoennChange = (raw: string) => {
        const num = parseFloat(raw);
        setMentorLoenn(isNaN(num) ? 0 : num);
    };

    // const beregnetTimeloenn = +(baseHourly * (100 / stillingsprosent)).toFixed(2);

    const beregnetTimeloenn = useMemo(() => {
        if (stillingsprosent <= 0) return 0;
        // If proportional scaling intended:
        return Number((baseHourly * (100 / stillingsprosent)).toFixed(2));
    }, [baseHourly, stillingsprosent]);

    return (
        <Row className={cls.element('rad')}>
            <Column md="8" className={cls.element('mentorTimelonn')}>
                <SelectInput
                    label="Lønn per arbeidsavtale"
                    name="mentorTimelonn"
                    size="medium"
                    options={options}
                    value={selectedType}
                    onChange={handleSelectedTypeChange}
                    children=""
                />
            </Column>
            <VerticalSpacer rem={6} />
            <Column md="8" className={cls.element('mentorLonn')}>
                <ValutaInput
                    className="input"
                    name="manedslonn"
                    size="medium"
                    label={selectedType}
                    autoComplete={'off'}
                    value={mentorLoenn}
                    maximumFractionDigits={2}
                    useGrouping={true}
                    onChange={(e) => handleMentorLoennChange(e.target.value)}
                    //onBlur={(event) => settOgKalkulerBeregningsverdier({ manedslonn: parseFloat(event.target.value) })}
                    min={0}
                />
            </Column>
            <ProsentInput
                name="lonnstilskuddProsent"
                width="S"
                label="Stillingsprosent"
                value={stillingsprosent}
                min={0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStillingsprosent(parseInt(e.target.value, 10) || 0)
                }
            />
            <Column>
                <ValutaInput
                    value={beregnetTimeloenn}
                    label="Beregnet timelønn"
                    enableWheelStep={true}
                    readOnly={true}
                    useGrouping={true}
                    maximumFractionDigits={2}
                />
            </Column>
        </Row>
    );
};
export default Timeloenn;
