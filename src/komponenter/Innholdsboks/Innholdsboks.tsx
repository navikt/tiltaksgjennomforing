import * as React from 'react';
import './Innholdsboks.less';
import classnames from 'classnames';
import { PropsWithChildren, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

interface Props {
    className?: string;
    ariaLabel?: string;
    style?: React.CSSProperties;
}

const Innholdsboks: React.FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const { avtale } = useContext(AvtaleContext);
    const featureToggleContex = useContext(FeatureToggleContext);
    const arbeidstreningReadOnly =
        avtale?.tiltakstype === 'ARBEIDSTRENING' && featureToggleContex[Feature.ArbeidstreningReadOnly]
            ? 'is-readonly'
            : '';

    return (
        <div className={classnames('innholdsboks', props.className)} style={props.style}>
            <div className={classnames('innholdsboks__innhold', arbeidstreningReadOnly)}>{props.children}</div>
        </div>
    );
};

export default Innholdsboks;
