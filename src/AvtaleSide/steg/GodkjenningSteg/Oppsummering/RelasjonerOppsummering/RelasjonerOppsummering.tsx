import { RelasjonerInfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const cls = BEMHelper('avtaleparter');

const RelasjonerOppsummering: FunctionComponent<RelasjonerInfo> = props => {
    return (
        <Stegoppsummering tittel="Relasjoner">
            <div className={cls.element('content', 'farge-graa')}>
                <Undertekst>Relasjoner</Undertekst>
                <HvaManglerOppsummering
                    avhengigFelter={{
                        harFamilietilknytning: props.harFamilietilknytning !== null,
                        familietilknytningForklaring: props.harFamilietilknytning
                            ? props.familietilknytningForklaring
                            : 'true',
                    }}
                >
                    <Normaltekst>
                        Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?
                    </Normaltekst>
                    <Normaltekst>{props.harFamilietilknytning ? 'Ja' : ' Nei'}</Normaltekst>
                    {props.familietilknytningForklaring && (
                        <Normaltekst>Forklaring: {props.familietilknytningForklaring}</Normaltekst>
                    )}
                </HvaManglerOppsummering>
            </div>
        </Stegoppsummering>
    );
};

export default RelasjonerOppsummering;
