import Stegindikator from 'nav-frontend-stegindikator';
import * as React from 'react';
import StegProps from './StegProps';

type Steg = React.ReactElement<StegProps>;

interface State {
    aktivtSteg: number;
}

class Stegvelger<P extends Steg> extends React.Component<
    { children: P[] },
    State
> {
    state = {
        aktivtSteg: 0,
    };

    oppdaterAktivtSteg = (index: number) => {
        this.setState({ aktivtSteg: index });
    };

    render() {
        return (
            <>
                <Stegindikator
                    onChange={this.oppdaterAktivtSteg}
                    steg={this.props.children.map((element, index) => ({
                        label: element.props.label,
                        index: index + 1,
                    }))}
                    visLabel={true}
                />
                <div>{this.props.children[this.state.aktivtSteg]}</div>
            </>
        );
    }
}

export default Stegvelger;
