import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { Radio, Select } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { FormEvent, FunctionComponent, useContext, useState } from 'react';

type Validering = (verdi: string) => SkjemaelementFeil | undefined;

const navIdentValidering: Validering = verdi =>
    !verdi.match(/\w\d{6}/) ? { feilmelding: 'Ugyldig NAV-ident' } : undefined;

const fnrValidering: Validering = verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined);

const orgNrValidering: Validering = verdi =>
    !validerOrgnr(verdi) ? { feilmelding: 'Ugyldig bedriftsnummer' } : undefined;

type Søketype = 'deltaker' | 'bedrift' | 'egne' | 'ufordelte';

export const DeltakerOgBedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [aktivSøketype, setAktivSøketype] = useState<Søketype>('egne');
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const navEnhetValgt = props.navEnheter?.length !== 0 ? props.navEnheter?.sort()![0] : '';

    const tomt = { deltakerFnr: '', bedriftNr: '', veilederNavIdent: '', erUfordelt: false, navEnhet: '' };
    const søk = {
        egne: {
            placeholder: '',
            label: 'Tilknyttet meg',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => props.endreSøk({ ...tomt, veilederNavIdent: innloggetBruker.identifikator }),
        },
        veileder: {
            placeholder: 'NAV-ident',
            label: 'På en veileder',
            maxLength: 7,
            validering: navIdentValidering,
            utførSøk: (søkeord: string) => props.endreSøk({ ...tomt, veilederNavIdent: søkeord }),
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
            utførSøk: () => props.endreSøk({ ...tomt, navEnhet: navEnhetValgt }),
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
    const visSøkefelt: boolean = aktivSøketype !== 'egne' && aktivSøketype !== 'ufordelte';
    const visNAVEnheterVelgeren: boolean = aktivSøketype === 'ufordelte';

    return (
        <Filter tittel="Vis avtaler">
            {Object.entries(søk).map(([key, value]) => (
                <Radio
                    label={value.label}
                    name={'aktivSøketype'}
                    key={key}
                    value={key}
                    checked={aktivSøketype === key}
                    onChange={endreSøketype}
                    role="radio"
                    aria-labelledby={value.label}
                />
            ))}
            {visSøkefelt && (
                <SøkeInput
                    key={aktivSøketype}
                    label=""
                    placeholder={aktueltSøk.placeholder}
                    maxLength={aktueltSøk.maxLength}
                    utførSøk={aktueltSøk.utførSøk}
                    valider={aktueltSøk.validering}
                    role="searchbox"
                    aria-labelledby={'søk etter ' + aktueltSøk.placeholder}
                />
            )}
            {visNAVEnheterVelgeren && (
                <Select
                    label=""
                    name={'enheter'}
                    onChange={event => {
                        const nyEnhet = event.currentTarget.value;
                        props.endreSøk({ ...tomt, navEnhet: nyEnhet });
                    }}
                    aria-label="filtere på NAV enhet"
                >
                    {props.navEnheter?.sort().map((enhet, index) => (
                        <option key={index} value={enhet}>
                            Enhet {enhet}
                        </option>
                    ))}
                </Select>
            )}
        </Filter>
    );
};
