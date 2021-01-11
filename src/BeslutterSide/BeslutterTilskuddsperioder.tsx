import React, { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import { formatterProsent } from '@/utils/formatterProsent';

const BeslutterTilskuddsPerioder: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const avtaleinnhold = useContext(AvtaleContext);

    const detErOpprettetTilskuddsPerioder = avtaleinnhold.avtale.tilskuddPeriode.length > 0;

    return visningAvtilskuddsPeriodeToggle && detErOpprettetTilskuddsPerioder ? (
        <div>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Beløp</th>
                        <th>Sats</th>
                        <th>Frist</th>
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
                                <td>{formatterProsent(avtaleinnhold.avtale.lonnstilskuddProsent)}</td>
                                <td>{formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : null;
};

export default BeslutterTilskuddsPerioder;
