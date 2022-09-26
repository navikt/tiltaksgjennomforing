import { storForbokstav } from '@/utils/stringUtils';
import { Link } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

interface Props {
    felt: string;
    verdi?: string;
    key?: number;
}

export const VirksomhetsnummerEllerTelefon: FunctionComponent<Props> = (props) => {
    function hentTallMedDotterOgMellomrom() {
        return props.verdi?.split('').join('. ');
    }

    if (props.felt === 'telefon') {
        return (
            <>
                <Normaltekst key={props.key}>
                    <Link
                        key={props.key}
                        href={'tel:' + props.verdi}
                        aria-label={`Telefon ${hentTallMedDotterOgMellomrom()}`}
                    >
                        {storForbokstav(props.felt)} : {props.verdi}
                    </Link>
                </Normaltekst>
            </>
        );
    } else {
        return (
            <>
                <Normaltekst key={props.key}>
                    {storForbokstav(props.felt)} : {props.verdi}
                </Normaltekst>
            </>
        );
    }
};

export default VirksomhetsnummerEllerTelefon;
