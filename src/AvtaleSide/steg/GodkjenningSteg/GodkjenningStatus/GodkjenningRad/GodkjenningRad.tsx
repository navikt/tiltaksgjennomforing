import CheckIkon from '@/assets/ikoner/check.svg?react';
import VarselIkon from '@/assets/ikoner/varsel.svg?react';
import { TiltaksType } from '@/types/avtale';
import { formatterDato } from '@/utils/datoUtils';
import { BodyShort, Label } from '@navikt/ds-react';
import React from 'react';
import './GodkjenningRad.less';

interface Props {
    godkjentAvtale?: string;
    navn: string;
    tiltakstype?: TiltaksType;
}

const GodkjenningRad: React.FunctionComponent<Props> = (props: Props) => {
    const Ikon = props.godkjentAvtale ? CheckIkon : VarselIkon;
    const harGodkjentTekst = props.tiltakstype === 'MENTOR' ? 'Signert' : 'Godkjent';
    const måGodkjenneTekst = props.tiltakstype === 'MENTOR' ? 'Må signere' : 'Må godkjenne';

    const godkjentStatus: string = props.godkjentAvtale
        ? harGodkjentTekst + ' ' + formatterDato(props.godkjentAvtale)
        : måGodkjenneTekst;

    const navn = props.navn;

    return (
        <div className="godkjenningsrad">
            <BodyShort size="small">{navn}</BodyShort>
            <div className="godkjenningsrad__status">
                <Label>{godkjentStatus}</Label>
                <Ikon title="Godkjenningsgrad" className="godkjenningsrad__godkjenningIkon" />
            </div>
        </div>
    );
};

export default GodkjenningRad;
