import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { ExpansionCard, Heading, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import './UtregningPanel.less';
import {
    Buildings2Icon,
    EqualsIcon,
    ParasolBeachIcon,
    PiggybankIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';
import { formaterPenger } from '@/utils';
import Utregningsrad from './Utregningsrad';

const UtregningPanelMentorTilskudd: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const cls = BEMHelper('utregningspanel');
    const timelonn = props.mentorTimelonn ?? 0;
    const antallTimer = props.mentorAntallTimer ?? 0;

    const prosentSats = (sats: number | undefined | null) => `(${(sats || 0) * 100}%)`;

    return (
        <>
            <ExpansionCard defaultOpen aria-label="aria-labelledby" size="small">
                <ExpansionCard.Header>
                    <Heading level="2" size="small">
                        Beregning av tilskudd
                    </Heading>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <Table className={cls.className}>
                        <Table.Body>
                            <Utregningsrad
                                icon={<SackKronerIcon />}
                                label="Timelønn × antall timer"
                                midtrekkeTekst={`(${formaterPenger(timelonn)} × ${antallTimer})`}
                                verdi={timelonn * antallTimer}
                            />
                            <Utregningsrad
                                icon={<ParasolBeachIcon />}
                                label="Feriepenger"
                                midtrekkeTekst={prosentSats(props.feriepengesats)}
                                operator={<PlusIcon />}
                                verdi={props.feriepengerBelop || 0}
                            />
                            <Utregningsrad
                                icon={<PiggybankIcon />}
                                label="Obligatorisk tjenestepensjon"
                                midtrekkeTekst={prosentSats(props.otpSats)}
                                operator={<PlusIcon />}
                                verdi={props.otpBelop || 0}
                            />
                            <Utregningsrad
                                icon={<Buildings2Icon />}
                                label="Arbeidsgiveravgift"
                                midtrekkeTekst={prosentSats(props.arbeidsgiveravgift)}
                                operator={<PlusIcon />}
                                verdi={props.arbeidsgiveravgiftBelop || 0}
                            />
                            <Utregningsrad
                                label="Sum utgifter"
                                operator={<EqualsIcon />}
                                verdi={props.sumLonnsutgifter || 0}
                            />
                            <Utregningsrad
                                className={cls.element('fet-border-top')}
                                label="Sum tilskudd for en måned"
                                verdi={props.sumLonnstilskudd || 0}
                                fetSkrift
                            />
                        </Table.Body>
                    </Table>
                </ExpansionCard.Content>
            </ExpansionCard>
        </>
    );
};

export default UtregningPanelMentorTilskudd;
