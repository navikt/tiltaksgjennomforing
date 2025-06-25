import React, { FunctionComponent } from 'react';
import TriangleUp from '@/assets/ikoner/triangleUp.svg?react';
import TriangleDown from '@/assets/ikoner/triangleDown.svg?react';
import BEMHelper from '@/utils/bem';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import { Avtale } from '@/types/avtale';

interface Props {
    label: string | React.ReactNode;
    sorteringsverdi: string;
}

const cls = BEMHelper('avtaletabellbeslutterheader');

const SorteringOrderValgBeslutter: FunctionComponent<Props> = ({ label, sorteringsverdi }) => {
    const { endreFilter, filtre } = useFilterGammel();

    return (
        <div
            className={cls.element('label-container')}
            onClick={() => {
                endreFilter({
                    sorteringskolonne: sorteringsverdi as keyof Avtale,
                    sorteringOrder: filtre.sorteringOrder === 'DESC' ? 'ASC' : 'DESC',
                });
            }}
        >
            {label}
            <TriangleUp
                style={{ marginLeft: '0.5rem' }}
                className={cls.element(
                    'sortering',
                    filtre.sorteringOrder === 'ASC' && filtre.sorteringskolonne === sorteringsverdi
                        ? 'asc-selected'
                        : 'asc',
                )}
            />
            <TriangleDown
                className={cls.element(
                    'sortering',
                    filtre.sorteringOrder === 'DESC' && filtre.sorteringskolonne === sorteringsverdi
                        ? 'desc-selected'
                        : 'desc',
                )}
            />
        </div>
    );
};
export default SorteringOrderValgBeslutter;
