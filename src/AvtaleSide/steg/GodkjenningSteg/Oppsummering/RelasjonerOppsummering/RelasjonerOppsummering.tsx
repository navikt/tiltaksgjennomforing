import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { RelasjonerInfo } from '@/types/avtale';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const RelasjonerOppsummering: FunctionComponent<RelasjonerInfo> = props => {
    return (
        <Stegoppsummering tittel="Relasjoner">
            <div>
                <HvaManglerOppsummering
                    avhengigFelter={{
                        harFamilietilknytning: props.harFamilietilknytning !== null,
                        familietilknytningForklaring: props.harFamilietilknytning
                            ? props.familietilknytningForklaring
                            : 'true',
                    }}
                >
                    <Element>Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?</Element>
                    <Normaltekst>{props.harFamilietilknytning ? 'Ja' : ' Nei'}</Normaltekst>
                    {props.familietilknytningForklaring && (
                        <>
                            <VerticalSpacer rem={1} />
                            <Element>Forklaring</Element>
                            <Normaltekst>{props.familietilknytningForklaring}</Normaltekst>
                        </>
                    )}
                </HvaManglerOppsummering>
            </div>
        </Stegoppsummering>
    );
};

export default RelasjonerOppsummering;
