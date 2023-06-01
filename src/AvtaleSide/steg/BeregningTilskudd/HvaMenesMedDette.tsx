import React from 'react';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';

interface Props {
    className: string;
}

const HvaMenesMedDette: React.FC<Props> = ({ className }: Props) => {
    const cls = BEMHelper(className);
    return (
        <LesMerPanel className={cls.element('lonn-per-mnd')} åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
            <div className={cls.element('lonn-per-mnd-seksjon')}>
                Brutto lønn omregnes til fast gjennomsnittlig månedslønn. I refusjonsgrunnlaget inngår lønn for arbeid
                utført i normalarbeidstiden inkludert faste og uregelmessige tillegg. Overtidsbetaling og andre variable
                tillegg skal ikke tas med. For deltidsstillinger skal lønn i den faktiske stillingsprosenten legges inn.
                For eksempel hvis deltaker er ansatt i en 50 % stilling, skal det legges inn månedslønn i 50 % stilling
                før skatt. Eventuelle lønnsutgifter som oversiger avtalt tilskuddsbeløp, vil ikke bli refundert.
            </div>
            <div className={cls.element('lonn-per-mnd-seksjon')}>
                Faste tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales regelmessig ved hver
                lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
            </div>
            <div className={cls.element('lonn-per-mnd-seksjon')}>
                <ul>
                    <li>b-tillegg</li>
                    <li>stabiliseringstillegg</li>
                    <li>selektivt tillegg for sykepleiere</li>
                    <li>tillegg for ansvarsvakter, fagansvar og lederansvar</li>
                    <li>kvalifikasjons-/kompetansetillegg</li>
                </ul>
            </div>
            <div className={cls.element('lonn-per-mnd-seksjon')}>
                Uregelmessige tillegg knyttet til stillingen eller yrket, arbeidsmengde, arbeidstid eller arbeidssted,
                og som ikke gis regelmessig. Gjelder tillegg som:
            </div>
            <div className={cls.element('lonn-per-mnd-seksjon')}>
                <ul>
                    <li>skifttillegg</li>
                    <li>turnustillegg</li>
                    <li>offshoretillegg</li>
                    <li>tillegg for deling av lugar</li>
                    <li>tillegg for arbeid på lørdag og søndag</li>
                    <li>tillegg for arbeid på kveld eller om natten </li>
                </ul>
            </div>
        </LesMerPanel>
    );
};
export default HvaMenesMedDette;
