import { visSatsMedEttDesimal } from '@/utils/lonnstilskuddUtregningUtils';
import TypografiBase, { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import BEMHelper from '../../../utils/bem';
import { formatterPenger } from '../../../utils/PengeUtils';
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
        operator ? <Systemtittel className={cls.element('operator')}>{operator}</Systemtittel> : null;

    const setLabelSats = (sats?: number) =>
        sats !== undefined && sats !== null ? (
            <Normaltekst className={cls.element('label-sats')}>({visSatsMedEttDesimal(sats)}%)</Normaltekst>
        ) : null;

    const parseVerdi = (verdi: string | number) => {
        const verdiSomNumber = parseInt(verdi.toString(), 10);
        return !isNaN(verdiSomNumber) && !props.ikkePenger ? formatterPenger(verdiSomNumber) : verdi;
    };

    return (
        <div className={cls.element('utregning-rad', props.borderTykk ? 'tykkbunn' : '')}>
            <div className={cls.element('utregning-label')}>
                <div className={cls.element('label-innhold')}>
                    {setIkon(props.labelIkon)}
                    <TypografiBase type={props.tekstType || 'normaltekst'}>{props.labelTekst}</TypografiBase>
                </div>
                {setLabelSats(props.labelSats)}
                {props.midtrekkeTekst}
            </div>

            <div className={cls.element('utregning-verdi')}>
                {setOperator(props.verdiOperator)}
                <TypografiBase type={props.tekstType || 'normaltekst'} className={cls.element('sum')}>
                    {parseVerdi(props.verdi)}
                </TypografiBase>
            </div>
        </div>
    );
};

export default Utregningsrad;
