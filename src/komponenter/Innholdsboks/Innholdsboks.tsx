import * as React from 'react';
import './Innholdsboks.less';

const Innholdsboks: React.SFC = props => (
    <div className="innholdsboks">{props.children}</div>
);

export default Innholdsboks;
