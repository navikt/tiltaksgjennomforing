import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import { Beregningsgrunnlag, TiltaksType } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const radioer = (erNavAnsatt: boolean) => {
    return [
        { label: '40 %', value: '40', disabled: !erNavAnsatt },
        { label: '60 %', value: '60', disabled: !erNavAnsatt },
    ];
};

type Props = {
    tiltakstype: TiltaksType;
    lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent'];
    settLonnstilskuddProsent: (lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent']) => void;
};

const LonnstilskuddProsent: FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    if (props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
        return (
            <RadioPanelGruppeHorisontal
                radios={radioer(innloggetBruker.erNavAnsatt)}
                name="lonnstilskuddProsent"
                checked={props.lonnstilskuddProsent + ''}
                legend=""
                onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                    props.settLonnstilskuddProsent(parseInt(verdi))
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
                    props.settLonnstilskuddProsent(parseInt(event.target.value));
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
