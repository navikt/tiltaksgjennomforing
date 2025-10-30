import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Accordion, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './UtregningPanel.less';
import Utregningsrad from './Utregningsrad';
import {
    SackKronerIcon,
    ParasolBeachIcon,
    PiggybankIcon,
    Buildings2Icon,
    EqualsIcon,
    PlusIcon,
} from '@navikt/aksel-icons';
import { useMemo } from 'react';
import { formaterPenger } from '@/utils';

const UtregningPanelMentorTilskudd: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const cls = BEMHelper('utregningspanel');

    const timelonn = props.mentorTimelonn ?? 0;
    const antallTimer = props.mentorAntallTimer ?? 0;

    const mentorMaanedslonn = useMemo(() => timelonn * antallTimer, [timelonn, antallTimer]);

    const midtrekkeTekst = useMemo(() => {
        console.log(timelonn.toFixed(2));
        return `(${timelonn.toFixed(2)} × ${antallTimer})`;
    }, [timelonn, antallTimer]);

    return (
        <Accordion className="accordion">
            <Accordion.Item defaultOpen>
                <Accordion.Header>
                    <Label>Tilskudd for en måned</Label>
                </Accordion.Header>
                <Accordion.Content>
                    <div className={cls.element('wrapper')}>
                        <Utregningsrad
                            labelIkon={<SackKronerIcon />}
                            labelTekst="Timelønn × antall timer"
                            midtrekkeTekst={midtrekkeTekst}
                            verdi={mentorMaanedslonn || 0}
                        />
                        <Utregningsrad
                            labelIkon={<ParasolBeachIcon />}
                            labelTekst="Feriepenger"
                            labelSats={props.feriepengesats}
                            verdiOperator={<PlusIcon />}
                            verdi={props.feriepengerBelop || 0}
                        />
                        <Utregningsrad
                            labelIkon={<PiggybankIcon />}
                            labelTekst="Obligatorisk tjenestepensjon"
                            labelSats={props.otpSats}
                            verdiOperator={<PlusIcon />}
                            verdi={props.otpBelop || 0}
                        />
                        <Utregningsrad
                            labelTekst="Arbeidsgiveravgift"
                            labelIkon={<Buildings2Icon />}
                            verdiOperator={<PlusIcon />}
                            labelSats={props.arbeidsgiveravgift}
                            verdi={props.arbeidsgiveravgiftBelop || 0}
                        />
                        <Utregningsrad
                            labelTekst="Sum utgifter"
                            verdiOperator={<EqualsIcon />}
                            verdi={props.sumLonnsutgifter || 0}
                            borderTykk={true}
                        />

                        <Utregningsrad
                            labelTekst="Sum tilskudd for en måned"
                            tekstType="element"
                            verdi={props.sumLonnstilskudd || 0}
                        />
                        <VerticalSpacer rem={1} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default UtregningPanelMentorTilskudd;
