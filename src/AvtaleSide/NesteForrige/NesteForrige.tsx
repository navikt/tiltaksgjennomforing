import { AvtaleContext } from '@/AvtaleProvider';
import { pathTilStegIAvtale } from '@/paths';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StegInfo } from '../AvtaleSide';
import './NesteForrige.less';

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

const NesteForrige: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);
    const forrigeSteg = finnForrigeSteg(props.avtaleSteg, props.aktivtSteg);
    const nesteSteg = finnNesteSteg(props.avtaleSteg, props.aktivtSteg);
    return (
        <div className="nesteforrige">
            {forrigeSteg && (
                <Link
                    to={{
                        pathname: pathTilStegIAvtale(avtaleContext.avtale.id, forrigeSteg.id),
                        search: window.location.search,
                    }}
                    onClick={avtaleContext.endretSteg}
                    className="lenke"
                    role="link"
                    id="forrige"
                    aria-labelledby="forrige"
                >
                    <VenstreChevron />
                    Forrige
                </Link>
            )}
            {nesteSteg && (
                <Link
                    to={{
                        pathname: pathTilStegIAvtale(avtaleContext.avtale.id, nesteSteg.id),
                        search: window.location.search,
                    }}
                    className="nesteforrige__nesteknapp lenke"
                    onClick={avtaleContext.endretSteg}
                    role="link"
                    id="neste"
                    aria-labelledby="neste"
                >
                    Neste
                    <HoyreChevron />
                </Link>
            )}
        </div>
    );
};

export default NesteForrige;
