import { storForbokstav } from '@/utils/stringUtils';
import { BodyShort, Link } from '@navikt/ds-react';
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
                <BodyShort size="small" key={props.key}>
                    <Link
                        key={props.key}
                        href={'tel:' + props.verdi}
                        aria-label={`Telefon ${hentTallMedDotterOgMellomrom()}`}
                    >
                        {storForbokstav(props.felt)}: {props.verdi}
                    </Link>
                </BodyShort>
            </>
        );
    } else if (props.felt === 'virksomhetsnummer') {
        return (
            <>
                <BodyShort size="small" key={props.key}>
                    {storForbokstav(props.felt)}: {props.verdi}
                </BodyShort>
            </>
        );
    } else if (props.felt === 'ønskerVarslingOmRefusjon') {
        return (
            <>
                <BodyShort size="small" key={props.key}>
                    Arbeidsgiver ønsker også varsling: {props.verdi}
                </BodyShort>
            </>
        );
    } else {
        return null;
    }
};

export default VirksomhetsnummerEllerTelefon;
