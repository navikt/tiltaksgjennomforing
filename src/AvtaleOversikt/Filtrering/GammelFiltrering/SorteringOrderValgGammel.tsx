import React, { FunctionComponent } from 'react';
import { ReactComponent as TriangleUp } from '@/assets/ikoner/triangleUp.svg';
import { ReactComponent as TriangleDown } from '@/assets/ikoner/triangleDown.svg';
import BEMHelper from '@/utils/bem';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import { Avtale } from '@/types/avtale';

interface Props {
    label: string | React.ReactNode;
    sorteringsverdi: string;
}

const cls = BEMHelper('avtaletabellradheader');

const SorteringOrderValgGammel: FunctionComponent<Props> = ({ label, sorteringsverdi }) => {
    const { endreFilter, filtre } = useFilterGammel();

    return (
        <div className={cls.element('label-container')}>
            {label}
            <TriangleUp
                style={{ marginLeft: '0.5rem' }}
                className={cls.element('sortering')}
                onClick={() => {
                    endreFilter({
                        sorteringskolonne: sorteringsverdi as keyof Avtale,
                        sorteringOrder: 'ASC',
                    });
                }}
            />
            <TriangleDown
                className={cls.element('sortering')}
                onClick={() => {
                    endreFilter({
                        sorteringskolonne: sorteringsverdi as keyof Avtale,
                        sorteringOrder: 'DESC',
                    });
                }}
            />
        </div>
    );
};
export default SorteringOrderValgGammel;
