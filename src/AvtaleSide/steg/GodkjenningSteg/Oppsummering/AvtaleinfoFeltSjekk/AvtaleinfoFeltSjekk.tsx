import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import { Tag, Heading, Detail } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import './AvtaleinfoFeltSjekk.less';
import VirksomhetsnummerEllerTelefon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/VirksomhetsnummerEllerTelefon';

const cls = BEMHelper('avtaleparter');

interface Felt {
    felt: string;
    verdi?: string;
}

interface Props {
    navnFelter: Felt[];
    tilleggFelter: Felt[];
    overskrift: string;
    borderFarge: string;
    skjulHvaMangler: boolean;
}

export const AvtaleinfoFeltSjekk: FunctionComponent<Props> = (props) => {
    const alleFelter = props.navnFelter.concat(props.tilleggFelter);
    const hvaMangler = props.skjulHvaMangler ? [] : alleFelter.filter((felt) => !felt.verdi).map((felt) => felt.felt);

    let innhold;
    if (hvaMangler.length > 0) {
        innhold = (
            <Tag variant="warning" className={cls.element('etikettInfo')}>
                {storForbokstav(hvaMangler.join(', ') + ' er ikke fylt ut')}
            </Tag>
        );
    } else {
        innhold = (
            <>
                <Heading level="3" size="small">
                    {props.navnFelter.map((felt) => felt.verdi).join(' ')}
                </Heading>
                {props.tilleggFelter.map((felt, index) => (
                    <React.Fragment key={index}>
                        <VirksomhetsnummerEllerTelefon felt={felt.felt} verdi={felt.verdi} />
                    </React.Fragment>
                ))}
            </>
        );
    }

    return (
        <div className={cls.element('content', props.borderFarge)}>
            <Detail>{props.overskrift}</Detail>
            {innhold}
        </div>
    );
};
