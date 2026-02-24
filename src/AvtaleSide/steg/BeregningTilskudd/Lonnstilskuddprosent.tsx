import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/radiopanel/RadioPanelGruppeHorisontal';
import { Beregningsgrunnlag, TiltaksType } from '@/types/avtale';
import React, { FunctionComponent } from 'react';

type Props = {
    tiltakstype: TiltaksType;
    lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent'];
    settLonnstilskuddProsent: (lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent']) => void;
};

const LonnstilskuddProsent: FunctionComponent<Props> = (props) => {
    if (props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
        return (
            <RadioPanelGruppeHorisontal
                radios={[
                    { label: '40 %', value: '40' },
                    { label: '60 %', value: '60' },
                ]}
                name="lonnstilskuddProsent"
                checked={props.lonnstilskuddProsent + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    props.settLonnstilskuddProsent(parseInt(verdi, 10))
                }
            />
        );
    } else if (props.tiltakstype === 'VARIG_LONNSTILSKUDD') {
        return (
            <ProsentInput
                name="lonnstilskuddProsent"
                label=""
                value={props.lonnstilskuddProsent}
                onChange={(event: any) => {
                    props.settLonnstilskuddProsent(parseInt(event.target.value, 10));
                }}
                min={0}
                max={75}
            />
        );
    } else if (props.tiltakstype === 'SOMMERJOBB') {
        return (
            <RadioPanelGruppeHorisontal
                radios={[
                    { label: '50 %', value: '50' },
                    { label: '75 %', value: '75' },
                ]}
                name="lonnstilskuddProsent"
                checked={props.lonnstilskuddProsent + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    props.settLonnstilskuddProsent(parseInt(verdi, 10))
                }
            />
        );
    } else {
        return null;
    }
};

export default LonnstilskuddProsent;
