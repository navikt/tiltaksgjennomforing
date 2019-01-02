import * as React from 'react';
import './Innholdsboks.less';
import classnames from 'classnames';

interface Props {
    className?: string;
}

const Innholdsboks: React.FunctionComponent<Props> = props => (
    <div className={classnames('innholdsboks', props.className)}>
        {props.children}
    </div>
);

export default Innholdsboks;
