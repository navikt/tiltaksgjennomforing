import { avtaleFelterBokmal } from '@/messages';
import { Avtaleinnhold } from '@/types/avtale';
import { storForbokstav } from '@/utils/stringUtils';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Tag } from '@navikt/ds-react';

type Props = {
    avhengigFelter: Partial<Avtaleinnhold>;
};

const isNil = (x: any) => x === null || x === undefined;
const erTomTekst = (x: any) => typeof x === 'string' && x.trim() === '';

const HvaManglerOppsummering: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const tommeFelter = Object.keys(props.avhengigFelter).filter((key) => {
        const feltverdi = props.avhengigFelter[key as keyof Avtaleinnhold];
        return isNil(feltverdi) || erTomTekst(feltverdi);
    });

    const manglerTekst =
        tommeFelter
            .map((element) => {
                return avtaleFelterBokmal[element as keyof Avtaleinnhold];
            })
            .join(', ') + ' er ikke fylt ut';

    return tommeFelter.length ? (
        <div>
            <Tag variant="warning">{storForbokstav(manglerTekst)}</Tag>
        </div>
    ) : (
        <>{props.children}</>
    );
};

export default HvaManglerOppsummering;
