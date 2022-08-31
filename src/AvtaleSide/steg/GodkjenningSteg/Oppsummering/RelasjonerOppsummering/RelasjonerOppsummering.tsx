import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { RelasjonerInfo } from '@/types/avtale';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';

const RelasjonerOppsummering: FunctionComponent<RelasjonerInfo> = props => {
    return (
        <div>
            <Undertittel>Relasjoner</Undertittel>
            <Normaltekst>
                Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?
            </Normaltekst>
            <HvaManglerOppsummering
                avhengigFelter={{
                    harFamilietilknytning: props.harFamilietilknytning !== null,
                    familietilknytningForklaring: props.harFamilietilknytning
                        ? props.familietilknytningForklaring
                        : 'true',
                }}
            >
                <Element>{props.harFamilietilknytning ? 'Ja' : ' Nei'}</Element>
                {props.familietilknytningForklaring && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Element>Forklaring</Element>
                        <Normaltekst>{props.familietilknytningForklaring}</Normaltekst>
                    </>
                )}
            </HvaManglerOppsummering>
        </div>
    );
};

export default RelasjonerOppsummering;
