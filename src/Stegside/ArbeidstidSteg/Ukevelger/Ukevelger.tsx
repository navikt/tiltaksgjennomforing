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
    const uker = [0];
    for (let i = props.min; i <= props.max; i++) {
        uker.push(i);
    }

    const lagLabel = (uke: number) => {
        switch (uke) {
            case 0:
                return '';
            case 1:
                return '1 uke';
            default:
                return `${uke} uker`;
        }
    };

    const ukeValg = uker.map(uke => (
        <option value={uke} key={uke}>
            {lagLabel(uke)}
        </option>
    ));

    return (
        <Select
            className="ukevelger"
            label={props.label}
            value={props.verdi || 0}
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
