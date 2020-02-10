import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import { Avtale, AvtaleMetadata, Beregningsgrunnlag } from '@/types/avtale';
import React, { FunctionComponent } from 'react';

type Props = {
    tiltakstype: AvtaleMetadata['tiltakstype'];
    lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent'];
    settAvtaleVerdi: (felt: keyof Avtale, verdi: any) => void;
    radioButtons: () => { label: string; value: string }[];
};

const LonnstilskuddProsent: FunctionComponent<Props> = props => {
    if (props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
        return (
            <RadioPanelGruppeHorisontal
                radios={props.radioButtons()}
                name="lonnstilskuddProsent"
                checked={props.lonnstilskuddProsent + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    props.settAvtaleVerdi('lonnstilskuddProsent', parseFloat(verdi))
                }
            />
        );
    } else if (props.tiltakstype === 'VARIG_LONNSTILSKUDD') {
        return (
            <ProsentInput
                name="lonnstilskuddProsent"
                bredde="S"
                label=""
                value={props.lonnstilskuddProsent}
                onChange={event => {
                    props.settAvtaleVerdi('lonnstilskuddProsent', parseFloat(event.target.value));
                }}
                min={0}
                max={75}
            />
        );
    } else {
        return null;
    }
};

export default LonnstilskuddProsent;
