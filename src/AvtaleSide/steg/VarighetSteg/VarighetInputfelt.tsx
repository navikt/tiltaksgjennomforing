import { AvtaleContext } from '@/AvtaleProvider';
import InfoBoks from '@/AvtaleSide/steg/VarighetSteg/InfoBoks/InfoBoks';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import BEMHelper from '@/utils/bem';
import { accurateHumanize } from '@/utils/datoUtils';
import moment from 'moment';
import React, { useContext } from 'react';
import AntallDagerInput from '@/AvtaleSide/steg/VarighetSteg/AntallDagerInput';

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

    const duration = moment(avtale.gjeldendeInnhold.sluttDato).diff(avtale.gjeldendeInnhold.startDato, 'days') + 1;
    const avtaleDuration = duration ? accurateHumanize(moment.duration(duration, 'days'), 3) : undefined;

    const cls = BEMHelper(className);
    return (
        <div>
            <Row className={cls.element('rad')}>
                <Column md="6">
                    <div className={cls.element('Stillingsprosent-input-container')}>
                        <StillingsprosentInput
                            label="Stillingsprosent for deltaker"
                            verdi={avtale.gjeldendeInnhold.stillingprosent}
                            size="medium"
                            settVerdi={(verdi) => settAvtaleInnholdVerdi('stillingprosent', verdi)}
                        />
                    </div>
                </Column>
                <Column md="6">
                    <AntallDagerInput
                        label="Antall dager per uke"
                        verdi={avtale.gjeldendeInnhold.antallDagerPerUke}
                        size="medium"
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('antallDagerPerUke', verdi)}
                    />
                </Column>
            </Row>
            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
        </div>
    );
};
export default VarighetInputfelt;
