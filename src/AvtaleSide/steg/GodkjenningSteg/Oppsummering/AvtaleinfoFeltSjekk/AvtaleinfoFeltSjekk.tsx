import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './AvtaleinfoFeltSjekk.less';
import BedriftsnummerEllerTelefon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/BedriftsnummerEllerTelefon';

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
            <EtikettFokus className={cls.element('etikettInfo')}>
                {storForbokstav(hvaMangler.join(', ') + ' er ikke fylt ut')}
            </EtikettFokus>
        );
    } else {
        innhold = (
            <>
                <Undertittel>{props.navnFelter.map((felt) => felt.verdi).join(' ')}</Undertittel>
                {props.tilleggFelter.map((felt, index) => (
                    <React.Fragment key={index}>
                        <BedriftsnummerEllerTelefon felt={felt.felt} verdi={felt.verdi} />
                    </React.Fragment>
                ))}
            </>
        );
    }

    return (
        <div className={cls.element('content', props.borderFarge)}>
            <Undertekst>{props.overskrift}</Undertekst>
            {innhold}
        </div>
    );
};
