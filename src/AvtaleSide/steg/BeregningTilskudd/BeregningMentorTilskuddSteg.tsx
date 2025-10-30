import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import React, { FunctionComponent, useContext, useState } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import { Heading, BodyShort } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import KidOgKontonummer from '@/komponenter/form/kid-og-kontonummer';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';

const cls = BEMHelper('beregningMentorTilskuddSteg');

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    // const [forHøyTimelønn, settForHøyTimelønn] = useState<string | undefined>(undefined);

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
                    verdi={avtale.gjeldendeInnhold.mentorAntallTimer?.toString() ?? ''}
                    settVerdi={(verdi) => {
                        settOgKalkulerBeregningsverdier({ mentorAntallTimer: inputToNumber(verdi) });
                    }}
                />
                <VerticalSpacer rem={2} />
                <Heading size="small">Om mentors lønnsforhold hos arbeidsgiver</Heading>
                <Timeloenn cls={cls} />
                <VerticalSpacer rem={2} />
                <Row className={cls.element('rad')}>
                    <Column md="5"></Column>
                    <Column md="5"></Column>
                </Row>
                <ObligatoriskTjenestepensjon cls={cls} />
                <Arbeidsgiveravgift cls={cls} />
                <Feriepenger cls={cls} />
                <VerticalSpacer rem={2} />
                <Row className={cls.element('rad-kontonummer')}>
                    <Column md="12" className={cls.element('kontonummer')}>
                        <KidOgKontonummer />
                    </Column>
                </Row>
                <UtregningPanelMentorTilskudd {...avtale.gjeldendeInnhold} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};
export default BeregningMentorTilskuddSteg;
