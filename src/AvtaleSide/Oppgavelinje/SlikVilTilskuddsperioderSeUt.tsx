import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AlertStripe from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import React, { FunctionComponent } from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import { tilskuddsperiodeStatusTekst } from '@/messages';

interface Props {
    tilskuddsperioder: TilskuddsPeriode[];
}

const SlikVilTilskuddsperioderSeUt: FunctionComponent<Props> = ({ tilskuddsperioder }) => {
    if (tilskuddsperioder.length == 0) {
        return null;
    }
    return (
        <div style={{ border: '1px solid lightblue', borderRadius: '4px', padding: '1rem' }}>
            <VerticalSpacer rem={0.5} />
            <AlertStripe type="info" form="inline">
                <Element>Slik vil tilskuddsperiodene se ut etter endringen</Element>
            </AlertStripe>
            <VerticalSpacer rem={0.5} />
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Prosent</th>
                        <th>Beløp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tilskuddsperioder.map((periode, index) => {
                        return (
                            <tr key={index}>
                                <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                    {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </td>
                                <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                <td>{formatterPenger(periode.beløp)}</td>
                                <td>{tilskuddsperiodeStatusTekst[periode.status]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SlikVilTilskuddsperioderSeUt;
