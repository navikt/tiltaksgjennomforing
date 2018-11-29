import * as React from 'react';
import { Select } from 'nav-frontend-skjema';

interface Props {
    min: number;
    max: number;
    verdi: number;
    onChange: (verdi: number) => void;
    label: string;
}

const Ukevelger = (props: Props) => {
    const uker = [];
    for (let i = props.min; i <= props.max; i++) {
        uker.push(i);
    }

    const ukeValg = uker.map(uke => (
        <option value={uke} key={uke}>
            {uke === 1 ? `${uke} uke` : `${uke} uker`}
        </option>
    ));

    return (
        <Select
            className="ukevelger"
            label={props.label}
            value={props.verdi}
            onChange={event =>
                props.onChange(Number(event.currentTarget.value))
            }
            bredde={'s'}
        >
            {ukeValg}
        </Select>
    );
};

export default Ukevelger;
