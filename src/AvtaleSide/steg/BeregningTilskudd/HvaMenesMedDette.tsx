import React from 'react';
import { BodyLong, List, ReadMore } from '@navikt/ds-react';

const HvaMenesMedDette: React.FC = () => {
    return (
        <ReadMore header="Hva menes med dette?">
            <BodyLong spacing>
                Brutto lønn omregnes til fast gjennomsnittlig månedslønn. I refusjonsgrunnlaget inngår lønn for arbeid
                utført i normalarbeidstiden inkludert faste og uregelmessige tillegg. Overtidsbetaling og andre variable
                tillegg skal ikke tas med.
            </BodyLong>
            <BodyLong spacing>
                For deltidsstillinger skal lønn i den faktiske stillingsprosenten legges inn. For eksempel hvis deltaker
                er ansatt i en 50 % stilling, skal det legges inn månedslønn i 50 % stilling før skatt.
            </BodyLong>
            <BodyLong spacing>
                Eventuelle lønnsutgifter som oversiger avtalt tilskuddsbeløp, vil ikke bli refundert.
            </BodyLong>
            <BodyLong>
                Faste tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales regelmessig ved hver
                lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
            </BodyLong>
            <List>
                <List.Item>b-tillegg</List.Item>
                <List.Item>stabiliseringstillegg</List.Item>
                <List.Item>selektivt tillegg for sykepleiere</List.Item>
                <List.Item>tillegg for ansvarsvakter, fagansvar og lederansvar</List.Item>
                <List.Item>kvalifikasjons-/kompetansetillegg</List.Item>
            </List>
            <BodyLong>
                Uregelmessige tillegg knyttet til stillingen eller yrket, arbeidsmengde, arbeidstid eller arbeidssted,
                og som ikke gis regelmessig. Gjelder tillegg som:
            </BodyLong>
            <List>
                <List.Item>skifttillegg</List.Item>
                <List.Item>turnustillegg</List.Item>
                <List.Item>offshoretillegg</List.Item>
                <List.Item>tillegg for deling av lugar</List.Item>
                <List.Item>tillegg for arbeid på lørdag og søndag</List.Item>
                <List.Item>tillegg for arbeid på kveld eller om natten</List.Item>
            </List>
        </ReadMore>
    );
};
export default HvaMenesMedDette;
