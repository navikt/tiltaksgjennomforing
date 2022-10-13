import { avtaleFelterBokmal } from '@/messages';
import { Avtaleinnhold } from '@/types/avtale';
import { storForbokstav } from '@/utils/stringUtils';
import React, { FunctionComponent } from 'react';
import { Tag } from '@navikt/ds-react';

type Props = {
    avhengigFelter: Partial<Avtaleinnhold>;
};

const HvaManglerOppsummering: FunctionComponent<Props> = (props) => {
    const tommeFelter = Object.keys(props.avhengigFelter).filter(
        (key) => !props.avhengigFelter[key as keyof Avtaleinnhold]
    );

    const manglerTekst =
        tommeFelter
            .map((element) => {
                return avtaleFelterBokmal[element as keyof Avtaleinnhold];
            })
            .join(', ') + ' er ikke fylt ut';

    return tommeFelter.length ? <Tag variant="warning">{storForbokstav(manglerTekst)}</Tag> : <>{props.children}</>;
};

export default HvaManglerOppsummering;
