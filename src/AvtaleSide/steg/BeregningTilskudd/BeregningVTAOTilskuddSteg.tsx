import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import KidOgKontonummer from '@/komponenter/form/kid-og-kontonummer';
import './BeregningTilskuddSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VisningTilskuddsperioderTabellVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabellVtao';

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningVTAOTilskuddSteg: FunctionComponent = () => {
    const { lagreAvtale } = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
                <Heading level="3" size="small" className={cls.element('lonn-tittel')}>
                    Hvor mye dekker tilskuddet?
                </Heading>
                <BodyShort size="small">
                    Arbeidsgiveren får et tilskudd fra NAV for varig tilrettelagt arbeid. Satsen settes årlig av
                    departementet og avtale- og refusjonsløsningen vil automatisk oppdateres når det kommer nye satser.
                </BodyShort>
                <VerticalSpacer rem={2} />
                <VisningTilskuddsperioderTabellVtao />
                <VerticalSpacer rem={2} />
                <Row className={cls.element('rad-kontonummer')}>
                    <Column md="12" className={cls.element('kontonummer')}>
                        <KidOgKontonummer />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding="Avtale lagret">
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default BeregningVTAOTilskuddSteg;
