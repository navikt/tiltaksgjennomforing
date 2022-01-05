import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, {useContext, useEffect, useState} from 'react';
import {Knapp} from "nav-frontend-knapper";
import Relasjoner from "@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/Relasjoner";
import {Normaltekst} from "nav-frontend-typografi";

const KontaktpersonRefusjoninfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleVerdi } = useContext(AvtaleContext);
    const [ekstraKontaktperson, setEkstraKontaktperson] = useState(false);
    const [ønskerVarslingOmRefusjon, setØnskerVarslingOmRefusjon] = useState(true);
    const [alertStripe, setAlertStripe] = useState(false);
    const [disabledCheckbox, setDisabledCheckbox] = useState(true);


    useEffect(() => {

        if(avtale.refusjonKontaktpersonFornavn && avtale.refusjonKontaktpersonEtternavn &&
            avtale.refusjonKontaktpersonTlf){
            setDisabledCheckbox(false);
        }
        else{
            setDisabledCheckbox(true);
        }

    },[avtale.refusjonKontaktpersonFornavn, avtale.refusjonKontaktpersonEtternavn, avtale.refusjonKontaktpersonTlf ])


    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('rad')}>
                    <SkjemaTittel>Kontaktperson for refusjon</SkjemaTittel>
                </div>
                <SkjemaGruppe title="Kontaktperson for refusjon">
                    <Normaltekst>Foreksempel en regnskapsfører som skal motta varslinger om refusjon</Normaltekst>
                    <div>
                        <Checkbox
                            label="Kontaktpersonen for avtalen ønsker også å motta varslinger om refusjon"
                            checked={ønskerVarslingOmRefusjon}
                            onChange={() => setØnskerVarslingOmRefusjon(!ønskerVarslingOmRefusjon)}
                            disabled={disabledCheckbox}
                        />
                    </div>

                    {!ekstraKontaktperson &&
                    <div>
                        <Knapp onClick={() => setEkstraKontaktperson(!ekstraKontaktperson)}>+ Legg til kontaktperson</Knapp>
                    </div>
                    }

                    {ekstraKontaktperson &&
                        <>

                    <div className={cls.element('rad')}>
                        <PakrevdInput
                            label="Kontaktperson for refusjon sitt fornavn"
                            verdi={avtale.refusjonKontaktpersonFornavn}
                            settVerdi={(verdi) => settAvtaleVerdi( 'refusjonKontaktpersonFornavn', verdi)}
                        />
                        <PakrevdInput
                            label="Kontaktperson for refusjon sitt etternavn"
                            verdi={avtale.refusjonKontaktpersonEtternavn}
                            settVerdi={(verdi) => settAvtaleVerdi('refusjonKontaktpersonEtternavn', verdi)}
                        />
                    </div>
                        <div className={cls.element('rad')}>
                        <TelefonnummerInput
                        label="Kontaktperson for refusjon sitt telefonnummer"
                        verdi={avtale.refusjonKontaktpersonTlf}
                        settVerdi={(verdi ) => settAvtaleVerdi('refusjonKontaktpersonTlf', verdi)}
                        />
                        </div>
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
