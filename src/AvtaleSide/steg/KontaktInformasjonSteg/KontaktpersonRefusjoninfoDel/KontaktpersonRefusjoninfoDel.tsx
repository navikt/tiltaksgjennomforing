import {AvtaleContext} from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import {Checkbox, SkjemaGruppe} from 'nav-frontend-skjema';
import React, {useContext, useState} from 'react';
import {Knapp} from "nav-frontend-knapper";
import Relasjoner from "@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/Relasjoner";
import {Normaltekst} from "nav-frontend-typografi";
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';

import "./KontaktpersonRefusjoninfoDel.less"

const KontaktpersonRefusjoninfoDel = () => {
    const cls = BEMHelper('kontaktpersonRefusjoninfo');
    const {avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi} = useContext(AvtaleContext);

    const [visEkstraKontaktpersonFelt, setVisEkstraKontaktpersonFelt] = useState(false);
    const [feilmelding, setFeilmelding] = useState<string>();

    const sjekkeOmVarslingOmRefusjonKanSkrusAv = () => {
        if (!avtale.gjeldendeInnhold.ønskerInformasjonOmRefusjon) {
            settAvtaleInnholdVerdi('ønskerInformasjonOmRefusjon', true);
        } else if (avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn && avtale.gjeldendeInnhold.refusjonKontaktperson.refusjonKontaktpersonEtternavn &&
            avtale.gjeldendeInnhold.refusjonKontaktperson.refusjonKontaktpersonTlf) {
            settAvtaleInnholdVerdi('ønskerInformasjonOmRefusjon', false);
            setFeilmelding(undefined);
        } else {
            setFeilmelding("Hvis ikke kontaktperson for avtalen ønsker å motta sms varslinger om refusjon må kontaktperson for refusjon fylles ut");
        }
    }

    function resetRefusjonKontaktPerson() {
        setVisEkstraKontaktpersonFelt(false);
        settAvtaleInnholdVerdier({
            ...avtale.gjeldendeInnhold,
            ønskerInformasjonOmRefusjon: true,
            refusjonKontaktperson: undefined
        });


    }

    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad')}>
                    <SkjemaTittel>Kontaktperson for refusjon</SkjemaTittel>
                </div>
                <SkjemaGruppe title="Kontaktperson for refusjon">
                    <div style={{marginBottom:"1rem"}}>
                        <Normaltekst>Foreksempel en regnskapsfører som skal motta varslinger om refusjon</Normaltekst>
                    </div>
                    {((!visEkstraKontaktpersonFelt && !avtale.gjeldendeInnhold.refusjonKontaktperson)) &&
                        <div className={cls.element('buttonSpaceing')}>
                            <Knapp onClick={() => setVisEkstraKontaktpersonFelt(!visEkstraKontaktpersonFelt)}>+ Legg til
                                kontaktperson</Knapp>
                        </div>

                    }
                    {(avtale.gjeldendeInnhold.refusjonKontaktperson || (visEkstraKontaktpersonFelt && !avtale.gjeldendeInnhold.refusjonKontaktperson)) &&
                        <>
                            <div className={cls.element('rad')}>
                                <PakrevdInput
                                    label="Kontaktperson for refusjon sitt fornavn"
                                    verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn}
                                    settVerdi={(verdi) => settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                        ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                        refusjonKontaktpersonFornavn: verdi
                                    })}
                                />
                                <PakrevdInput
                                    label="Kontaktperson for refusjon sitt etternavn"
                                    verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn}
                                    settVerdi={(verdi) => settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                        ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                        refusjonKontaktpersonEtternavn: verdi
                                    })}
                                />
                        </div>
                        <div className={cls.element('rad')}>
                            <TelefonnummerInput
                                label="Kontaktperson for refusjon sitt telefonnummer"
                                verdi={avtale.gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf}
                                settVerdi={(verdi) => settAvtaleInnholdVerdi('refusjonKontaktperson', {
                                    ...avtale.gjeldendeInnhold.refusjonKontaktperson,
                                    refusjonKontaktpersonTlf: verdi
                                })}
                            />
                        </div>
                            <div>
                                <Checkbox
                                    label="Kontaktpersonen for avtalen ønsker også å motta varslinger om refusjon"
                                    checked={avtale.gjeldendeInnhold.ønskerInformasjonOmRefusjon}
                                    onChange={() => sjekkeOmVarslingOmRefusjonKanSkrusAv()}
                                />
                            </div>
                            {feilmelding && <AlertStripeAdvarsel style={{marginBottom:"1rem"}}>{feilmelding}</AlertStripeAdvarsel>}
                            <Knapp onClick={() => resetRefusjonKontaktPerson()}>Fjern kontaktperson</Knapp>
                        </>
                    }
                    <div className={cls.element('rad')}>
                        {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'SOMMERJOBB'].includes(
                            avtale.tiltakstype
                        ) && <Relasjoner />}
                    </div>
                </SkjemaGruppe>
            </div>
        </>
    );
};

export default KontaktpersonRefusjoninfoDel;
