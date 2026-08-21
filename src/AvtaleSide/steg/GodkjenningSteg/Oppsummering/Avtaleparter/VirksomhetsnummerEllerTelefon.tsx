import { storForbokstav } from '@/utils/stringUtils';
import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    felt: string;
    verdi?: string;
}

export const VirksomhetsnummerEllerTelefon: FunctionComponent<Props> = (props) => {
    if (props.felt === 'telefon') {
        return (
            <BodyShort size="small">
                {storForbokstav(props.felt)}: {props.verdi}
            </BodyShort>
        );
    }
    if (props.felt === 'ønskerVarslingOmRefusjon') {
        return <BodyShort size="small">Arbeidsgiver ønsker også varsling: {props.verdi}</BodyShort>;
    }
    return (
        <BodyShort size="small">
            {storForbokstav(props.felt)}: {props.verdi}
        </BodyShort>
    );
};

export default VirksomhetsnummerEllerTelefon;
