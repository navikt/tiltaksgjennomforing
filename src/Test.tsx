import * as React from 'react';
import { medContext } from './avtaleContext';
import { Avtale } from './AvtaleSide/avtale';

class Test extends React.Component<Avtale> {
    render() {
        return <div>{JSON.stringify(this.props)}</div>;
    }
}

export default medContext(Test);
