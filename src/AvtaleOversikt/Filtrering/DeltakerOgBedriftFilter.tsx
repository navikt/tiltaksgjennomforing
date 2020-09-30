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
import { Feature } from '@/FeatureToggleProvider';

type Validering = (verdi: string) => SkjemaelementFeil | undefined;

const fnrValidering: Validering = verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined);
const orgNrValidering: Validering = verdi =>
    !validerOrgnr(verdi) ? { feilmelding: 'Ugyldig bedriftsnummer' } : undefined;

type Søketype = 'deltaker' | 'bedrift' | 'egne' | 'ufordelte';

export const DeltakerOgBedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [aktivSøketype, setAktivSøketype] = useState<Søketype>('egne');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const arbeidsgiverOppretterToggle = Feature.ArbeidsgiverOppretter;

    const tomt = { deltakerFnr: '', bedriftNr: '', veilederNavIdent: '', erUfordelt: false };
    const søk = {
        egne: {
            placeholder: '',
            label: 'Tilknyttet meg',
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
        ufordelte: {
            placeholder: '',
            label: 'Ufordelte',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => props.endreSøk({ ...tomt, erUfordelt: true }),
        },
    };

    const endreSøketype = (event: FormEvent<HTMLInputElement>) => {
        const nySøketype = event.currentTarget.value as Søketype;
        setAktivSøketype(nySøketype);
        if (nySøketype === 'egne') {
            søk.egne.utførSøk();
        } else if (nySøketype === 'ufordelte') {
            søk.ufordelte.utførSøk();
        }
    };

    const aktueltSøk = søk[aktivSøketype];
    const skjulSøkefelt: boolean = aktivSøketype === 'egne' || aktivSøketype === 'ufordelte';

    const søkEntries = () => {
        if (arbeidsgiverOppretterToggle) {
            return Object.entries(søk);
        }
        return Object.entries(søk).splice(0, 3);
    };

    return (
        <Filter tittel={'Vis avtaler'}>
            {søkEntries().map(([key, value]) => (
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
                hidden={skjulSøkefelt}
            />
        </Filter>
    );
};
