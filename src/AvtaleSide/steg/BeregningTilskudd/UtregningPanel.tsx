import StillingsprosentIkon from '@/assets/ikoner/stillingsprosent.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper, { BEMWrapper } from '@/utils/bem';
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
import { erNil } from '@/utils/predicates';

const SummeringsRad: React.FC<{ sum: number }> = ({ sum }) => (
    <Table.Row>
        <Table.DataCell aria-hidden="true" />
        <Table.DataCell>
            <strong>Sum tilskudd for en måned</strong>
        </Table.DataCell>
        <Table.DataCell colSpan={3} align="right">
            <strong>{`Inntil ${formaterPenger(sum)}`}</strong>
        </Table.DataCell>
    </Table.Row>
);

const TilskuddsprosentRad: React.FC<{ label: string; prosent: number; borderTop?: boolean; cls: BEMWrapper }> = ({
    label,
    prosent,
    cls,
}) => (
    <Table.Row>
        <Table.DataCell className={cls.element('col-icon')}>
            <PieChartIcon />
        </Table.DataCell>
        <Table.DataCell colSpan={2}>{label}</Table.DataCell>
        <Table.DataCell className={cls.element('operator-cell')}>
            <PercentIcon />
        </Table.DataCell>
        <Table.DataCell align="right" className={cls.element('verdi-cell')}>
            {prosent}
        </Table.DataCell>
    </Table.Row>
);

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
        erNil(sats) ? undefined : `(${formaterNorskeTall(sats * 100)}%)`;

    return (
        <ExpansionCard defaultOpen aria-label="Tilskudd for en måned" size="small">
            <ExpansionCard.Header>
                <Heading level="2" size="small">
                    Tilskudd for en måned
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Table className={cls.className}>
                    <Table.Body>
                        <Utregningsrad
                            className={cls.className}
                            icon={<StillingsprosentIkon />}
                            label="Stillingsprosent"
                            operator={<PercentIcon />}
                            verdi={props.stillingprosent || 0}
                            ikkePenger
                        />
                        <Utregningsrad
                            className={cls.className}
                            icon={<SackKronerIcon />}
                            label="Månedslønn"
                            operator={<PlusIcon />}
                            verdi={props.manedslonn || 0}
                        />
                        <Utregningsrad
                            className={cls.className}
                            icon={<ParasolBeachIcon />}
                            label="Feriepenger"
                            midtrekkeTekst={prosentSats(props.feriepengesats)}
                            operator={<PlusIcon />}
                            verdi={props.feriepengerBelop || 0}
                        />
                        <Utregningsrad
                            className={cls.className}
                            icon={<PiggybankIcon />}
                            label="Obligatorisk tjenestepensjon"
                            midtrekkeTekst={prosentSats(props.otpSats)}
                            operator={<PlusIcon />}
                            verdi={props.otpBelop || 0}
                        />
                        <Utregningsrad
                            className={cls.className}
                            icon={<Buildings2Icon />}
                            label="Arbeidsgiveravgift"
                            midtrekkeTekst={prosentSats(props.arbeidsgiveravgift)}
                            operator={<PlusIcon />}
                            verdi={props.arbeidsgiveravgiftBelop || 0}
                        />
                        <Utregningsrad
                            className={`${cls.element('fet-border-bottom')} ${cls.className}`}
                            label="Sum utgifter"
                            operator={<EqualsIcon />}
                            verdi={props.sumLonnsutgifter || 0}
                        />

                        {/* Tilskuddsprosent (før eventuell reduksjon) */}
                        <TilskuddsprosentRad
                            label={
                                props.datoForRedusertProsent
                                    ? `Tilskuddsprosent frem til ${formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}`
                                    : 'Tilskuddsprosent'
                            }
                            prosent={props.lonnstilskuddProsent || 0}
                            cls={cls}
                        />

                        <SummeringsRad sum={props.sumLonnstilskudd || 0} />

                        {props.datoForRedusertProsent && (
                            <>
                                <TilskuddsprosentRad
                                    label={`Tilskuddsprosent fra og med ${formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}`}
                                    prosent={
                                        props.lonnstilskuddProsent
                                            ? regnUtRedusertProsent(props.lonnstilskuddProsent)
                                            : 0
                                    }
                                    cls={cls}
                                />
                                <SummeringsRad sum={props.sumLønnstilskuddRedusert || 0} />
                            </>
                        )}
                    </Table.Body>
                </Table>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UtregningPanel;
