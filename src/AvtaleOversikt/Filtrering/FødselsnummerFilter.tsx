import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input } from 'nav-frontend-skjema';
import useValidering from '@/komponenter/useValidering';
import { validerFnr } from '@/utils/fnrUtils';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';

export const FødselsnummerFilter: FunctionComponent<FiltreringProps> = props => {
    const [fnr, setFnr] = useState<string>('');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(fnr, [
        verdi => {
            if (verdi && !validerFnr(verdi)) {
                return { feilmelding: 'Ugyldig fødselsnummer' };
            }
        },
    ]);

    const endreSøk = () => {
        if (!skjemaelementfeil) {
            props.endreSøk('deltakerFnr', fnr);
        }
    };

    const onBlur = () => {
        valider();
        if (!fnr) {
            props.endreSøk('deltakerFnr', '');
        }
    };

    const enterKlikk = (event: any) => {
        if (event.key === 'Enter') {
            setFnr(event.currentTarget.value);
            valider();
            endreSøk();
        }
    };

    return (
        <Filter tittel="Deltaker">
            <Input
                maxLength={11}
                label="Fødselsnummer"
                value={fnr}
                onChange={event => {
                    setFnr(event.target.value);
                    setSkjemaelementfeil(undefined);
                }}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                bredde="M"
                feil={skjemaelementfeil}
            />
            <Søkeknapp onClick={endreSøk} />
        </Filter>
    );
};
