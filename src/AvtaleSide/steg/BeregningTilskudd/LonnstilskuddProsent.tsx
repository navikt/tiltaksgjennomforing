import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import { AvtaleMetadata, Beregningsgrunnlag } from '@/types/avtale';
import React, { FunctionComponent } from 'react';

type Props = {
    tiltakstype: AvtaleMetadata['tiltakstype'];
    lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent'];
    onChange: () => void;
    radioButtons: () => { label: string; value: string }[];
};

const LonnstilskuddProsent: FunctionComponent<Props> = props => {
    const lonnstilskuddProsent = () => {
        if (props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
            return (
                <RadioPanelGruppeHorisontal
                    radios={props.radioButtons()}
                    name="lonnstilskuddProsent"
                    checked={props.lonnstilskuddProsent + ''}
                    legend=""
                    onChange={() => props.onChange()}
                />
            );
        } else if (props.tiltakstype === 'VARIG_LONNSTILSKUDD') {
            return (
                <ProsentInput
                    name="lonnstilskuddProsent"
                    bredde="S"
                    label=""
                    value={props.lonnstilskuddProsent}
                    onChange={() => props.onChange()}
                    min={0}
                    max={75}
                />
            );
        } else {
            return null;
        }
    };

    return <div>{lonnstilskuddProsent()}</div>;
};

export default LonnstilskuddProsent;
