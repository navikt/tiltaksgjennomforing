import * as React from 'react';
import { Input } from 'nav-frontend-skjema';

interface Props {
    label: string;
    verdi: number;
    onChange: (verdi: number) => void;
}

const StillingsprosentInput = (props: Props) => (
    <>
        <Input
            label={props.label}
            value={props.verdi}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
                props.onChange(Number(event.currentTarget.value))
            }
        />
    </>
);

export default StillingsprosentInput;
