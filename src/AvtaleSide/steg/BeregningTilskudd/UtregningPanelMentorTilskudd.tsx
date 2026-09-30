import { Beregningsgrunnlag } from '@/types/avtale';
import { ExpansionCard, Heading, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import styles from './UtregningPanel.module.less';
import {
    Buildings2Icon,
    EqualsIcon,
    ParasolBeachIcon,
    PiggybankIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';
import { formaterNorskeTall, formaterPenger } from '@/utils';
import Utregningsrad from './Utregningsrad';
import { erNil } from '@/utils/predicates';

const UtregningPanelMentorTilskudd: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const mentorTimelonn = props.mentorTimelonn ?? 0;
    const antallTimer = props.mentorAntallTimer ?? 0;

    const prosentSats = (sats: number | undefined) =>
        erNil(sats) ? undefined : `(${formaterNorskeTall(sats * 100)} %)`;

    const manedslonnUtregningTekst =
        erNil(props.mentorTimelonn) || erNil(props.mentorAntallTimer)
            ? undefined
            : `(${formaterPenger(mentorTimelonn)} × ${antallTimer} ${antallTimer === 1 ? 'time' : 'timer'})`;

    return (
        <>
            <ExpansionCard defaultOpen aria-label="Beregning av tilskudd" size="small">
                <ExpansionCard.Header>
                    <Heading level="2" size="small">
                        Beregning av tilskudd
                    </Heading>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <Table className={styles.utregningspanel}>
                        <Table.Body>
                            <Utregningsrad
                                icon={<SackKronerIcon />}
                                label="Timelønn × antall timer"
                                midtrekkeTekst={manedslonnUtregningTekst}
                                verdi={mentorTimelonn * antallTimer}
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
                                className={styles.fetBorderBottom}
                                label="Sum utgifter"
                                operator={<EqualsIcon />}
                                verdi={props.sumLonnsutgifter || 0}
                            />
                            <Utregningsrad
                                className={styles.fetSkrift}
                                label="Sum tilskudd for en måned"
                                verdi={props.sumLonnsutgifter || 0}
                            />
                        </Table.Body>
                    </Table>
                </ExpansionCard.Content>
            </ExpansionCard>
        </>
    );
};

export default UtregningPanelMentorTilskudd;
