import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import { BodyShort, ExpansionCard, Heading, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './visningTilskuddsperioder.less';
import MeldingArbeidsgiverSokRefusjon from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/MeldingArbeidsgiverSokRefusjon';
import VisningTilskuddsperioderTabell from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabell';
import InfoRundtRedusertProsentsats from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtRedusertProsentsats';
import VisningTilskuddsperioderTabellVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabellVtao';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const VisningTilskuddsperioder: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper('visning-tilskuddsperioder');
    const erDeltaker = useContext(InnloggetBrukerContext).rolle === 'DELTAKER';

    if (avtale.tilskuddPeriode.length === 0 || erDeltaker) {
        return null;
    }

    return (
        <ExpansionCard defaultOpen aria-label="Oversikt over tilskudd i perioder" size="small">
            <ExpansionCard.Header>
                <Heading size="small">Oversikt over tilskudd i perioder</Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Label>Utregning</Label>
                <BodyShort size="small">
                    Utregningen baserer seg på tilskudd for en hel måned. Dagsatsen får du ved å dele "sum tilskudd for
                    en måned" på snitt antall dager i en måned (365,25 / 12 = 30,4375) og ganger med antall dager i
                    perioden.
                </BodyShort>
                <InfoRundtRedusertProsentsats className={cls.className} />
                {avtale.tiltakstype == 'VTAO' || avtale.tiltakstype == 'MENTOR' ? (
                    <VisningTilskuddsperioderTabellVtao />
                ) : (
                    <VisningTilskuddsperioderTabell />
                )}
                <MeldingArbeidsgiverSokRefusjon className={cls.className} avtale={avtale} />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default VisningTilskuddsperioder;
