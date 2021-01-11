import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { pathTilAvtale } from '@/paths';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import EtikettStatus from './EtikettStatus';

const BeslutterTilskuddsPerioder: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const { avtale } = useContext(AvtaleContext);

    const detErOpprettetTilskuddsPerioder = avtale.tilskuddPeriode.length > 0;

    return visningAvtilskuddsPeriodeToggle && detErOpprettetTilskuddsPerioder ? (
        <div>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Beløp</th>
                        <th>Sats</th>
                        <th>Frist</th>
                        <th>Status</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {avtale.tilskuddPeriode.map((periode, index) => {
                        return (
                            <tr key={index}>
                                <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                    {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </td>
                                <td>{formatterPenger(periode.beløp)}</td>
                                <td>{formatterProsent(avtale.lonnstilskuddProsent)}</td>
                                <td>{formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}</td>
                                <td>
                                    <EtikettStatus tilskuddsperiodestatus={periode.status} />
                                </td>
                                <td>
                                    <NavLink
                                        to={`${pathTilAvtale(avtale.id)}/beslutte/${periode.id}`}
                                        activeStyle={{ display: 'none' }}
                                    >
                                        Gå til
                                    </NavLink>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : null;
};

export default BeslutterTilskuddsPerioder;
