import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Alert } from '@navikt/ds-react';
import { Fieldset, Checkbox, Button } from '@navikt/ds-react';
import { useContext, useState } from 'react';
import useKontaktPersonErAlleredeDefinert from '@/AvtaleSide/steg/KontaktInformasjonSteg/KontaktpersonRefusjoninfoDel/useKontaktPersonErAlleredeDefinert';
import { HelpText } from '@navikt/ds-react';
import './KontaktpersonRefusjoninfoDel.less';

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
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad', 'header')}>
                    <SkjemaTittel>Kontaktperson hos arbeidsgiver for refusjon</SkjemaTittel>
                    <HelpText className={cls.element('helptekst')} title="Hva menes med kontaktperson for refusjon?">
                        For eksempel en regnskapsfører som skal motta varslinger om refusjon
                    </HelpText>
                </div>
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
                            <div className={cls.element('rad')}>
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
                                    verdi={
                                        avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn
                                    }
                                    settVerdi={(verdi) =>
                                        settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                            ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                            refusjonKontaktpersonEtternavn: verdi ?? '',
                                        })
                                    }
                                />
                            </div>
                            <div className={cls.element('rad')}>
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
                            </div>
                            <div>
                                <Checkbox
                                    checked={avtale.gjeldendeInnhold?.refusjonKontaktperson?.ønskerVarslingOmRefusjon}
                                    onChange={() => sjekkeOmVarslingOmRefusjonKanSkrusAv()}
                                >
                                    Arbeidsgiver for avtalen {getArbeidsgivernavn()} ønsker også å motta varslinger om
                                    refusjon
                                </Checkbox>
                            </div>
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
        </>
    );
};

export default KontaktpersonRefusjoninfoDel;
