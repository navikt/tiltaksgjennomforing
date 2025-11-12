import StillingsprosentIkon from '@/assets/ikoner/stillingsprosent.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formaterPenger } from '@/utils/PengeUtils';
import { ExpansionCard, Heading, Table } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import {
    Buildings2Icon,
    EqualsIcon,
    ParasolBeachIcon,
    PercentIcon,
    PieChartIcon,
    PiggybankIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';
import './UtregningPanel.less';
import Utregningsrad from '@/AvtaleSide/steg/BeregningTilskudd/Utregningsrad';
import { formaterNorskeTall } from '@/utils';

const UtregningPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const cls = BEMHelper('utregningspanel');
    const avtaleContext = useContext(AvtaleContext);

    const regnUtRedusertProsent = (tilskuddsprosent: number) => {
        /**
         *  TODO: Kalkulering av redusert prosent og redusert dato bør kun skje i backend og ikke her
         */
        if (avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') {
            if (tilskuddsprosent >= 68) return 67;
            return tilskuddsprosent;
        }
        return tilskuddsprosent - 10;
    };

    const prosentSats = (sats: number | undefined) =>
        sats !== undefined && sats !== null ? `(${formaterNorskeTall(sats * 100)}%)` : undefined;

    return (
        <ExpansionCard defaultOpen aria-label="aria-labelledby" size="small">
            <ExpansionCard.Header>
                <Heading level="2" size="small">
                    Tilskudd for en måned
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Table className={cls.className}>
                    <Table.Body>
                        <Utregningsrad
                            icon={<StillingsprosentIkon />}
                            label="Stillingsprosent"
                            operator={<PercentIcon />}
                            verdi={props.stillingprosent || 0}
                            ikkePenger
                        />
                        <Utregningsrad
                            icon={<SackKronerIcon />}
                            label="Månedslønn"
                            operator={<PlusIcon />}
                            verdi={props.manedslonn || 0}
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
                        <Table.Row className={cls.element('fet-border-top')}>
                            <Table.DataCell>
                                <PieChartIcon />
                            </Table.DataCell>
                            <Table.DataCell colSpan={2}>
                                Tilskuddsprosent
                                {props.datoForRedusertProsent &&
                                    ` frem til ${formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}`}
                            </Table.DataCell>
                            <Table.DataCell className="utregningspanel__operator-cell">
                                <div>
                                    <PercentIcon />
                                </div>
                            </Table.DataCell>

                            <Table.DataCell align="right">{props.lonnstilskuddProsent}</Table.DataCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.DataCell></Table.DataCell>
                            <Table.DataCell>
                                <b>Sum tilskudd for en måned</b>
                            </Table.DataCell>
                            <Table.DataCell colSpan={3} align={'right'}>
                                <b>{`Inntil ${formaterPenger(props.sumLonnstilskudd || 0)}`}</b>
                            </Table.DataCell>
                        </Table.Row>
                        {props.datoForRedusertProsent && (
                            <>
                                <Table.Row>
                                    <Table.DataCell>
                                        <PieChartIcon />
                                    </Table.DataCell>
                                    <Table.DataCell colSpan={2}>
                                        {`Tilskuddsprosent fra og med ${formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}`}
                                    </Table.DataCell>
                                    <Table.DataCell className="utregningspanel__operator-cell">
                                        <div>
                                            <PercentIcon />
                                        </div>
                                    </Table.DataCell>

                                    <Table.DataCell align="right">
                                        {props.lonnstilskuddProsent
                                            ? regnUtRedusertProsent(props.lonnstilskuddProsent)
                                            : 0}
                                    </Table.DataCell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.DataCell></Table.DataCell>
                                    <Table.DataCell>
                                        <b>Sum tilskudd for en måned</b>
                                    </Table.DataCell>
                                    <Table.DataCell colSpan={3} align={'right'}>
                                        <b>{`Inntil ${formaterPenger(props.sumLønnstilskuddRedusert || 0)}`}</b>
                                    </Table.DataCell>
                                </Table.Row>
                            </>
                        )}
                    </Table.Body>
                </Table>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UtregningPanel;
