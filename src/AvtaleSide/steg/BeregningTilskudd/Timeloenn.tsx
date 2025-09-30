import React, { useContext, useState } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import ValutaInput from '@/komponenter/form/ValutaInput';

interface Props {
    cls: BEMWrapper;
}

const Timeloenn: React.FC<Props> = ({ cls }: Props) => {
    const loennsberegningTyper = ['Årslønn', 'Månedslønn', 'Ukelønn', 'Dagslønn', 'Timelønn'].map((type: string) => ({
        label: type,
        value: type,
    }));

    const { avtale } = useContext(AvtaleContext);
    const [selectedType, setSelectedType] = useState(avtale.gjeldendeInnhold.mentorloennsberegningTyper || 'Årslønn');
    const [mentorLoenn, setMentorLoenn] = useState(avtale.gjeldendeInnhold.mentorLonn);

    return (
        <Row className={cls.element('rad')}>
            <Column md="8" className={cls.element('mentorTimelonn')}>
                <SelectInput
                    label="Lønn per arbeidsavtale"
                    name="mentorTimelonn"
                    size="medium"
                    options={loennsberegningTyper}
                    value={selectedType}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedType(event.target.value);
                    }}
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
                    onChange={(event) => setMentorLoenn(parseFloat(event.target.value))}
                    //onBlur={(event) => settOgKalkulerBeregningsverdier({ manedslonn: parseFloat(event.target.value) })}
                    min={0}
                />
            </Column>
        </Row>
    );
};
export default Timeloenn;
