import * as React from 'react';
import { FunctionComponent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { storForbokstav } from '@/utils/stringUtils';

interface Props {
    felt: string;
    verdi?: string;
    key?: number;
}

export const BedriftsnummerEllerTelefon: FunctionComponent<Props> = props => {
    function hentTallMedDotterOgMellomrom() {
        return props.verdi?.split('').join('. ');
    }

    if (props.felt === 'telefon') {
        return (
            <>
                <Normaltekst key={props.key}>
                    <Lenke
                        key={props.key}
                        href={'tel:' + props.verdi}
                        aria-label={`Telefon ${hentTallMedDotterOgMellomrom()}`}
                    >
                        {storForbokstav(props.felt)} : {props.verdi}
                    </Lenke>
                </Normaltekst>
            </>
        );
    } else {
        return (
            <>
                <Normaltekst
                    key={props.key}
                    aria-label={`${storForbokstav(props.felt)} ${hentTallMedDotterOgMellomrom()}`}
                >
                    {storForbokstav(props.felt)} : {props.verdi}
                </Normaltekst>
            </>
        );
    }
};

export default BedriftsnummerEllerTelefon;
