import React, {useContext, useState} from "react";
import { AvtaleContext } from '@/AvtaleProvider';
import {Element, Normaltekst} from "nav-frontend-typografi";
import {Container} from "nav-frontend-grid";
import PakrevdTextarea from "@/komponenter/PakrevdTextarea/PakrevdTextarea";
import Innholdsboks from "@/komponenter/Innholdsboks/Innholdsboks";
import GodkjennPåVegneAvDeltakerCheckboxer
    from "@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingsTilleggsutgifterCheckboxer";
import PakrevdInput from "@/komponenter/PakrevdInput/PakrevdInput";
import {Datepicker} from "nav-datovelger";
import {AvtaleMinMaxDato} from "@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato";
import LagreKnapp from "@/komponenter/LagreKnapp/LagreKnapp";

const InkluderingstilskuddSteg = () => {

    const avtaleContext = useContext(AvtaleContext);
    const [feilmeldingGrunnDeltaker, setFeilmeldingGrunnDeltaker] = useState<string>();

    return (
        <Innholdsboks utfyller="veileder">
            <Element>
                InkluderingsTilskudd
            </Element>
            <Normaltekst>
                Inkluderingstilskudd kan ikke gis hvis utgiftene allerede dekkes gjennom deltakelse i et annet
                arbeidsmarkedstiltak.
                Du må sende søknad til NAV før det planlagte innkjøpet blir gjennomført. NAV utbetaler tilskuddet
                etterskuddsvis.
            </Normaltekst>
            <Container fluid={true}>
            <PakrevdTextarea
                label="Arbeidsoppgaver til mentor"
                verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
            />
            </Container>
            <Element>
                Huk av for hva tilskuddet skal dekke tilleggsutgifter knyttet til:
            </Element>
            <GodkjennPåVegneAvDeltakerCheckboxer feilmeldingGrunn={feilmeldingGrunnDeltaker}/>
            <PakrevdInput
                bredde="S"
                label="Kostnadsoverslag"
                type="number"
                max={7}
                verdi={avtaleContext.avtale.gjeldendeInnhold.antallDagerPerUke}
                settVerdi={(eventVerdi) => {
                    const verdi = parseInt(eventVerdi, 10);
                    if (verdi > 0 && verdi < 8) {
                        avtaleContext.settAvtaleInnholdVerdi('antallDagerPerUke', verdi);
                    } else {
                        avtaleContext.settAvtaleInnholdVerdi('antallDagerPerUke', undefined);
                    }
                }}
            />
            <label className="skjemaelement__label">Her oppgis dato for når tilskuddet er tenkt benyttet fra</label>
            <Normaltekst>
                Det er et årlig maksimalbeløp som det kan søkes om som fastsettes av Arbeids- og sosialdepartementet.
            </Normaltekst>
            <Datepicker
                inputProps={{ placeholder: 'dd.mm.åååå' }}
                value={avtaleContext.avtale.gjeldendeInnhold.startDato || undefined}
                limitations={AvtaleMinMaxDato()}
                onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ startDato: dato })}
            />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'}/>
</Innholdsboks>
    )

}
export default InkluderingstilskuddSteg;