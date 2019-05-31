import * as React from 'react';
import { FunctionComponent } from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
import { StegInfo } from '../AvtaleSide';
import './NesteForrige.less';
import { Link } from 'react-router-dom';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

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

const NesteForrige: FunctionComponent<Props & Context> = props => {
    const forrigeSteg = finnForrigeSteg(props.avtaleSteg, props.aktivtSteg);
    const nesteSteg = finnNesteSteg(props.avtaleSteg, props.aktivtSteg);
    return (
        <div className="nesteforrige">
            {forrigeSteg && (
                <Link to={pathTilStegIAvtale(props.avtale.id, forrigeSteg.id)}>
                    <button
                        type="button"
                        className="nesteforrige__chevron nesteforrige__hoyrevnstrepadding knapp knapp--flat"
                        onClick={() => {
                            props.endretSteg();
                        }}
                    >
                        <VenstreChevron className="nesteforrige__chevron nesteforrige__chevron--forrige" />
                        Forrige
                    </button>
                </Link>
            )}
            {nesteSteg && (
                <Link
                    to={pathTilStegIAvtale(props.avtale.id, nesteSteg.id)}
                    className="nesteforrige__nesteknapp"
                >
                    <button
                        type="button"
                        className="nesteforrige__chevron nesteforrige__hoyrevnstrepadding knapp knapp--flat"
                        onClick={() => {
                            props.endretSteg();
                        }}
                    >
                        Neste
                        <HoyreChevron className="nesteforrige__chevron nesteforrige__chevron--neste" />
                    </button>
                </Link>
            )}
        </div>
    );
};

export default medContext<Props>(NesteForrige);
