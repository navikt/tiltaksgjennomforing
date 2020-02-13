import { avtaleFelterBokmal } from '@/messages';
import { AltAvtaleinnhold } from '@/types/avtale';
import { storForbokstav } from '@/utils/stringUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import React, { FunctionComponent } from 'react';

type Props = {
    avhengigFelter: Partial<AltAvtaleinnhold>;
};

const HvaManglerOppsummering: FunctionComponent<Props> = props => {
    const tommeFelter = Object.keys(props.avhengigFelter).filter(
        key => !props.avhengigFelter[key as keyof AltAvtaleinnhold]
    );

    const manglerTekst =
        tommeFelter
            .map(element => {
                return avtaleFelterBokmal[element as keyof AltAvtaleinnhold];
            })
            .join(', ') + ' er ikke fylt ut';

    return tommeFelter.length ? <EtikettFokus>{storForbokstav(manglerTekst)}</EtikettFokus> : <>{props.children}</>;
};

export default HvaManglerOppsummering;
