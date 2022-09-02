import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import { OptionProps } from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TiltaksType } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent } from 'react';

export type FiltreringMedBeslutterProps = { erBeslutter: boolean };
const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = (props) => {
    const { endreFilter, filtre } = useFilter();

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
    ];

    const tiltakstyper = props.erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            {tiltakstyper.map((tiltakstype) => (
                <Fragment key={tiltakstype.label}>
                    <Radio
                        label={tiltakstype.label}
                        name={'tiltakstype'}
                        value={tiltakstype.value}
                        checked={
                            tiltakstype.value === filtre.tiltakstype ||
                            (tiltakstype.value === '' && filtre.tiltakstype === undefined)
                        }
                        onChange={(event) => {
                            const nyTiltakstype = event.currentTarget.value as TiltaksType;
                            endreFilter({ tiltakstype: nyTiltakstype });
                        }}
                        role="radio"
                    />
                    <VerticalSpacer rem={1} />
                </Fragment>
            ))}
        </Filter>
    );
};

export default TiltakstypeFilter;
