import React, { useContext } from 'react';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import InfoBoks from '@/AvtaleSide/steg/VarighetSteg/InfoBoks/InfoBoks';
import BEMHelper from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import moment from 'moment/moment';
import { accurateHumanize } from '@/utils/datoUtils';
import { Column, Row } from '@/komponenter/NavGrid/Grid';

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
                            label="stillingsprosent for deltaker"
                            verdi={avtale.gjeldendeInnhold.stillingprosent}
                            size="medium"
                            settVerdi={(verdi) => settAvtaleInnholdVerdi('stillingprosent', verdi)}
                        />
                    </div>
                </Column>
                <Column md="6">
                    <PakrevdInput
                        size="medium"
                        label="Antall dager per uke"
                        type="number"
                        max={7}
                        verdi={avtale.gjeldendeInnhold.antallDagerPerUke}
                        settVerdi={(eventVerdi) => {
                            const verdi = parseInt(eventVerdi, 10);
                            if (verdi > 0 && verdi < 8) {
                                settAvtaleInnholdVerdi('antallDagerPerUke', verdi);
                            } else {
                                settAvtaleInnholdVerdi('antallDagerPerUke', undefined);
                            }
                        }}
                    />
                </Column>
            </Row>
            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
        </div>
    );
};
export default VarighetInputfelt;