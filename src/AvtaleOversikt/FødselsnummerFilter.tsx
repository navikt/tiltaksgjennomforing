import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input } from 'nav-frontend-skjema';
import { FiltreringProps, Søketyper } from '@/AvtaleOversikt/Filtrering';

export const FødselsnummerFilter: FunctionComponent<FiltreringProps> = props => {
    const [fnr, setFnr] = useState<string>('');

    return (
        <div className={'innholdsboks'}>
            <Undertittel>Fødselsnummer</Undertittel>
            <VerticalSpacer sixteenPx={true} />
            <Input label="Fødselsnummer" defaultValue={fnr} onChange={event => setFnr(event.target.value)} bredde="M" />
            <Søkeknapp onClick={() => props.sokEtterAvtaler({ søketype: Søketyper.DeltakerSøk, deltakerFnr: fnr })} />
        </div>
    );
};
