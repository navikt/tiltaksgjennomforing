import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TilskuddsPeriode } from '@/types/avtale';
import { formatterPeriode } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

type Props = {
    tilskuddsperioder: TilskuddsPeriode[];
};

const TilskuddsPeriodeBoks: FunctionComponent<Props> = props => {
    return (
        <>
            {props.tilskuddsperioder.map(periode => (
                <>
                    <Ekspanderbartpanel
                        tittel={
                            <Element>
                                Tilskudd for periode {formatterPeriode(periode.startDato, periode.sluttDato)}
                            </Element>
                        }
                        apen={periode.løpenummer === 1}
                    >
                        <Normaltekst>
                            Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum tilskudd for
                            en måned" på snitt antall dager i en måned (30,43) og ganger med antall dager i perioden.
                        </Normaltekst>
                        <VerticalSpacer rem={2} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Normaltekst>{formatterPeriode(periode.startDato, periode.sluttDato)}</Normaltekst>
                            <Element>Inntil {formatterPenger(periode.beløp)}</Element>
                        </div>
                    </Ekspanderbartpanel>
                    <VerticalSpacer rem={1} />
                </>
            ))}
        </>
    );
};

export default TilskuddsPeriodeBoks;
