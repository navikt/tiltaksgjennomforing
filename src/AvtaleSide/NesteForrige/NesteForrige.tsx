import * as React from 'react';
import { FunctionComponent } from 'react';
import { Route } from 'react-router';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
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

const NesteForrige: FunctionComponent<Props & Context> = props => {
    const forrigeSteg = finnForrigeSteg(props.avtaleSteg, props.aktivtSteg);
    const nesteSteg = finnNesteSteg(props.avtaleSteg, props.aktivtSteg);
    return (
        <div className="nesteforrige">
            <div className="nesteforrige__rowspacebetween">
                {forrigeSteg && (
                    <Route
                        render={({ history }) => (
                            <button
                                type="button"
                                className="knapp knapp--flat"
                                onClick={() => {
                                    props.endretSteg();
                                    history.push(
                                        pathTilStegIAvtale(
                                            props.avtale.id,
                                            forrigeSteg.id
                                        )
                                    );
                                }}
                            >
                                Forrige
                            </button>
                        )}
                    />
                )}
                {nesteSteg && (
                    <Route
                        render={({ history }) => (
                            <button
                                type="button"
                                className="knapp knapp--flat"
                                onClick={() => {
                                    props.endretSteg();
                                    history.push(
                                        pathTilStegIAvtale(
                                            props.avtale.id,
                                            nesteSteg.id
                                        )
                                    );
                                }}
                            >
                                Neste
                            </button>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default medContext<Props>(NesteForrige);
