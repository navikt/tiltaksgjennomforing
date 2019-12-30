import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { FunctionComponent } from 'react';

type Spacing = 'fourPx' | 'eightPx' | 'sixteenPx' | 'twentyPx' | 'thirtyTwoPx';

type VarselOmNedetidProps =
    | {
          visVarselOmNedeTid: true;
          visFraDato: Date;
          visTilDato: Date;
          varselTekst: string;
          spaceTop?: Spacing;
          spaceBottom?: Spacing;
      }
    | {
          visVarselOmNedeTid: false;
      };

export const VarselOmNedetid: FunctionComponent<VarselOmNedetidProps> = props => {
    const dagensDato: Date = new Date();
    if (!props.visVarselOmNedeTid || dagensDato > props.visTilDato || dagensDato < props.visFraDato) {
        return null;
    }

    const topSpacing = props.spaceTop ? { [props.spaceTop]: true } : undefined;
    const bottomSpacing = props.spaceBottom ? { [props.spaceBottom]: true } : undefined;

    return (
        <div>
            {props.spaceTop && <VerticalSpacer {...topSpacing} />}
            <AlertStripe type={'advarsel'}> {props.varselTekst}</AlertStripe>
            {props.spaceBottom && <VerticalSpacer {...bottomSpacing} />}
        </div>
    );
};
