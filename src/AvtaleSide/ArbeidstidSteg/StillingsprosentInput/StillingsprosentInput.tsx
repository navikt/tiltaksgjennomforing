import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import './StillingsprosentInput.less';

interface Props {
    label: string;
    verdi: number;
    onChange: (verdi: number) => void;
}
const stillingsProsent = (prosent: string) => {
    const kunTall = prosent.replace(/\D/g, '');
    return Number(kunTall) > 100 ? '100' : kunTall;
};

const StillingsprosentInput = (props: Props) => (
    <Input
        className="stillingsprosent-input"
        label={props.label}
        value={props.verdi}
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
            props.onChange(Number(stillingsProsent(event.currentTarget.value)))
        }
        bredde={'S'}
    />
);

export default StillingsprosentInput;
