import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AlertStripe from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import TilskuddsPerioderVeileder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderVeileder';

interface Props {
    overskrift: string;
    tilskuddsperioder: TilskuddsPeriode[];
}

const SlikVilTilskuddsperioderSeUt: FunctionComponent<Props> = props => {
    if (props.tilskuddsperioder.length === 0) {
        return null;
    }
    return (
        <div style={{ border: '1px solid lightblue', borderRadius: '4px', padding: '1rem' }}>
            <VerticalSpacer rem={0.5} />
            <AlertStripe type="info" form="inline">
                <Element>{props.overskrift}</Element>
            </AlertStripe>
            <VerticalSpacer rem={0.5} />
            <TilskuddsPerioderVeileder tilskuddsperioder={props.tilskuddsperioder} />
        </div>
    );
};

export default SlikVilTilskuddsperioderSeUt;
