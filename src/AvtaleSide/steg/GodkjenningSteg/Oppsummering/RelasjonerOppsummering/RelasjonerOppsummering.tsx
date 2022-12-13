import React, { FunctionComponent } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { RelasjonerInfo } from '@/types/avtale';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';

const RelasjonerOppsummering: FunctionComponent<RelasjonerInfo> = (props) => {
    return (
        <div>
            <Heading size="small">Relasjoner</Heading>
            <BodyShort size="small">
                Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?
            </BodyShort>
            <HvaManglerOppsummering
                avhengigFelter={{
                    harFamilietilknytning: props.harFamilietilknytning !== null,
                    familietilknytningForklaring: props.harFamilietilknytning
                        ? props.familietilknytningForklaring
                        : 'true',
                }}
            >
                <Label>{props.harFamilietilknytning ? 'Ja' : ' Nei'}</Label>
                {props.familietilknytningForklaring && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Label>Forklaring</Label>
                        <BodyShort size="small">{props.familietilknytningForklaring}</BodyShort>
                    </>
                )}
            </HvaManglerOppsummering>
        </div>
    );
};

export default RelasjonerOppsummering;
