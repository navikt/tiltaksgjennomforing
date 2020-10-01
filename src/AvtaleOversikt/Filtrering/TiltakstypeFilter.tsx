import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TiltaksType } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';

const TiltakstypeFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtTiltakstype, setValgtTiltakstype] = useState<TiltaksType | ''>('');

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    return (
        <Filter tittel="Tiltakstype">
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
                        props.endreSøk({ tiltakstype: nyTiltakstype });
                    }}
                />
            ))}
        </Filter>
    );
};

export default TiltakstypeFilter;
