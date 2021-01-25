import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TiltaksType } from '@/types/avtale';
import { Avtale } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';

export type FiltreringMedBeslutterProps = { endreSøk: (søkekriterier: Partial<Avtale>) => void; erBeslutter: boolean };
const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = props => {
    const [valgtTiltakstype, setValgtTiltakstype] = useState<TiltaksType | ''>('');

    const alleTiltakstyperBeslutter: OptionProps[] = [
        { value: '', label: 'Alle' },
        //       { value: 'MENTOR', label: 'Mentor' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    const tiltakstyper = props.erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            {tiltakstyper.map(tiltakstype => (
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
                    role="radio"
                    aria-labelledby="filtere på tiltakstype"
                />
            ))}
        </Filter>
    );
};

export default TiltakstypeFilter;
