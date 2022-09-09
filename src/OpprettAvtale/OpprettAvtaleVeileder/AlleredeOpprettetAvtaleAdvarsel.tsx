import React from 'react';
import { AlleredeRegistrertAvtale, AvtaleStatus } from '@/types/avtale';
import AlertStripe from 'nav-frontend-alertstriper';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtaleAdvarsel.less';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
}

const AlleredeOpprettetAvtaleAdvarsel: React.FC<Props> = ({ alleredeRegistrertAvtale }) => {
    if (alleredeRegistrertAvtale.length === 0) return null;
    const cls = BEMHelper('alleredeOpprettetAvtaleAdvarsel');

    const sjekkStatus = (avtale: AlleredeRegistrertAvtale, avtaleStatus: AvtaleStatus) =>
        avtale.status === avtaleStatus;

    const avtalerSomIkkeErIverksatt = alleredeRegistrertAvtale.filter(
        (avtale) =>
            sjekkStatus(avtale, 'MANGLER_GODKJENNING') ||
            sjekkStatus(avtale, 'MANGLER_SIGNATUR') ||
            sjekkStatus(avtale, 'PÅBEGYNT')
    );

    const avtalerSomErIverksatt = alleredeRegistrertAvtale.filter(
        ({ status }) => status === 'KLAR_FOR_OPPSTART' || status === 'GJENNOMFØRES'
    );

    const getAvtaleStatus = (statusSomEnum: AvtaleStatus): JSX.Element | null => {
        switch (statusSomEnum) {
            case 'MANGLER_GODKJENNING':
            case 'MANGLER_SIGNATUR':
            case 'PÅBEGYNT':
                return <StatusIkon status={'PÅBEGYNT'} />;
            case 'GJENNOMFØRES':
            case 'KLAR_FOR_OPPSTART':
                return <StatusIkon status={'GJENNOMFØRES'} />;
            default: {
                console.error('mapping av allerede opprettet avtaler feilet: ');
                return null;
            }
        }
    };

    if (avtalerSomIkkeErIverksatt.length <= 0 && avtalerSomErIverksatt.length <= 0) return null;

    return (
        <div className={cls.className}>
            <AlertStripe type="advarsel">
                Det finnes allerede registrerte tiltak for denne deltakeren:
                <ul>
                    {avtalerSomIkkeErIverksatt.length > 0 && (
                        <li className={cls.element('list-element')}>
                            <div className={cls.element('list-element-content')}>
                                {avtalerSomIkkeErIverksatt.length} som er under utfylding{' '}
                                {getAvtaleStatus(avtalerSomIkkeErIverksatt[0].status)}{' '}
                            </div>
                        </li>
                    )}
                    {avtalerSomErIverksatt.length > 0 && (
                        <li className={cls.element('list-element')}>
                            <div className={cls.element('list-element-content')}>
                                {avtalerSomErIverksatt.length} som er i gangsatt{' '}
                                {getAvtaleStatus(avtalerSomErIverksatt[0].status)}{' '}
                            </div>
                        </li>
                    )}
                </ul>
            </AlertStripe>
        </div>
    );
};
export default AlleredeOpprettetAvtaleAdvarsel;
