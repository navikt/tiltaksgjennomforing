
import {Input, SkjemaGruppe} from 'nav-frontend-skjema';
import React, {FunctionComponent, useEffect, useState} from 'react';
import CheckboxMedInput from "@/AvtaleSide/steg/InkluderingstilskuddSteg/CheckboxMedInput";
import {Element} from "nav-frontend-typografi";
import BEMHelper from "@/utils/bem";
import './InkluderingsTilleggsutgifterCheckboxer.less';

const cls = BEMHelper('inkluderingsTilleggsutgifterCheckboxer');

interface Props {
    feilmeldingGrunn: string | undefined;
}

const InkluderingsTilleggutgifterCheckboxer: FunctionComponent<Props> = (props) => {


    const [totaltKostnadsoverslag, setTotaltKostnadsoverslag] = useState<number>(0)
    const [nyTotal, setNyTotal] = useState<number>(0)
    const [forhøytBeløp, setForhøytBeløp] = useState<boolean>(false)

    useEffect(() => {
        if(nyTotal + totaltKostnadsoverslag > 136700){
            setForhøytBeløp(true)
        }
        else{
            setNyTotal(totaltKostnadsoverslag + nyTotal);
        }

        console.log("nyTotal i effect", nyTotal)

    } ,[totaltKostnadsoverslag])

    console.log("nyTotal", nyTotal)


    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Element className={cls.element('overskrift')}>
                Huk av for hva tilskuddet skal dekke tilleggsutgifter knyttet til:
            </Element>
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den konkrete arbeidsplassen"} />
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"opprettelse av ekstra tiltaksplass, for eksempel kontormøbler"} />
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet"} />
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder teknologisk utstyr eller teknologiske hjelpemidler" } />
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5" } />
            <CheckboxMedInput inputLabel={"Kostnadsoverslag"} inputValue={setTotaltKostnadsoverslag}
                              checkboxLabel={"nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet, og ekstern opplæring for å kunne utføre arbeidet i virksomheten" } />
            <Input className={cls.element('totalBeløp')} label={"Totalt kostnadsoverslag"} value={nyTotal}
                   disabled={false} feil={forhøytBeløp}  />
        </SkjemaGruppe>
    );
};

export default InkluderingsTilleggutgifterCheckboxer;
