import * as React from 'react';
import './Innholdsboks.less';
import classnames from 'classnames';
import UtfyllerBanner from './UfyllerBanner/UfyllerBanner';

type Utfyller = 'arbeidsgiver' | 'veileder' | 'veileder_og_arbeidsgiver' | undefined;
interface Props {
    className?: string;
    utfyller?: Utfyller;
}

const Innholdsboks: React.FunctionComponent<Props> = props => (
    <>
        <div className={classnames('innholdsboks', props.className)} role="main">
            {props.utfyller && <UtfyllerBanner utfyller={props.utfyller} />}
            <div className="innholdsboks__innhold">{props.children}</div>
        </div>
    </>
);

export default Innholdsboks;
