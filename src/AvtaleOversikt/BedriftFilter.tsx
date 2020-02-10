import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Input } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { FiltreringProps, Søkekriterier } from '@/AvtaleOversikt/Filtrering';

export const BedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [bedriftNr, setBedriftNr] = useState<string>('');
    const endreBedriftNrSøk = (søkeverdi: Søkekriterier['bedriftNr']) => props.endreSøkeverdi('bedriftNr', søkeverdi);

    return (
        <div className={'innholdsboks'}>
            <Undertittel>Bedrift</Undertittel>
            <VerticalSpacer sixteenPx={true} />
            <Input
                label="Bedriftnummer"
                defaultValue={bedriftNr}
                onChange={event => setBedriftNr(event.target.value)}
                bredde="M"
                maxLength={9}
            />
            <Søkeknapp onClick={() => endreBedriftNrSøk(bedriftNr)} />
        </div>
    );
};
