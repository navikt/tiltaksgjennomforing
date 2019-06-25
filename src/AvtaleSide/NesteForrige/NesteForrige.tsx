import * as React from 'react';
import { FunctionComponent } from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
import { StegInfo } from '../AvtaleSide';
import './NesteForrige.less';
import { Link } from 'react-router-dom';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Lenke from 'nav-frontend-lenker';

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
                    <Lenke
                        href="#"
                        className="nesteforrige__chevron nesteforrige"
                        onClick={() => {
                            props.endretSteg();
                        }}
                    >
                        <VenstreChevron className="tilbaketiloversikt__chevron" />
                        Forrige
                    </Lenke>
                </Link>
            )}
            {nesteSteg && (
                <Link
                    to={pathTilStegIAvtale(props.avtale.id, nesteSteg.id)}
                    className="nesteforrige__nesteknapp"
                >
                    <Lenke
                        href="#"
                        className="nesteforrige__chevron nesteforrige"
                        onClick={() => {
                            props.endretSteg();
                        }}
                    >
                        Neste
                        <HoyreChevron className="nesteforrige__chevron nesteforrige__chevron--neste" />
                    </Lenke>
                </Link>
            )}
        </div>
    );
};

export default medContext<Props>(NesteForrige);
