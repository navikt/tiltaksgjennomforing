import * as React from 'react';
import { FunctionComponent } from 'react';
import TiltakstypeFilter from '@/AvtaleOversikt/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import './Filtrering.less';
import { Avtale } from '@/types/avtale';
import { FødselsnummerFilter } from '@/AvtaleOversikt/FødselsnummerFilter';
import { BedriftFilter } from '@/AvtaleOversikt/BedriftFilter';

export type Søkekriterier = Partial<Avtale>;
export type Søkefelt = keyof Avtale;

type EndreKriterie = (søkefelt: Søkefelt, søkeverdi: Avtale[Søkefelt]) => void;

const cls = BEMHelper('filtrering');

export type FiltreringProps = { endreSøkeverdi: EndreKriterie };
const Filtrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            {/*<SokEtterAvtaler {...props} />*/}
            <BedriftFilter {...props} />
            <FødselsnummerFilter {...props} />
            <TiltakstypeFilter {...props} />
        </div>
    );
};

export default Filtrering;
