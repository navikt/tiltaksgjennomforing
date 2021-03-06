import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { TilskuddsPeriode } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext } from 'react';
import './tilskuddsPerioder.less';

const cls = BEMHelper('tilskuddsPerioder');

type Props = {
    tilskuddsperioder: TilskuddsPeriode[];
};

const TilskuddsPerioder: FunctionComponent<Props> = props => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];

    const detErOpprettetTilskuddsPerioder = props.tilskuddsperioder.length > 0;

    return visningAvtilskuddsPeriodeToggle && detErOpprettetTilskuddsPerioder ? (
        <div className={cls.className}>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Prosent</th>
                        <th>Beløp</th>
                        <th>Arbeidsgiver kan be om refusjon</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tilskuddsperioder.map((periode, index) => {
                        return (
                            <tr key={index}>
                                <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                    {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </td>
                                <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                <td>{formatterPenger(periode.beløp)}</td>
                                <td>{formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : null;
};

export default TilskuddsPerioder;
