import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import React, { useContext, useState } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import './omMentorSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);

    const cls = BEMHelper('omMentorSteg');

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Om mentoren</SkjemaTittel>
                <div className={cls.element('rad')}>
                    <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.mentorFnr} />
                </div>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorFornavn', verdi)}
                    />
                    <HorizontalSpacer rem={1} />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorEtternavn', verdi)}
                    />
                </div>
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTlf}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorTlf', verdi)}
                    />
                </div>
                <div className={cls.element('textArea')}>
                    <PakrevdTextarea
                        label="Arbeidsoppgaver til mentor"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                        maxLengde={1000}
                        feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                    />
                </div>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OmMentorSteg;
