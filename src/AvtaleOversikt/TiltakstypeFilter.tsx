import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { FiltreringProps, Søketyper } from '@/AvtaleOversikt/Filtrering';
import { Undertittel } from 'nav-frontend-typografi';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { TiltaksType } from '@/types/avtale';
import SelectInput, { OptionProps } from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const TiltakstypeFilter: FunctionComponent<FiltreringProps> = props => {
    const [tiltakstype, setTiltakstype] = useState<TiltaksType | undefined>();

    const sokEtterAvtalerKlikk = () => {
        props.sokEtterAvtaler({ søketype: Søketyper.Tiltakstype, tiltakstype: tiltakstype!! });
    };

    const tiltakstyper: OptionProps[] = [
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
                options={tiltakstyper}
                label=""
                children=""
                defaultValue={tiltakstype}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setTiltakstype(event.target.value as TiltaksType);
                }}
            />
            <Søkeknapp onClick={sokEtterAvtalerKlikk} />
        </div>
    );
};

export default TiltakstypeFilter;
