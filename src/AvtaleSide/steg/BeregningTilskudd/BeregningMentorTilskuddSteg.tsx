import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import React, { FunctionComponent, useContext, useState } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import { Heading, BodyShort } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';

const cls = BEMHelper('beregningMentorTilskuddSteg');

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [mentorAntallTimerInput, setMentorAntallTimerInput] = useState<string>(
        avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer?.toString().replace(/\./g, ',') ?? '',
    );

    const [forHøyTimelønn, settForHøyTimelønn] = useState<string | undefined>(undefined);

    const inputToNumber = (verdi: string | undefined): number | undefined => {
        verdi = verdi?.replace(/,/g, '.');
        if (!isNaN(Number(verdi))) {
            return Number(verdi);
        }
    };

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Beregning av mentor tilskudd</SkjemaTittel>
                <BodyShort>
                    Tilskuddet dekker mentorens ordinære timelønn og ev. sosiale avgifter for de timene som er avtalt
                    for mentoroppgaven.
                </BodyShort>
                <VerticalSpacer rem={2} />
                <PakrevdInputValidering
                    validering={/^\d{0,3}(,5?)?$/}
                    label="Antall timer med mentor per måned"
                    description="Arbeidsgiver er pliktig til å kontakte Nav for å få oppdatert avtalen dersom behov for antall timer avviker fra det som er avtalt."
                    verdi={mentorAntallTimerInput}
                    settVerdi={(verdi) => {
                        setMentorAntallTimerInput(verdi);
                        avtaleContext.settAvtaleInnholdVerdi('mentorAntallTimer', inputToNumber(verdi));
                    }}
                />
                <VerticalSpacer rem={2} />
                <Heading size="small">Om mentors lønnsforhold hos arbeidsgiver</Heading>
                <Timeloenn cls={cls} />
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};
export default BeregningMentorTilskuddSteg;
