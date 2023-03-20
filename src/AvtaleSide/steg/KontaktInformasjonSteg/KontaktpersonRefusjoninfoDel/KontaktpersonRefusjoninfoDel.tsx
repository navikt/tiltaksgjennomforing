import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort } from '@navikt/ds-react';
import { Fieldset, Checkbox, Button } from '@navikt/ds-react';
import { useContext, useState } from 'react';
import './KontaktpersonRefusjoninfoDel.less';

const KontaktpersonRefusjoninfoDel = () => {
    const cls = BEMHelper('kontaktpersonRefusjoninfo');
    const { avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi } = useContext(AvtaleContext);

    const [visEkstraKontaktpersonFelt, setVisEkstraKontaktpersonFelt] = useState(false);
    const [feilmelding, setFeilmelding] = useState<string>();

    const sjekkeOmVarslingOmRefusjonKanSkrusAv = () => {
        if (!avtale.gjeldendeInnhold.refusjonKontaktperson?.ønskerVarslingOmRefusjon) {
            settAvtaleInnholdVerdi('refusjonKontaktperson', {
                ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                ønskerVarslingOmRefusjon: true,
            });
        } else if (
            avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn &&
            avtale.gjeldendeInnhold.refusjonKontaktperson.refusjonKontaktpersonEtternavn &&
            avtale.gjeldendeInnhold.refusjonKontaktperson.refusjonKontaktpersonTlf
        ) {
            setFeilmelding(undefined);
            settAvtaleInnholdVerdi('refusjonKontaktperson', {
                ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                ønskerVarslingOmRefusjon: false,
            });
        } else {
            setFeilmelding(
                'Hvis ikke kontaktperson for avtalen ønsker å motta sms varslinger om refusjon må kontaktperson for refusjon fylles ut'
            );
        }
    };

    function resetRefusjonKontaktPerson() {
        setVisEkstraKontaktpersonFelt(false);
        settAvtaleInnholdVerdier({
            ...avtale.gjeldendeInnhold,
            refusjonKontaktperson: {},
        });
    }

    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad')}>
                    <SkjemaTittel>Kontaktperson hos arbeidsgiver for refusjon</SkjemaTittel>
                </div>
                <Fieldset legend="Kontaktperson for refusjon" title="Kontaktperson for refusjon">
                    <div style={{ marginBottom: '1rem' }}>
                        <BodyShort size="small">
                            For eksempel en regnskapsfører som skal motta varslinger om refusjon
                        </BodyShort>
                    </div>
                    {!visEkstraKontaktpersonFelt &&
                        (avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn?.length ===
                            undefined ||
                            avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn?.length ===
                                undefined ||
                            avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf?.length ===
                                undefined) && (
                            <div className={cls.element('buttonSpaceing')}>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setVisEkstraKontaktpersonFelt(!visEkstraKontaktpersonFelt);
                                        settAvtaleInnholdVerdier({
                                            ...avtale.gjeldendeInnhold,
                                            refusjonKontaktperson: { ønskerVarslingOmRefusjon: true },
                                        });
                                    }}
                                >
                                    + Legg til kontaktperson
                                </Button>
                            </div>
                        )}

                    {(avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn?.length !==
                        undefined ||
                        avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn?.length !==
                            undefined ||
                        avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf?.length !== undefined ||
                        visEkstraKontaktpersonFelt) && (
                        <>
                            <div className={cls.element('rad')}>
                                <PakrevdInput
                                    label="Kontaktperson for refusjon sitt fornavn"
                                    verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn}
                                    settVerdi={(verdi) =>
                                        settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                            ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                            refusjonKontaktpersonFornavn: verdi,
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
                                            refusjonKontaktpersonEtternavn: verdi,
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
                                            refusjonKontaktpersonTlf: verdi,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={avtale.gjeldendeInnhold?.refusjonKontaktperson?.ønskerVarslingOmRefusjon}
                                    onChange={() => sjekkeOmVarslingOmRefusjonKanSkrusAv()}
                                >
                                    Kontaktpersonen for avtalen ønsker også å motta varslinger om refusjon
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
