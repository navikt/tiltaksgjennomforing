import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

type Props = {
    tilskuddsutgift: Inkluderingstilskuddsutgift;
};

const EnTilskuddsutgiftOppsummering: FunctionComponent<Props> = (props) => {
    return (
        <tr>
            <td>
                <Normaltekst>{inkluderingstilskuddtypeTekst[props.tilskuddsutgift.type]}</Normaltekst>
            </td>
            <td>
                <Normaltekst>{formatterPenger(props.tilskuddsutgift.beløp)}</Normaltekst>
            </td>
        </tr>
    );
};

export default EnTilskuddsutgiftOppsummering;
