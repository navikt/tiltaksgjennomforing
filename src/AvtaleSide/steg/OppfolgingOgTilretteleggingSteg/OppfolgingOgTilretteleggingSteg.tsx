import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import React, { useContext } from 'react';
import './oppfolgingOgTilretteleggingSteg.less';
import BEMHelper from '@/utils/bem';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';

const OppfolgingOgTilretteleggingSteg = () => {
    const avtaleContext = useContext(AvtaleContext);
    const cls = BEMHelper('oppfolgingOgTilretteleggingSteg');

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>
                    <span style={{ marginLeft: '0.25rem' }}>Oppfølging</span>
                </SkjemaTittel>
                <PakrevdTextarea
                    className={cls.element('tekst-felt')}
                    placeholder="Skriv inn innholdstekst i tekstfeltet her"
                    label="Beskriv hvilken oppfølging dere har avtalt. Eksempel på oppfølging kan være en eller flere avtalte oppfølgingssamtaler."
                    verdi={avtaleContext.avtale.gjeldendeInnhold.oppfolging || ''}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('oppfolging', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av oppfølgingen er påkrevd"
                />
                <SkjemaTittel>
                    <span style={{ marginLeft: '0.25rem' }}>Tilrettelegging</span>
                </SkjemaTittel>
                <PakrevdTextarea
                    className={cls.element('tekst-felt')}
                    placeholder="Skriv inn innholdstekst i tekstfeltet her"
                    label="Beskriv hvilken tilrettelegging dere har avtalt. For eksempel tilpasning i arbeidstid, hjelpemidler, unngå enkelte typer arbeidsoppgaver."
                    verdi={avtaleContext.avtale.gjeldendeInnhold.tilrettelegging}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('tilrettelegging', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av tilrettelegging er påkrevd"
                />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OppfolgingOgTilretteleggingSteg;
