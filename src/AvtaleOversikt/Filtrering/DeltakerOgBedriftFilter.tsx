import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { Radio } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import * as React from 'react';
import { FormEvent, FunctionComponent, useContext, useState } from 'react';

type Validering = (verdi: string) => SkjemaelementFeil | undefined;

const fnrValidering: Validering = verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined);
const orgNrValidering: Validering = verdi =>
    !validerOrgnr(verdi) ? { feilmelding: 'Ugyldig bedriftsnummer' } : undefined;

type Søketype = 'deltaker' | 'bedrift' | 'egne';

export const DeltakerOgBedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [aktivSøketype, setAktivSøketype] = useState<Søketype>('egne');
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const tomt = { deltakerFnr: '', bedriftNr: '', veilederNavIdent: '' };
    const søk = {
        egne: {
            placeholder: '',
            label: 'Jeg har opprettet',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => props.endreSøk({ ...tomt, veilederNavIdent: innloggetBruker.identifikator }),
        },
        deltaker: {
            placeholder: 'Fødselsnummer',
            label: 'På en deltaker',
            maxLength: 11,
            validering: fnrValidering,
            utførSøk: (søkeord: string) => props.endreSøk({ ...tomt, deltakerFnr: søkeord }),
        },
        bedrift: {
            placeholder: 'Bedriftsnummer',
            label: 'På en bedrift',
            maxLength: 9,
            validering: orgNrValidering,
            utførSøk: (søkeord: string) => props.endreSøk({ ...tomt, bedriftNr: søkeord }),
        },
    };

    const endreSøketype = (event: FormEvent<HTMLInputElement>) => {
        const nySøketype = event.currentTarget.value as Søketype;
        setAktivSøketype(nySøketype);
        if (nySøketype === 'egne') {
            søk.egne.utførSøk();
        }
    };

    const aktueltSøk = søk[aktivSøketype];

    return (
        <Filter tittel={'Vis avtaler'}>
            {Object.entries(søk).map(([key, value]) => (
                <Radio
                    label={value.label}
                    name={'aktivSøketype'}
                    key={key}
                    value={key}
                    checked={aktivSøketype === key}
                    onChange={endreSøketype}
                />
            ))}
            <SøkeInput
                key={aktivSøketype}
                label=""
                placeholder={aktueltSøk.placeholder}
                maxLength={aktueltSøk.maxLength}
                utførSøk={aktueltSøk.utførSøk}
                valider={aktueltSøk.validering}
                hidden={aktivSøketype === 'egne'}
            />
        </Filter>
    );
};
