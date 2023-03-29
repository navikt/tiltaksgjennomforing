import * as React from 'react';
import './Innholdsboks.less';
import classnames from 'classnames';
import UtfyllerBanner from './UfyllerBanner/UfyllerBanner';
import {PropsWithChildren} from "react";

type Utfyller = 'arbeidsgiver' | 'veileder' | 'veileder_og_arbeidsgiver' | undefined;

interface Props {
    className?: string;
    utfyller?: Utfyller;
    ariaLabel?: string;
}

const Innholdsboks: React.FunctionComponent<PropsWithChildren<Props>> = (props) => (
    <div className={classnames('innholdsboks', props.className)}>
        {props.utfyller && <UtfyllerBanner utfyller={props.utfyller} />}
        <div className="innholdsboks__innhold">{props.children}</div>
    </div>
);

export default Innholdsboks;
