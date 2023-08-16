import React, { useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Label } from '@navikt/ds-react';
import RadioPanelGruppeHorisontal from '@/komponenter/radiopanel/RadioPanelGruppeHorisontal';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props {
    cls: BEMWrapper;
}
const Feriepenger: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const feriepengeAlternativer = [0.102, 0.12, 0.125, 0.143].map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));

    return (
        <Row className={cls.element('rad')}>
            <Column md="12" className={cls.element('feriepenger')}>
                <Label size="small">Feriepenger</Label>
                <BodyShort size="small">Velg sats for feriepenger som arbeidstaker skal ha</BodyShort>
                <RadioPanelGruppeHorisontal
                    radios={feriepengeAlternativer}
                    name="feriepengesats"
                    checked={avtale.gjeldendeInnhold.feriepengesats + ''}
                    legend=""
                    onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) => {
                        settOgKalkulerBeregningsverdier({ feriepengesats: parseFloat(verdi) });
                    }}
                />
            </Column>
        </Row>
    );
};
export default Feriepenger;
