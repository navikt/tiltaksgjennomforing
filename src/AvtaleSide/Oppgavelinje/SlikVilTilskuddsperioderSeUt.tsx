import TilskuddsPerioderVeileder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderVeileder';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TilskuddsPeriode } from '@/types/avtale';
import { Alert, Label } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

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
            <Alert variant="info" inline>
                <Label>{props.overskrift}</Label>
            </Alert>
            <VerticalSpacer rem={0.5} />
            <TilskuddsPerioderVeileder tilskuddsperioder={props.tilskuddsperioder} />
        </div>
    );
};

export default SlikVilTilskuddsperioderSeUt;
