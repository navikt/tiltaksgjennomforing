import { AvtaleContext } from '@/AvtaleProvider';
import InfoBoks from '@/AvtaleSide/steg/VarighetSteg/InfoBoks/InfoBoks';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput';
import { HGrid } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import { formaterVarighet } from '@/utils/datoUtils';
import React, { useContext } from 'react';
import AntallDagerInput from '@/AvtaleSide/steg/VarighetSteg/AntallDagerInput';
import { addDays } from 'date-fns';

interface Props {
    className: string;
}

const VarighetInputfelt: React.FC<Props> = ({ className }: Props) => {
    const { avtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);

    if (avtale.tiltakstype === 'MENTOR') {
        return null;
    }

    const timerIUka = Number(((37.5 * (avtale.gjeldendeInnhold.stillingprosent || 0)) / 100).toFixed(2));
    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const avtaleDuration =
        avtale.gjeldendeInnhold.startDato && avtale.gjeldendeInnhold.sluttDato
            ? formaterVarighet(avtale.gjeldendeInnhold.startDato, addDays(avtale.gjeldendeInnhold.sluttDato, 1))
            : '';

    const cls = BEMHelper(className);
    return (
        <div>
            <HGrid columns={{ xs: 1, md: 2 }} gap="space-16" className={cls.element('rad')}>
                <StillingsprosentInput
                    label="Stillingsprosent for deltaker"
                    verdi={avtale.gjeldendeInnhold.stillingprosent}
                    size="medium"
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('stillingprosent', verdi)}
                />
                <AntallDagerInput
                    label="Antall dager per uke"
                    verdi={avtale.gjeldendeInnhold.antallDagerPerUke}
                    size="medium"
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('antallDagerPerUke', verdi)}
                />
            </HGrid>
            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
        </div>
    );
};
export default VarighetInputfelt;
