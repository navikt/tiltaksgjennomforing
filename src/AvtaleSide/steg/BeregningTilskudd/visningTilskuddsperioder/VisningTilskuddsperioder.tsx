import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import { Accordion, BodyShort, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './visningTilskuddsperioder.less';
import MeldingArbeidsgiverSokRefusjon from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/MeldingArbeidsgiverSokRefusjon';
import VisningTilskuddsperioderTabell from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabell';
import InfoRundtRedusertProsentsats from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtRedusertProsentsats';
import VisningTilskuddsperioderTabellVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabellVtao';

const VisningTilskuddsperioder: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper('visning-tilskuddsperioder');

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <div className={cls.className}>
            <Accordion className={'accordion'}>
                <Accordion.Item defaultOpen>
                    <Accordion.Header>Oversikt over tilskudd i perioder</Accordion.Header>
                    <Accordion.Content>
                        <div className={cls.element('container')}>
                            <div className={cls.element('header')}>
                                <Label>Utregning</Label>
                                <BodyShort size="small">
                                    Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum
                                    tilskudd for en måned" på snitt antall dager i en måned (365,25 / 12 = 30,4375) og
                                    ganger med antall dager i perioden.
                                </BodyShort>
                                <InfoRundtRedusertProsentsats className={cls.className} />
                            </div>
                            {avtale.tiltakstype == 'VTAO' ? (
                                <VisningTilskuddsperioderTabellVtao className={cls.className} />
                            ) : (
                                <VisningTilskuddsperioderTabell className={cls.className} />
                            )}

                            <MeldingArbeidsgiverSokRefusjon
                                className={cls.className}
                                sluttdato={avtale.tilskuddPeriode[0].sluttDato}
                            />
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
export default VisningTilskuddsperioder;
