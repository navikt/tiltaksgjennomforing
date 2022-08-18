import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import { TiltaksType } from '@/types/avtale';
import { formatterDato } from '@/utils/datoUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import './GodkjenningRad.less';

interface Props {
    godkjentAvtale?: string;
    navn: string;
    tiltakstype?: TiltaksType;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const harGodkjentTekst = props.tiltakstype === 'MENTOR' ? 'Signert' : 'Godkjent';
    const måGodkjenneTekst = props.tiltakstype === 'MENTOR' ? 'Må signere' : 'Må godkjenne';

    const godkjentStatus: string = props.godkjentAvtale
        ? harGodkjentTekst + ' ' + formatterDato(props.godkjentAvtale)
        : måGodkjenneTekst;

    const navn = props.navn;

    return (
        <div className="godkjenningsrad">
            <Normaltekst tag={'span'}>{navn}</Normaltekst>
            <div className="godkjenningsrad__status">
                <Element tag={'span'}>{godkjentStatus}</Element>
                <img
                    alt="Godkjenningsgrad"
                    className="godkjenningsrad__godkjenningIkon"
                    src={props.godkjentAvtale ? CheckIkon : VarselIkon}
                />
            </div>
        </div>
    );
};

export default GodkjenningRad;
