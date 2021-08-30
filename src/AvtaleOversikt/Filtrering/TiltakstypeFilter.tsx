import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { OptionProps } from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, TiltaksType } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent, useContext, useState } from 'react';

export type FiltreringMedBeslutterProps = { endreSøk: (søkekriterier: Partial<Avtale>) => void; erBeslutter: boolean };
const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = (props) => {
    const [valgtTiltakstype, setValgtTiltakstype] = useState<TiltaksType | ''>('');
    const featureToggles = useContext(FeatureToggleContext);

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
    ];

    if (featureToggles[Feature.Mentor]) {
        alleTiltakstyperBeslutter.push({ value: 'MENTOR', label: 'Mentor' });
        alleTiltakstyper.push({ value: 'MENTOR', label: 'Mentor' });
    }

    const tiltakstyper = props.erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            {tiltakstyper.map((tiltakstype) => (
                <Fragment key={tiltakstype.label}>
                    <Radio
                        label={tiltakstype.label}
                        name={'tiltakstype'}
                        value={tiltakstype.value}
                        checked={tiltakstype.value === valgtTiltakstype}
                        onChange={(event) => {
                            const nyTiltakstype = event.currentTarget.value as TiltaksType;
                            setValgtTiltakstype(nyTiltakstype);
                            props.endreSøk({ tiltakstype: nyTiltakstype });
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
