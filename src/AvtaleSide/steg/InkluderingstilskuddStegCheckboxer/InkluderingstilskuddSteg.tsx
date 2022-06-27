import { AvtaleContext } from '@/AvtaleProvider';
import InkluderingsTilleggutgifterCheckboxer from '@/AvtaleSide/steg/InkluderingstilskuddStegCheckboxer/InkluderingsTilleggsutgifterCheckboxer';
import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { Datepicker } from 'nav-datovelger';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useContext, useState } from 'react';
import './InkluderingstilskuddSteg.less';

const cls = BEMHelper('inkluderingstilskuddSteg');

const InkluderingstilskuddSteg = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [feilmeldingGrunnDeltaker, setFeilmeldingGrunnDeltaker] = useState<string>();

    return (
        <Innholdsboks utfyller="veileder">
            <SkjemaTittel className={cls.element('tittel')}>Inkluderingstilskudd</SkjemaTittel>
            <Normaltekst className={cls.element('tekst')}>
                Inkluderingstilskudd kan ikke gis hvis utgiftene allerede dekkes gjennom deltakelse i et annet
                arbeidsmarkedstiltak. Du må sende søknad til NAV før det planlagte innkjøpet blir gjennomført. NAV
                utbetaler tilskuddet etterskuddsvis.
            </Normaltekst>
            <PakrevdTextarea
                className={cls.element('textarea')}
                label="Hvorfor er det behov for inkluderingstilskudd?"
                verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av hvorfor det er behov for inkluderingstilskudd er påkrevd"
            />
            <InkluderingsTilleggutgifterCheckboxer feilmeldingGrunn={feilmeldingGrunnDeltaker} />
            <Normaltekst className={cls.element('tekst')}>
                Det er et årlig maksimalbeløp som det kan søkes om som fastsettes av Arbeids- og sosialdepartementet.
            </Normaltekst>
            <div className={cls.element('datepicker')}>
                <label>Her oppgis dato for når tilskuddet er tenkt benyttet fra</label>
                <Datepicker
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                    value={avtaleContext.avtale.gjeldendeInnhold.startDato || undefined}
                    limitations={AvtaleMinMaxDato(true)}
                    onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ startDato: dato })}
                />
            </div>
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} />
        </Innholdsboks>
    );
};
export default InkluderingstilskuddSteg;
