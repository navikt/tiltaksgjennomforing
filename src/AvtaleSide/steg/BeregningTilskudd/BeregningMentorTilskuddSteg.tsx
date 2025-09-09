import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import { Heading } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import { useFeatureToggles } from '@/FeatureToggleProvider';

const cls = BEMHelper('beregningMentorTilskuddSteg');

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const { mentorFeatureToggle } = useFeatureToggles();

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

    //console.log(avtaleContext);
    console.log('mentorFeatureToggle:', mentorFeatureToggle);

    if (mentorFeatureToggle) {
        return <>mentor</>;
    }

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Beregning av mentor tilskudd</SkjemaTittel>
                <Heading level="3" size="small" className={cls.element('lonn-tittel')}>
                    Antall timer med mentor per måned og mentor timelønn
                </Heading>
                <VerticalSpacer rem={2} />
                <div className={cls.element('rad')}>
                    <PakrevdInputValidering
                        validering={/^\d{0,3}(,5?)?$/}
                        label="Antall timer med mentor per måned"
                        verdi={mentorAntallTimerInput}
                        settVerdi={(verdi) => {
                            setMentorAntallTimerInput(verdi);
                            avtaleContext.settAvtaleInnholdVerdi('mentorAntallTimer', inputToNumber(verdi));
                        }}
                    />
                    <VerticalSpacer rem={2} />
                    <ValutaInput
                        min={0}
                        className="input"
                        name="Timelønn"
                        size="medium"
                        label="Timelønn*"
                        autoComplete={'off'}
                        value={avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settForHøyTimelønn(undefined);
                        }}
                        onBlur={(event) => {
                            if (/^\d{0,4}(\.\d{0,2})?$/.test(event.target.value)) {
                                avtaleContext.settAvtaleInnholdVerdi(
                                    'mentorTimelonn',
                                    Math.round(parseFloat(event.target.value)),
                                );
                            } else {
                                avtaleContext.settAvtaleInnholdVerdi('mentorTimelonn', undefined);
                                settForHøyTimelønn('Overskrider maks timelønn');
                            }
                        }}
                        error={forHøyTimelønn}
                    />
                </div>
                <VerticalSpacer rem={2} />
                <Feriepenger cls={cls} />
                <VerticalSpacer rem={2} />
                <ObligatoriskTjenestepensjon cls={cls} />
                <VerticalSpacer rem={2} />
                <Arbeidsgiveravgift cls={cls} />
                {/*<VerticalSpacer rem={2} />*/}
                {/*<UtregningPanel*/}
                {/*    {...avtaleContext.avtale.gjeldendeInnhold}*/}
                {/*    tiltakstype={avtaleContext.avtale.tiltakstype}*/}
                {/*/>*/}
                <VerticalSpacer rem={2} />
                <VisningTilskuddsperioder />
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};
export default BeregningMentorTilskuddSteg;
