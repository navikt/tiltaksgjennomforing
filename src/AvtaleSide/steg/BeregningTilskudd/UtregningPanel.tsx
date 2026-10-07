import { Beregningsgrunnlag } from '@/types/avtale';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formaterPenger } from '@/utils';
import { ExpansionCard, Heading, Hide, Show, Table } from '@navikt/ds-react';
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
import styles from './utregning-panel.module.less';
import Utregningsrad from '@/AvtaleSide/steg/BeregningTilskudd/Utregningsrad';
import { formaterNorskeTall } from '@/utils';
import { erNil } from '@/utils/predicates';

const SummeringsRad: React.FC<{ sum: number }> = ({ sum }) => (
    <Table.Row>
        <Hide below="sm" asChild>
            <Table.DataCell textSize="small" aria-hidden="true" />
        </Hide>
        <Table.DataCell textSize="small">
            <strong>Sum tilskudd for en måned</strong>
        </Table.DataCell>
        <Hide below="sm" asChild>
            <Table.DataCell textSize="small" colSpan={3} align="right">
                <strong>{`Inntil ${formaterPenger(sum)}`}</strong>
            </Table.DataCell>
        </Hide>
        <Show below="sm" asChild>
            <Table.DataCell textSize="small" colSpan={2} align="right">
                <strong>{`Inntil ${formaterPenger(sum)}`}</strong>
            </Table.DataCell>
        </Show>
    </Table.Row>
);

const TilskuddsprosentRad: React.FC<{ label: string; prosent: number; borderTop?: boolean }> = ({ label, prosent }) => (
    <Table.Row>
        <Hide below="sm" asChild>
            <Table.DataCell textSize="small" className={styles.colIcon}>
                <PieChartIcon />
            </Table.DataCell>
        </Hide>
        <Table.DataCell textSize="small" className={styles.labelCell}>
            {label}
        </Table.DataCell>
        <Hide below="sm" asChild>
            <Table.DataCell textSize="small" />
        </Hide>
        <Table.DataCell textSize="small" className={styles.operatorCell}>
            <PercentIcon />
        </Table.DataCell>
        <Table.DataCell textSize="small" align="right" className={styles.verdiCell}>
            {prosent}
        </Table.DataCell>
    </Table.Row>
);

const UtregningPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
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
                <Table className={styles.utregningspanel}>
                    <Table.Body>
                        <Utregningsrad
                            icon={<PercentIcon />}
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
                            className={styles.fetBorderBottom}
                            label="Sum utgifter"
                            operator={<EqualsIcon />}
                            verdi={props.sumLonnsutgifter || 0}
                        />

                        {props.tiltakstype === 'FIREARIG_LONNSTILSKUDD' && props.tilskuddstrinn.length > 0 && (
                            <>
                                <TilskuddsprosentRad
                                    label="Tilskuddsprosent 1. år"
                                    prosent={props.tilskuddstrinn[0]?.prosent || 0}
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
