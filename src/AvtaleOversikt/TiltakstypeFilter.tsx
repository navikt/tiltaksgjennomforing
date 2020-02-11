import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering';
import { Undertittel } from 'nav-frontend-typografi';
import { TiltaksType } from '@/types/avtale';
import SelectInput, { OptionProps } from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const TiltakstypeFilter: FunctionComponent<FiltreringProps> = props => {
    const [tiltakstype, setTiltakstype] = useState<TiltaksType>();

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    ];

    return (
        <div className={'innholdsboks'}>
            <Undertittel>Tiltakstype</Undertittel>
            <VerticalSpacer sixteenPx={true} />
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
        </div>
    );
};

export default TiltakstypeFilter;
