import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { Radio, RadioGroup, Select } from '@navikt/ds-react';
import isNil from 'lodash.isnil';
import { FormEvent, Fragment, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';

type Validering = (verdi: string) => string | undefined;

const navIdentValidering: Validering = (verdi) => (!verdi.match(/\w\d{6}/) ? 'Ugyldig NAV-ident' : undefined);

const fnrValidering: Validering = (verdi) => (!validerFnr(verdi) ? 'Ugyldig fødselsnummer' : undefined);

const orgNrValidering: Validering = (verdi) => (!validerOrgnr(verdi) ? 'Ugyldig virksomhetsnummer' : undefined);

type Søketype = 'alle' | 'deltaker' | 'veileder' | 'bedrift' | 'egne' | 'avtaleVedEnhet' | 'ufordelte' | 'avtaleNr';

export const DeltakerOgBedriftFilter: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { endreFilter, filtre } = useFilter();

    const aktivSøketypeFraFiltre = useCallback((): Søketype => {
        if (!isNil(filtre.veilederNavIdent) && filtre.veilederNavIdent !== innloggetBruker.identifikator) {
            return 'veileder';
        }
        if (!isNil(filtre.erUfordelt)) {
            return 'ufordelte';
        }
        if (!isNil(filtre.deltakerFnr)) {
            return 'deltaker';
        }
        if (!isNil(filtre.navEnhet)) {
            return 'avtaleVedEnhet';
        }
        if (!isNil(filtre.bedriftNr)) {
            return 'bedrift';
        }
        if (!isNil(filtre.avtaleNr)) {
            return 'avtaleNr';
        }
        return innloggetBruker.rolle === 'BESLUTTER' ? 'alle' : 'egne';
    }, [filtre, innloggetBruker]);

    const [aktivSøketype, setAktivSøkeType] = useState<Søketype>(aktivSøketypeFraFiltre());

    useEffect(() => {
        setAktivSøkeType(aktivSøketypeFraFiltre());
    }, [filtre, aktivSøketypeFraFiltre]);

    const tomt = {
        avtaleNr: undefined,
        deltakerFnr: '',
        bedriftNr: '',
        veilederNavIdent: '',
        erUfordelt: false,
        navEnhet: '',
    };
    const søk: { [k in Søketype]: any } = {
        alle: {
            placeholder: '',
            label: 'Alle',
            maxLength: 0,
            validering: () => undefined,
            utførSøk: () => endreFilter({ ...tomt }),
        },
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
            utførSøk: (søkeord: string) => endreFilter({ ...tomt, avtaleNr: parseInt(søkeord) }),
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
        if (['alle', 'egne', 'ufordelte', 'avtaleVedEnhet'].includes(nySøketype)) {
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
            {Object.entries(søk)
                .filter(([key, value]) => {
                    if (innloggetBruker.rolle === 'BESLUTTER') {
                        // Beslutter har et redusert sett med filtreringsmuligheter
                        return ['alle', 'bedrift', 'avtaleNr', 'avtaleVedEnhet'].includes(key);
                    }
                    // Veiledere kan ikke filtrere på "alle"
                    return key !== 'alle';
                })
                .map(([key, value]) => (
                    <Fragment key={key}>
                        <RadioGroup legend="" value={aktivSøketype}>
                            <Radio
                                name={'aktivSøketype'}
                                value={key}
                                onChange={endreSøketype}
                                role="radio"
                                size="small"
                            >
                                {value.label}
                            </Radio>
                        </RadioGroup>
                    </Fragment>
                ))}
            {visSøkefelt && (
                <SøkeInput
                    className="søk"
                    key={aktivSøketype}
                    label=""
                    placeholder={aktueltSøk.placeholder}
                    maxLength={aktueltSøk.maxLength}
                    utførsøk={aktueltSøk.utførSøk}
                    valider={aktueltSøk.validering}
                    verdi={aktueltSøk.søkeinput}
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
