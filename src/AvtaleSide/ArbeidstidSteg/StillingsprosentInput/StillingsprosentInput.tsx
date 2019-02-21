import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import './StillingsprosentInput.less';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    label: string;
    verdi: number;
    feilmelding?: SkjemaelementFeil;
    onChange: (verdi: number) => void;
}
const oversettTilTall = (prosent: string) => {
    const kunTall = prosent.replace(/\D/g, '');
    return Number(kunTall) > 100 ? 100 : Number(kunTall);
};

const StillingsprosentInput = (props: Props) => (
    <Input
        feil={props.feilmelding}
        className="stillingsprosent-input"
        label={props.label}
        value={props.verdi}
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
            props.onChange(oversettTilTall(event.currentTarget.value))
        }
        onBlur={(event: React.FormEvent<HTMLInputElement>) =>
            props.onChange(oversettTilTall(event.currentTarget.value))
        }
        bredde={'S'}
    />
);

export default StillingsprosentInput;
