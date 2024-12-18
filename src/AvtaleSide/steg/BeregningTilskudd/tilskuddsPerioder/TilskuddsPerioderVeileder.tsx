import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { TilskuddsPeriode } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formatterPeriode } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formaterPenger } from '@/utils/PengeUtils';
import { FunctionComponent } from 'react';
import './tilskuddsPerioder.less';

const cls = BEMHelper('tilskuddsPerioder');

type Props = {
    tilskuddsperioder: TilskuddsPeriode[];
};

const TilskuddsPerioderVeileder: FunctionComponent<Props> = (props) => {
    const detErOpprettetTilskuddsPerioder = props.tilskuddsperioder.length > 0;

    return detErOpprettetTilskuddsPerioder ? (
        <div className={cls.className}>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Periode</th>
                        <th>Prosent</th>
                        <th>Beløp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tilskuddsperioder.map((periode) => {
                        return (
                            <tr key={periode.id}>
                                <td>{periode.løpenummer}</td>
                                <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                    {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </td>
                                <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                <td>{formaterPenger(periode.beløp)}</td>
                                <td>
                                    <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : null;
};

export default TilskuddsPerioderVeileder;
