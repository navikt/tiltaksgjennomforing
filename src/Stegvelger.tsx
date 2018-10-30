import * as React from 'react';
import { Component } from 'react';

interface StegProps {
    aktivtChild: Component;
}

const Stegvelger: React.StatelessComponent<StegProps> = props => {
    return <div>{props.aktivtChild.props.children}</div>;
};

export default Stegvelger;
