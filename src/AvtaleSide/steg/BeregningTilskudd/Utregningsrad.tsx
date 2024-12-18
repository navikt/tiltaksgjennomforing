import { formaterNorskeTall, formaterPenger } from '@/utils';
import { BodyShort, Label, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';
import BEMHelper from '../../../utils/bem';
import './UtregningPanel.less';

interface Props {
    labelIkon?: React.ReactNode;
    labelTekst: string;
    labelSats?: number;
    midtrekkeTekst?: ReactNode;
    verdiOperator?: string | ReactNode;
    verdi: string | number;
    borderTykk?: boolean;
    ikkePenger?: boolean;
    tekstType?: string;
}

const cls = BEMHelper('utregningspanel');

const Utregningsrad: FunctionComponent<Props> = (props: Props) => {
    const setIkon = (ikon?: React.ReactNode) => (ikon ? ikon : <div className={cls.element('ikon-placeholder')} />);

    const setOperator = (operator?: string | ReactNode) =>
        operator ? (
            <Heading size="medium" className={cls.element('operator')}>
                {operator}
            </Heading>
        ) : null;

    const setLabelSats = (sats?: number) =>
        sats !== undefined && sats !== null ? (
            <BodyShort size="small" className={cls.element('label-sats')}>
                ({formaterNorskeTall(sats * 100)}%)
            </BodyShort>
        ) : null;

    const parseVerdi = (verdi: string | number) => {
        const verdiSomNumber = parseInt(verdi.toString(), 10);
        return !isNaN(verdiSomNumber) && !props.ikkePenger ? formaterPenger(verdiSomNumber) : verdi;
    };

    return (
        <div className={cls.element('utregning-rad', props.borderTykk ? 'tykkbunn' : '')}>
            <div className={cls.element('utregning-label')}>
                <div className={cls.element('label-innhold')}>
                    {setIkon(props.labelIkon)}
                    {props.tekstType ? (
                        <Label>{props.labelTekst}</Label>
                    ) : (
                        <BodyShort size="small">{props.labelTekst}</BodyShort>
                    )}
                </div>
                {setLabelSats(props.labelSats)}
                {props.midtrekkeTekst}
            </div>
            <div className={cls.element('utregning-verdi')}>
                {setOperator(props.verdiOperator)}
                {props.tekstType ? (
                    <Label>{parseVerdi(props.verdi)}</Label>
                ) : (
                    <BodyShort size="small">{parseVerdi(props.verdi)}</BodyShort>
                )}
            </div>
        </div>
    );
};

export default Utregningsrad;
