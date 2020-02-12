import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { TiltaksType } from '@/types/avtale';
import SelectInput, { OptionProps } from '@/komponenter/form/SelectInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';

const TiltakstypeFilter: FunctionComponent<FiltreringProps> = props => {
    const [tiltakstype, setTiltakstype] = useState<TiltaksType>();

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    return (
        <Filter tittel="Tiltakstype">
            <SelectInput
                bredde="xl"
                options={alleTiltakstyper}
                label=""
                children=""
                defaultValue={tiltakstype}
                onChange={event => {
                    const valgtTiltakstype = event.currentTarget.value as TiltaksType;
                    setTiltakstype(valgtTiltakstype);
                    props.endreSøk('tiltakstype', valgtTiltakstype);
                }}
            />
        </Filter>
    );
};

export default TiltakstypeFilter;
