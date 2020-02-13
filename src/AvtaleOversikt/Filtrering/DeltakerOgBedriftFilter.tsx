import * as React from 'react';
import { FormEvent, FunctionComponent, useContext, useState } from 'react';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { validerFnr } from '@/utils/fnrUtils';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Radio } from 'nav-frontend-skjema';

type Validering = (verdi: string) => SkjemaelementFeil | undefined;

const fnrValidering: Validering = verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined);
const orgNrValidering: Validering = verdi =>
    !validerOrgnr(verdi) ? { feilmelding: 'Ugyldig bedriftsnummer' } : undefined;

type Søketype = 'deltaker' | 'bedrift' | 'egne';

export const DeltakerOgBedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [søketype, setAktueltSøk] = useState<Søketype>('egne');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const tomt = { deltakerFnr: '', bedriftNr: '', veilederNavIdent: '' };

    const søk = {
        egne: {
            placeholder: '',
            label: 'Opprettet selv',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => props.endreSøk({ ...tomt, veilederNavIdent: innloggetBruker.identifikator }),
        },
        deltaker: {
            placeholder: 'Fødselsnummer',
            label: 'Fødselsnummer',
            maxLength: 11,
            validering: fnrValidering,
            utførSøk: (søkeord: string) => props.endreSøk({ ...tomt, deltakerFnr: søkeord }),
        },
        bedrift: {
            placeholder: 'Bedriftsnummer',
            label: 'Bedriftsnummer',
            maxLength: 9,
            validering: orgNrValidering,
            utførSøk: (søkeord: string) => props.endreSøk({ ...tomt, bedriftNr: søkeord }),
        },
    };

    const aktueltSøk = søk[søketype];

    const endreSøketype = (event: FormEvent<HTMLInputElement>) => {
        const nySøketype = event.currentTarget.value as Søketype;
        setAktueltSøk(nySøketype);
        if (nySøketype === 'egne') {
            søk.egne.utførSøk();
        }
    };

    return (
        <Filter tittel={'Vis avtaler'}>
            {Object.entries(søk).map(([key, value]) => (
                <Radio
                    label={value.label}
                    name={'søketype'}
                    key={key}
                    value={key}
                    checked={søketype === key}
                    onChange={endreSøketype}
                />
            ))}
            <SøkeInput
                key={søketype}
                label=""
                placeholder={aktueltSøk.placeholder}
                maxLength={aktueltSøk.maxLength}
                utførSøk={aktueltSøk.utførSøk}
                valider={aktueltSøk.validering}
                hidden={søketype === 'egne'}
            />
        </Filter>
    );
};
