import React, { Dispatch, SetStateAction } from 'react';
import { AlleredeRegistrertAvtale, AvtaleStatus } from '@/types/avtale';
import { Alert } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtaleAdvarsel.less';
import { Link } from '@navikt/ds-react';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AlleredeOpprettetAvtaleAdvarsel: React.FC<Props> = ({ alleredeRegistrertAvtale, setModalIsOpen }) => {
    if (alleredeRegistrertAvtale.length === 0) return null;
    const cls = BEMHelper('alleredeOpprettetAvtaleAdvarsel');

    const sjekkStatus = (avtale: AlleredeRegistrertAvtale, avtaleStatus: AvtaleStatus) =>
        avtale.status === avtaleStatus;

    const avtalerSomIkkeErIverksatt = alleredeRegistrertAvtale.filter(
        (avtale) =>
            sjekkStatus(avtale, 'MANGLER_GODKJENNING') ||
            sjekkStatus(avtale, 'MANGLER_SIGNATUR') ||
            sjekkStatus(avtale, 'PÅBEGYNT'),
    );

    const avtalerSomErIverksatt = alleredeRegistrertAvtale.filter(
        ({ status }) => status === 'KLAR_FOR_OPPSTART' || status === 'GJENNOMFØRES',
    );

    if (avtalerSomIkkeErIverksatt.length <= 0 && avtalerSomErIverksatt.length <= 0) return null;

    return (
        <div className={cls.className}>
            <Alert variant="warning">
                Det finnes allerede registrerte tiltak for denne deltakeren:
                <ul>
                    {avtalerSomIkkeErIverksatt.length > 0 && (
                        <li className={cls.element('list-element')}>
                            <div className={cls.element('list-element-content')}>
                                {avtalerSomIkkeErIverksatt.length} som er under utfylling{' '}
                            </div>
                        </li>
                    )}
                    {avtalerSomErIverksatt.length > 0 && (
                        <li className={cls.element('list-element')}>
                            <div className={cls.element('list-element-content')}>
                                {avtalerSomErIverksatt.length} som er igangsatt{' '}
                            </div>
                        </li>
                    )}
                </ul>
                <Link
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();
                        setModalIsOpen(true);
                    }}
                    href={'/modal/se-allerede-registrerte-tiltak'}
                >
                    Se detaljer
                </Link>
            </Alert>
        </div>
    );
};
export default AlleredeOpprettetAvtaleAdvarsel;
