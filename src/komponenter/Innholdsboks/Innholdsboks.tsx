import * as React from 'react';
import './Innholdsboks.less';
import classnames from 'classnames';
import { PropsWithChildren } from 'react';

interface Props {
    className?: string;
    ariaLabel?: string;
}

const Innholdsboks: React.FunctionComponent<PropsWithChildren<Props>> = (props) => (
    <div className={classnames('innholdsboks', props.className)}>
        <div className="innholdsboks__innhold">{props.children}</div>
    </div>
);

export default Innholdsboks;
