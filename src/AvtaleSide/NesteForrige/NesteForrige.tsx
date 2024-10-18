import React, { FunctionComponent, useContext } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Next, Back } from '@navikt/ds-icons';

import './NesteForrige.less';
import { AvtaleContext } from '@/AvtaleProvider';
import { Path } from '@/Router';
import { StegInfo } from '@/AvtaleSide/AvtaleSide';

export interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
}

const finnForrigeSteg = (alleSteg: StegInfo[], steg: StegInfo) => {
    const index = alleSteg.indexOf(steg);
    if (index === 0) {
        return null;
    } else {
        return alleSteg[index - 1];
    }
};

const finnNesteSteg = (alleSteg: StegInfo[], steg: StegInfo) => {
    const index = alleSteg.indexOf(steg);
    if (index === alleSteg.length - 1) {
        return null;
    } else {
        return alleSteg[index + 1];
    }
};

const NesteForrige: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);
    const forrigeSteg = finnForrigeSteg(props.avtaleSteg, props.aktivtSteg);
    const nesteSteg = finnNesteSteg(props.avtaleSteg, props.aktivtSteg);
    return (
        <div className="nesteforrige">
            {forrigeSteg && (
                <Link
                    to={{
                        pathname: generatePath(Path.AVTALE_STEG, {
                            avtaleId: avtaleContext.avtale.id,
                            steg: forrigeSteg.id,
                        }),
                        search: window.location.search,
                    }}
                    onClick={avtaleContext.endretSteg}
                    className="lenke"
                    role="link"
                    id="forrige"
                    aria-labelledby="forrige"
                >
                    <Back style={{ display: 'inline-block' }} />
                    Forrige
                </Link>
            )}
            {nesteSteg && (
                <Link
                    to={{
                        pathname: generatePath(Path.AVTALE_STEG, {
                            avtaleId: avtaleContext.avtale.id,
                            steg: nesteSteg.id,
                        }),
                        search: window.location.search,
                    }}
                    className="nesteforrige__nesteknapp lenke"
                    onClick={avtaleContext.endretSteg}
                    role="link"
                    id="neste"
                    aria-labelledby="neste"
                >
                    Neste
                    <Next style={{ display: 'inline-block' }} />
                </Link>
            )}
        </div>
    );
};

export default NesteForrige;
