import * as React from 'react';
import { FunctionComponent } from 'react';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import './Filtrering.less';
import { Avtale } from '@/types/avtale';
import { FødselsnummerFilter } from './FødselsnummerFilter';
import { BedriftFilter } from './BedriftFilter';

const cls = BEMHelper('filtrering');

export type FiltreringProps = { endreSøk: (søkefelt: keyof Avtale, søkeverdi: any) => void };

const Filtrering: FunctionComponent<FiltreringProps> = props => (
    <div className={cls.className}>
        <BedriftFilter {...props} />
        <FødselsnummerFilter {...props} />
        <TiltakstypeFilter {...props} />
    </div>
);

export default Filtrering;
