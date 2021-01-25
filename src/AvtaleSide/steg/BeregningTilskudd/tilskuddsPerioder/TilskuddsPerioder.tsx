import React, { FunctionComponent, useContext } from 'react';
import BEMHelper from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';

const cls = BEMHelper('tilskuddsPerioder');

const TilskuddsPerioder: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const avtaleinnhold = useContext(AvtaleContext);

    const detErOpprettetTilskuddsPerioder = avtaleinnhold.avtale.tilskuddPeriode.length > 0;

    return visningAvtilskuddsPeriodeToggle && detErOpprettetTilskuddsPerioder ? (
        <div className={cls.className}>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Beløp</th>
                        <th>Arbeidsgiver kan be om refusjon</th>
                    </tr>
                </thead>
                <tbody>
                    {avtaleinnhold.avtale.tilskuddPeriode.map((periode, index) => {
                        return (
                            <tr key={index}>
                                <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                    {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </td>
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
