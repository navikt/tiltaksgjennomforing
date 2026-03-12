import StillingsprosentIkon from '@/assets/ikoner/stillingsprosent.svg?react';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper, { BEMWrapper } from '@/utils/bem';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formaterPenger } from '@/utils/PengeUtils';
import { ExpansionCard, Heading, Table } from '@navikt/ds-react';
import React, { Fragment, FunctionComponent } from 'react';
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

    const prosentSats = (sats: number | undefined) =>
        erNil(sats) ? undefined : `(${formaterNorskeTall(sats * 100)} %)`;

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

                        {props.tiltakstype === 'FIREARIG_LONNSTILSKUDD' && props.tilskuddstrinn.length > 0 && (
                            <>
                                <TilskuddsprosentRad
                                    label="Tilskuddsprosent 1. år"
                                    prosent={props.tilskuddstrinn[0]?.prosent || 0}
                                    cls={cls}
                                />

                                <SummeringsRad sum={props.tilskuddstrinn[0]?.belopPerMnd || 0} />
                            </>
                        )}

                        {props.tiltakstype !== 'FIREARIG_LONNSTILSKUDD' &&
                            props.tilskuddstrinn.map((trinn) => (
                                <Fragment key={`${trinn.start}-${trinn.slutt}`}>
                                    <TilskuddsprosentRad
                                        label={`Tilskuddsprosent ${formaterDato(trinn.start, NORSK_DATO_FORMAT)} - ${formaterDato(trinn.slutt, NORSK_DATO_FORMAT)}`}
                                        prosent={trinn.prosent || 0}
                                        cls={cls}
                                    />
                                    <SummeringsRad sum={trinn.belopPerMnd || 0} />
                                </Fragment>
                            ))}
                    </Table.Body>
                </Table>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UtregningPanel;
