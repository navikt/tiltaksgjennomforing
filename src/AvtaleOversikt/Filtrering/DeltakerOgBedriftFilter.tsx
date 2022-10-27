import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { Radio, Select } from 'nav-frontend-skjema';
import React, { FormEvent, Fragment, FunctionComponent, useContext, useState } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

type Validering = (verdi: string) => string | undefined;

const navIdentValidering: Validering = (verdi) => (!verdi.match(/\w\d{6}/) ? 'Ugyldig NAV-ident' : undefined);

const fnrValidering: Validering = (verdi) => (!validerFnr(verdi) ? 'Ugyldig fødselsnummer' : undefined);

const orgNrValidering: Validering = (verdi) => (!validerOrgnr(verdi) ? 'Ugyldig virksomhetsnummer' : undefined);

type Søketype = 'deltaker' | 'veileder' | 'bedrift' | 'egne' | 'avtaleVedEnhet' | 'ufordelte' | 'avtaleNr';

export const DeltakerOgBedriftFilter: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { endreFilter, filtre } = useFilter();

    const aktivSøketypeFraFiltre = () => {
        if (filtre.veilederNavIdent !== undefined && filtre.veilederNavIdent !== innloggetBruker.identifikator) {
            return 'veileder';
        }
        if (filtre.erUfordelt !== undefined) {
            return 'ufordelte';
        }
        if (filtre.deltakerFnr !== undefined) {
            return 'deltaker';
        }
        if (filtre.navEnhet !== undefined) {
            return 'avtaleVedEnhet';
        }
        if (filtre.bedriftNr !== undefined) {
            return 'bedrift';
        }
        if (filtre.avtaleNr !== undefined) {
            return 'avtaleNr';
        }
        return 'egne';
    };
    const [aktivSøketype, setAktivSøkeType] = useState<Søketype>(aktivSøketypeFraFiltre());

    const tomt = {
        avtaleNr: undefined,
        deltakerFnr: '',
        bedriftNr: '',
        veilederNavIdent: '',
        erUfordelt: false,
        navEnhet: '',
    };
    const søk: { [k in Søketype]: any } = {
        egne: {
            placeholder: '',
            label: 'Tilknyttet meg',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => endreFilter({ ...tomt, veilederNavIdent: innloggetBruker.identifikator }),
        },
        veileder: {
            placeholder: 'NAV-ident',
            label: 'På en veileder',
            maxLength: 7,
            validering: navIdentValidering,
            søkeinput: filtre.veilederNavIdent,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, veilederNavIdent: søkeord }),
        },
        deltaker: {
            placeholder: 'Fødselsnummer',
            label: 'På en deltaker',
            maxLength: 11,
            validering: fnrValidering,
            søkeinput: filtre.deltakerFnr,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, deltakerFnr: søkeord }),
        },
        bedrift: {
            placeholder: 'Virksomhetsnummer',
            label: 'På en bedrift',
            maxLength: 9,
            validering: orgNrValidering,
            søkeinput: filtre.bedriftNr,
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, bedriftNr: søkeord }),
        },
        avtaleNr: {
            placeholder: 'Avtalenummer',
            label: 'På et avtalenummer',
            maxLength: 6,
            validering: () => void 0,
            søkeinput: filtre.avtaleNr,
            utførSøk: (søkeord: number) => endreFilter({ ...tomt, avtaleNr: søkeord }),
        },
        avtaleVedEnhet: {
            placeholder: '',
            label: 'På en enhet',
            maxLength: 0,
            validering: () => undefined,
            select: filtre.navEnhet,
            utførSøk: () => endreFilter({ ...tomt, navEnhet: innloggetBruker.navEnheter[0].verdi }),
        },
        ufordelte: {
            placeholder: '',
            label: 'Ufordelte',
            maxLength: 0,
            validering: () => undefined,
            select: filtre.navEnhet,
            utførSøk: () => endreFilter({ ...tomt, navEnhet: innloggetBruker.navEnheter[0].verdi, erUfordelt: true }),
        },
    };

    const endreSøketype = (event: FormEvent<HTMLInputElement>) => {
        const nySøketype = event.currentTarget.value as Søketype;
        setAktivSøkeType(nySøketype);
        if (nySøketype === 'egne' || nySøketype === 'ufordelte' || nySøketype === 'avtaleVedEnhet') {
            søk[nySøketype].utførSøk();
        }
    };

    const navEnhetOptions = innloggetBruker.navEnheter.sort().map((enhet, index) => (
        <option key={index} value={enhet.verdi}>
            {enhet.navn} ({enhet.verdi})
        </option>
    ));

    const aktueltSøk = søk[aktivSøketype];
    const visSøkefelt =
        aktivSøketype === 'deltaker' ||
        aktivSøketype === 'bedrift' ||
        aktivSøketype === 'veileder' ||
        aktivSøketype === 'avtaleNr';
    const avtalePrEnhet = aktivSøketype === 'avtaleVedEnhet';
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
                    className="sok"
                    key={aktivSøketype}
                    label=""
                    placeholder={aktueltSøk.placeholder}
                    maxLength={aktueltSøk.maxLength}
                    utførSøk={aktueltSøk.utførSøk}
                    valider={aktueltSøk.validering}
                    defaultVerdi={aktueltSøk.søkeinput}
                    role="searchbox"
                />
            )}
            {avtalePrEnhet && (
                <Select
                    label=""
                    name={aktueltSøk.key}
                    value={aktueltSøk.select}
                    onChange={(event) => {
                        const nyEnhet = event.currentTarget.value;
                        endreFilter({
                            navEnhet: nyEnhet,
                        });
                    }}
                    aria-label="filtere på NAV enhet"
                >
                    {navEnhetOptions}
                </Select>
            )}
            {ufordelt && (
                <Select
                    label=""
                    name={aktueltSøk.key}
                    value={aktueltSøk.select}
                    onChange={(event) => {
                        const nyEnhet = event.currentTarget.value;
                        endreFilter({ navEnhet: nyEnhet });
                    }}
                    aria-label="filtere på NAV enhet"
                >
                    {navEnhetOptions}
                </Select>
            )}
        </Filter>
    );
};
