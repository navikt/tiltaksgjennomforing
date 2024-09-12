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
    const arbeidstreningReadOnly = featureToggleContex[Feature.ArbeidstreningReadOnly];
    const readOnlyCss = avtale?.tiltakstype === 'ARBEIDSTRENING' && arbeidstreningReadOnly ? 'is-readonly' : '';

    console.log('arbeidstreningReadOnly', arbeidstreningReadOnly);
    console.log('readOnlyCss', readOnlyCss);
    return (
        <div className={classnames('innholdsboks', props.className)} style={props.style}>
            <div className={classnames('innholdsboks__innhold', readOnlyCss)}>{props.children}</div>
        </div>
    );
};

export default Innholdsboks;
