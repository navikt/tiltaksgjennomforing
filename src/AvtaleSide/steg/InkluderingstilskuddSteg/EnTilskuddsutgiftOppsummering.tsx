import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift } from '@/types/avtale';
import { formaterPenger } from '@/utils/PengeUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

type Props = {
    tilskuddsutgift: Inkluderingstilskuddsutgift;
};

const EnTilskuddsutgiftOppsummering: FunctionComponent<Props> = (props) => {
    return (
        <tr>
            <td>
                <BodyShort size="small">{inkluderingstilskuddtypeTekst[props.tilskuddsutgift.type]}</BodyShort>
            </td>
            <td>
                <BodyShort size="small">{formaterPenger(props.tilskuddsutgift.beløp)}</BodyShort>
            </td>
        </tr>
    );
};

export default EnTilskuddsutgiftOppsummering;
