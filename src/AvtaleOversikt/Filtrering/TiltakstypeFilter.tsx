import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TiltaksType } from '@/types/avtale';
import { Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

export type FiltreringMedBeslutterProps = { erBeslutter: boolean };
const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = (props) => {
    const { endreFilter, filtre } = useFilter();
    const { vtaoTiltakToggle } = useFeatureToggles();

    const alleTiltakstyperBeslutter: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
        { value: 'SOMMERJOBB', label: 'Sommerjobb' },
    ];

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
        { value: 'SOMMERJOBB', label: 'Sommerjobb' },
        { value: 'MENTOR', label: 'Mentor' },
        { value: 'INKLUDERINGSTILSKUDD', label: 'Inkluderingstilskudd' },
        vtaoTiltakToggle ? { value: 'VTAO', label: 'VTA-oppfølging' } : null,
    ].filter((x) => x !== null) as OptionProps[];

    const tiltakstyper = props.erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            <RadioGroup legend="" size="small" value={filtre.tiltakstype || ('' && filtre.tiltakstype === undefined)}>
                {tiltakstyper.map((tiltakstype: OptionProps, index: number) => (
                    <Radio
                        key={index}
                        name={'tiltakstype'}
                        value={tiltakstype.value}
                        onChange={(event) => {
                            const nyTiltakstype = event.currentTarget.value as TiltaksType;
                            endreFilter({ tiltakstype: nyTiltakstype });
                        }}
                        role="radio"
                    >
                        {tiltakstype.label}
                    </Radio>
                ))}
            </RadioGroup>
        </Filter>
    );
};

export default TiltakstypeFilter;
