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

const Timeloenn: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const [lonn, setLonn] = useState(585000);
    const [type, setType] = useState<LonnType>('Årslønn');
    const [stillingsprosent, setStillingsprosent] = useState(100);

    const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nyLoennstype = e.target.value as LonnType;
        if (nyLoennstype === type) return;

        const newLonn = (lonn / HOURS_PER_UNIT[type]) * HOURS_PER_UNIT[nyLoennstype];
        setLonn(newLonn);
        setType(nyLoennstype);
    };

    const handleMentorLoennChange = (raw: string) => {
        setLonn(parseFloat(raw) || 0);
    };

    useEffect(() => {
        const currentTimelonn = avtale.gjeldendeInnhold.mentorTimelonn || 0;
        if (beregnetTimelonn !== currentTimelonn) {
            settOgKalkulerBeregningsverdier({ mentorTimelonn: beregnetTimelonn });
        }
    }, [lonn, stillingsprosent]);

    const beregnetTimelonn = (() => {
        if (type === 'Timelønn') {
            return lonn;
        }
        if (stillingsprosent > 0) {
            return (lonn / HOURS_PER_UNIT[type]) * (100 / stillingsprosent);
        }
        return 0;
    })();

    return (
        <div className={cls.className}>
            <Row className={cls.element('rad')}>
                <Column md="7">
                    <SelectInput
                        label="Lønn per arbeidsavtale"
                        name="mentorTimelonn"
                        options={LONN_OPTIONS}
                        value={type}
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
                        label={'Mentors ' + type.charAt(0).toLowerCase() + type.slice(1)}
                        autoComplete={'off'}
                        value={lonn}
                        onChange={(e) => handleMentorLoennChange(e.target.value)}
                        min={0}
                    />
                </Column>
                {type !== 'Timelønn' && (
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
            {type !== 'Timelønn' && (
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
