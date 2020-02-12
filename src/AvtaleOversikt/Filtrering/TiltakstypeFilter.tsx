import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { TiltaksType } from '@/types/avtale';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { Radio } from 'nav-frontend-skjema';

const TiltakstypeFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtTiltakstype, setValgtTiltakstype] = useState<TiltaksType | ''>('');

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    return (
        <Filter tittel="Filtrer på tiltakstype">
            {alleTiltakstyper.map(tiltakstype => (
                <Radio
                    key={tiltakstype.label}
                    label={tiltakstype.label}
                    name={'tiltakstype'}
                    value={tiltakstype.value}
                    checked={tiltakstype.value === valgtTiltakstype}
                    onChange={event => {
                        const nyTiltakstype = event.currentTarget.value as TiltaksType;
                        setValgtTiltakstype(nyTiltakstype);
                        props.endreSøk('tiltakstype', nyTiltakstype);
                    }}
                />
            ))}
        </Filter>
    );
};

export default TiltakstypeFilter;
