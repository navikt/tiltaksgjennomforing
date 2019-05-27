import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
import { StegInfo } from '../AvtaleSide';
import './NesteForrige.less';
import { Route } from 'react-router';

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

class NesteForrige extends React.Component<Context & Props, {}> {
    shouldComponentUpdate(
        nextProps: Readonly<Context & Props>,
        nextState: Readonly<{}>,
        nextContext: any
    ): boolean {
        return true;
    }

    render() {
        const forrigeSteg = finnForrigeSteg(
            this.props.avtaleSteg,
            this.props.aktivtSteg
        );
        const nesteSteg = finnNesteSteg(
            this.props.avtaleSteg,
            this.props.aktivtSteg
        );
        return (
            <div className="hello">
                <div className="row ">
                    {forrigeSteg && (
                        <Route
                            render={({ history }) => (
                                <button
                                    type="button"
                                    className="knapp knapp--flat"
                                    onClick={() => {
                                        this.props.endretSteg();
                                        history.push(
                                            pathTilStegIAvtale(
                                                this.props.avtale.id,
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
                                    className="knapp knapp--flat nesteforrige__buttontoright"
                                    onClick={() => {
                                        this.props.endretSteg();
                                        history.push(
                                            pathTilStegIAvtale(
                                                this.props.avtale.id,
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
    }
}

export default medContext<Props>(NesteForrige);
