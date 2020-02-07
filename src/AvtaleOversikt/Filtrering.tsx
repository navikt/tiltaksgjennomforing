import * as React from 'react';
import { FunctionComponent } from 'react';
import SokEtterAvtaler from '@/AvtaleOversikt/SokEtterAvtaler/SokEtterAvtaler';
import TiltakstypeFilter from '@/AvtaleOversikt/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import './Filtrering.less';
import { TiltaksType } from '@/types/avtale';
import { FødselsnummerFilter } from '@/AvtaleOversikt/FødselsnummerFilter';
import { BedriftFilter } from '@/AvtaleOversikt/BedriftFilter';

// Søketyper
export enum Søketyper {
    'TomtSøk',
    'DeltakerSøk',
    'BedriftSøk',
    'Tiltakstype',
}
export type TomtSøk = {
    søketype: Søketyper.TomtSøk;
};
export type DeltakerSøk = {
    deltakerFnr: string;
    søketype: Søketyper.DeltakerSøk;
};
export type BedriftSøk = {
    bedriftNr: string;
    søketype: Søketyper.BedriftSøk;
};
export type TiltakstypeSøk = {
    tiltakstype: TiltaksType;
    søketype: Søketyper.Tiltakstype;
};

export type Søk = TomtSøk | DeltakerSøk | BedriftSøk | TiltakstypeSøk;

export type FiltreringProps = {
    sokEtterAvtaler: (sok: Søk) => void;
};

const cls = BEMHelper('filtrering');

const Filtrering: FunctionComponent<FiltreringProps> = props => (
    <div className={cls.className}>
        {/*<SokEtterAvtaler {...props} />*/}
        <BedriftFilter {...props} />
        <FødselsnummerFilter {...props} />
        <TiltakstypeFilter {...props} />
    </div>
);

export default Filtrering;
