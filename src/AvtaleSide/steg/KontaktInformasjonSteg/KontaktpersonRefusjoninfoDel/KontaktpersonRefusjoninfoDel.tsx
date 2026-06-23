import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Alert, HGrid, HStack } from '@navikt/ds-react';
import { Fieldset, Checkbox, Button } from '@navikt/ds-react';
import { useContext, useState } from 'react';
import useKontaktPersonErAlleredeDefinert from '@/AvtaleSide/steg/KontaktInformasjonSteg/KontaktpersonRefusjoninfoDel/useKontaktPersonErAlleredeDefinert';
import { HelpText } from '@navikt/ds-react';
import './KontaktpersonRefusjoninfoDel.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const KontaktpersonRefusjoninfoDel = () => {
    const cls = BEMHelper('kontaktpersonRefusjoninfo');
    const { avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const kontaktperson = avtale.gjeldendeInnhold.refusjonKontaktperson;

    const [visEkstraKontaktpersonFelt, setVisEkstraKontaktpersonFelt] = useState(kontaktperson !== null);
    const [feilmelding, setFeilmelding] = useState<string>();
    const kontaktpersonAlleredeDefinert: boolean = useKontaktPersonErAlleredeDefinert({ avtale });

    const sjekkeOmVarslingOmRefusjonKanSkrusAv = () => {
        if (!avtale.gjeldendeInnhold.refusjonKontaktperson?.ønskerVarslingOmRefusjon) {
            settAvtaleInnholdVerdi('refusjonKontaktperson', {
                ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                ønskerVarslingOmRefusjon: true,
            });
        } else if (
            kontaktperson?.refusjonKontaktpersonFornavn &&
            kontaktperson.refusjonKontaktpersonEtternavn &&
            kontaktperson.refusjonKontaktpersonTlf
        ) {
            setFeilmelding(undefined);
            settAvtaleInnholdVerdi('refusjonKontaktperson', {
                ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                ønskerVarslingOmRefusjon: false,
            });
        } else {
            setFeilmelding('Valg om ønsket varsling kan kun endres etter kontaktinformasjonen er fylt ut');
        }
    };

    function resetRefusjonKontaktPerson() {
        setVisEkstraKontaktpersonFelt(false);
        setFeilmelding(undefined);
        settAvtaleInnholdVerdier({
            ...avtale.gjeldendeInnhold,
            refusjonKontaktperson: {},
        });
    }

    function getArbeidsgivernavn() {
        return avtale.gjeldendeInnhold.arbeidsgiverFornavn || avtale.gjeldendeInnhold.arbeidsgiverEtternavn
            ? `(${avtale.gjeldendeInnhold.arbeidsgiverFornavn} ${avtale.gjeldendeInnhold.arbeidsgiverEtternavn})`
            : '';
    }

    return (
        <div className={cls.element('container')}>
            <HStack align="end">
                <SkjemaTittel>Kontaktperson hos arbeidsgiver for refusjon</SkjemaTittel>
                <HelpText className={cls.element('helptekst')} title="Hva menes med kontaktperson for refusjon?">
                    For eksempel en regnskapsfører som skal motta varslinger om refusjon
                </HelpText>
            </HStack>
            <Fieldset legend="" title="">
                {!visEkstraKontaktpersonFelt && !kontaktpersonAlleredeDefinert && (
                    <div className={cls.element('buttonSpaceing')}>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setVisEkstraKontaktpersonFelt(!visEkstraKontaktpersonFelt);
                                settAvtaleInnholdVerdier({
                                    ...avtale.gjeldendeInnhold,
                                    refusjonKontaktperson: {
                                        refusjonKontaktpersonFornavn: '',
                                        refusjonKontaktpersonEtternavn: '',
                                        refusjonKontaktpersonTlf: '',
                                        ønskerVarslingOmRefusjon: true,
                                    },
                                });
                            }}
                        >
                            + Legg til kontaktperson
                        </Button>
                    </div>
                )}
                {(kontaktpersonAlleredeDefinert || visEkstraKontaktpersonFelt) && (
                    <>
                        <HGrid gap="space-16" columns={2}>
                            <PakrevdInput
                                label="Kontaktperson for refusjon sitt fornavn"
                                verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn}
                                settVerdi={(verdi) =>
                                    settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                        ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                        refusjonKontaktpersonFornavn: verdi ?? '',
                                    })
                                }
                            />
                            <PakrevdInput
                                label="Kontaktperson for refusjon sitt etternavn"
                                verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn}
                                settVerdi={(verdi) =>
                                    settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                        ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                        refusjonKontaktpersonEtternavn: verdi ?? '',
                                    })
                                }
                            />
                        </HGrid>
                        <VerticalSpacer rem={1} />
                        <TelefonnummerInput
                            label="Kontaktperson for refusjon sitt mobilnummer"
                            verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf}
                            settVerdi={(verdi) =>
                                settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                    ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                    refusjonKontaktpersonTlf: verdi ?? '',
                                })
                            }
                        />
                        <Checkbox
                            checked={avtale.gjeldendeInnhold?.refusjonKontaktperson?.ønskerVarslingOmRefusjon}
                            onChange={() => sjekkeOmVarslingOmRefusjonKanSkrusAv()}
                        >
                            Arbeidsgiver for avtalen {getArbeidsgivernavn()} ønsker også å motta varslinger om refusjon
                        </Checkbox>
                        {feilmelding && (
                            <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                                {feilmelding}
                            </Alert>
                        )}
                        <Button variant="secondary" onClick={() => resetRefusjonKontaktPerson()}>
                            Fjern kontaktperson
                        </Button>
                    </>
                )}
            </Fieldset>
        </div>
    );
};

export default KontaktpersonRefusjoninfoDel;
