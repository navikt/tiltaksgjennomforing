import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TiltaksType } from '@/types/avtale';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

const alleTiltakstyperBeslutter: OptionProps[] = [
    { value: '', label: 'Alle' },
    { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
    { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    { value: 'SOMMERJOBB', label: 'Sommerjobb' },
    { value: 'MENTOR', label: 'Mentor' },
    { value: 'VTAO', label: 'VTA-O', description: 'Varig tilrettelagt arbeid i ordinær virksomhet' },
    { value: 'FIREARIG_LONNSTILSKUDD', label: 'Fireårig lønnstilskudd for unge' },
].toSorted((a, b) => a.label.localeCompare(b.label, 'nb'));

const alleTiltakstyper: OptionProps[] = [
    { value: '', label: 'Alle' },
    { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
    { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
    { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
    { value: 'SOMMERJOBB', label: 'Sommerjobb' },
    { value: 'MENTOR', label: 'Mentor' },
    { value: 'INKLUDERINGSTILSKUDD', label: 'Inkluderingstilskudd' },
    { value: 'VTAO', label: 'VTA-O', description: 'Varig tilrettelagt arbeid i ordinær virksomhet' },
    { value: 'FIREARIG_LONNSTILSKUDD', label: 'Fireårig lønnstilskudd for unge' },
].toSorted((a, b) => a.label.localeCompare(b.label, 'nb'));

export type FiltreringMedBeslutterProps = {
    filtre: Filtrering;
    endreFilter: (filtrering: Filtrering) => void;
    erBeslutter: boolean;
};

const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = ({ filtre, endreFilter, erBeslutter }) => {
    const tiltakstyper = erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            <RadioGroup legend="" size="small" value={filtre.tiltakstype || ''}>
                {tiltakstyper.map((tiltakstype: OptionProps) => (
                    <Radio
                        key={tiltakstype.value}
                        name={'tiltakstype'}
                        value={tiltakstype.value}
                        description={tiltakstype.description}
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
