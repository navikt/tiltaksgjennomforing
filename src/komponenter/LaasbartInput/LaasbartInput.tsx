import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Context, medContext, Rolle } from '../../AvtaleContext';
import ReadOnlyFelt from './ReadOnlyFelt/ReadOnlyFelt';

interface Props {
    label: React.ReactNode;
    verdi: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
}

const LaasbartInput: React.FunctionComponent<Props & Context> = props => {
    const skalKunneEndresAv = (rolle: Rolle) => {
        return rolle === 'ARBEIDSGIVER' || rolle === 'VEILEDER';
    };

    return (
        <>
            {skalKunneEndresAv(props.rolle) ? (
                <Input
                    className={props.className}
                    label={props.label}
                    defaultValue={props.verdi}
                    onChange={props.onChange}
                    disabled={props.disabled}
                />
            ) : (
                <ReadOnlyFelt
                    label={props.label}
                    tekst={props.verdi}
                    className={props.className}
                />
            )}
        </>
    );
};

export default medContext<Props>(LaasbartInput);
