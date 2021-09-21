import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { Radio, Select } from 'nav-frontend-skjema';
import React, { FormEvent, Fragment, FunctionComponent, useContext, useState } from 'react';
import { useFilter } from '@/AvtaleOversikt/NyFiltrering/useFilter';

type Validering = (verdi: string) => string | undefined;

const navIdentValidering: Validering = (verdi) => (!verdi.match(/\w\d{6}/) ? 'Ugyldig NAV-ident' : undefined);

const fnrValidering: Validering = (verdi) => (!validerFnr(verdi) ? 'Ugyldig fødselsnummer' : undefined);

const orgNrValidering: Validering = (verdi) => (!validerOrgnr(verdi) ? 'Ugyldig bedriftsnummer' : undefined);

type Søketype = 'deltaker' | 'bedrift' | 'egne' | 'avtaleVedEnhet' | 'ufordelte' | 'avtaleNr';

const finnAktivSøketype: (filtre: any) => Søketype = (filtre: any) => {
    if (filtre.veilederNavIdent !== undefined) {
        return 'egne';
    }
    if (filtre.bedriftNr !== undefined) {
        return 'bedrift';
    }
    if (filtre.avtaleNr !== undefined) {
        return 'avtaleNr';
    }
    return 'egne';
};

export const DeltakerOgBedriftFilter: FunctionComponent = () => {
    const {filtre, endreFilter} = useFilter();
    const [aktivSøketype, setAktivSøketype] = useState<Søketype>(finnAktivSøketype(filtre));
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const tomt = {
        deltakerFnr: undefined,
        bedriftNr: undefined,
        veilederNavIdent: undefined,
        erUfordelt: undefined,
        navEnhet: undefined,
        avtaleNr: undefined,
    };
    const søk = {
        egne: {
            key: 'egetsok',
            placeholder: '',
            label: 'Tilknyttet meg',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => endreFilter({ ...tomt, veilederNavIdent: innloggetBruker.identifikator }),
        },
        veileder: {
            key: 'veileder',
            placeholder: 'NAV-ident',
            label: 'På en veileder',
            maxLength: 7,
            validering: navIdentValidering,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, veilederNavIdent: søkeord }),
        },
        deltaker: {
            key: 'deltaker',
            placeholder: 'Fødselsnummer',
            label: 'På en deltaker',
            maxLength: 11,
            validering: fnrValidering,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, deltakerFnr: søkeord }),
        },
        bedrift: {
            key: 'bedrift',
            placeholder: 'Bedriftsnummer',
            label: 'På en bedrift',
            maxLength: 9,
            validering: orgNrValidering,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, bedriftNr: søkeord }),
        },
        avtaleNr: {
            key: 'avtalenr',
            placeholder: 'Avtalenummer',
            label: 'På et avtalenummer',
            maxLength: 6,
            validering: () => void 0,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, avtaleNr: Number.parseInt(søkeord) }), // Uheldig parse :/
        },
        avtaleVedEnhet: {
            key: 'fordeltEnhet',
            placeholder: '',
            label: 'På en enhet',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => endreFilter({ ...tomt, navEnhet: innloggetBruker.navEnheter[0].verdi }),
        },
        ufordelte: {
            key: 'utfordelt',
            placeholder: '',
            label: 'Ufordelte',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => endreFilter({ ...tomt, navEnhet: innloggetBruker.navEnheter[0].verdi, erUfordelt: true }),
        },
    };

    const endreSøketype = (event: FormEvent<HTMLInputElement>) => {
        const nySøketype = event.currentTarget.value as Søketype;
        setAktivSøketype(nySøketype);

        if (nySøketype === 'egne' || nySøketype === 'ufordelte' || nySøketype === 'avtaleVedEnhet') {
            søk[nySøketype].utførSøk();
        }
    };

    const getNavEnhetOptions = innloggetBruker.navEnheter.sort().map((enhet, index) => (
        <option key={index} value={enhet.verdi}>
            {enhet.navn} ({enhet.verdi})
        </option>
    ));

    const aktueltSøk = søk[aktivSøketype];
    const visSøkefelt: boolean =
        aktivSøketype !== 'egne' && aktivSøketype !== 'ufordelte' && aktivSøketype !== 'avtaleVedEnhet';
    const avtalePrEnhet: boolean = aktivSøketype === 'avtaleVedEnhet';
    const ufordelt: boolean = aktivSøketype === 'ufordelte';

    return (
        <Filter tittel="Vis avtaler">
            {Object.entries(søk).map(([key, value]) => (
                <Fragment key={key}>
                    <Radio
                        label={value.label}
                        name={'aktivSøketype'}
                        value={key}
                        checked={aktivSøketype === key}
                        onChange={endreSøketype}
                        role="radio"
                    />
                    <VerticalSpacer rem={1} />
                </Fragment>
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
                />
            )}
            {avtalePrEnhet && (
                <Select
                    label=""
                    name={aktueltSøk.key}
                    onChange={(event) => {
                        const nyEnhet = event.currentTarget.value;
                        endreFilter({
                            navEnhet: nyEnhet,
                        });
                    }}
                    aria-label="filtere på NAV enhet"
                >
                    {getNavEnhetOptions}
                </Select>
            )}
            {ufordelt && (
                <Select
                    label=""
                    name={aktueltSøk.key}
                    onChange={(event) => {
                        const nyEnhet = event.currentTarget.value;
                        endreFilter({ navEnhet: nyEnhet, erUfordelt: true });
                    }}
                    aria-label="filtere på NAV enhet"
                >
                    {getNavEnhetOptions}
                </Select>
            )}
        </Filter>
    );
};
