import { AvtaleContext } from '@/AvtaleProvider';
import VarighetInfoVeileder from '@/AvtaleSide/steg/VarighetSteg/VarighetInfoVeileder';
import VarighetIngress from '@/AvtaleSide/steg/VarighetSteg/VarighetIngress';
import VarighetInputfelt from '@/AvtaleSide/steg/VarighetSteg/VarighetInputfelt';
import VarighetTilbakeTidAlert from '@/AvtaleSide/steg/VarighetSteg/VarighetTilbakeTidAlert';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import Datovelger from '@/komponenter/datovelger/Datovelger';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import BEMHelper from '@/utils/bem';
import { VellykketGenerertIsoDatoString, genererFnrdatostringFraFnr } from '@/utils/fnrUtils';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './varighetSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import { addYears, differenceInDays } from 'date-fns';

const VarighetSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { deltakerFnr, tiltakstype } = avtale;
    const { startDato, sluttDato } = avtale.gjeldendeInnhold;
    const cls = BEMHelper('varighetsteg');

    const erArbeidsgiverOgUfordelt = !innloggetBruker.erNavAnsatt && avtale.erUfordelt;
    const [sommerjobbDeltakerOver30VedStartdato, setSommerjobbDeltakerOver30VedStartdato] = useState(false);

    useEffect(() => {
        if (tiltakstype === 'SOMMERJOBB' && startDato) {
            const isoDato: VellykketGenerertIsoDatoString = genererFnrdatostringFraFnr(deltakerFnr);
            if (isoDato.vellykketgenerering) {
                if (differenceInDays(startDato, addYears(isoDato.isoDatostring, 30)) >= 0) {
                    return setSommerjobbDeltakerOver30VedStartdato(true);
                }
                return setSommerjobbDeltakerOver30VedStartdato(false);
            }
        }
    }, [startDato, deltakerFnr, tiltakstype, sommerjobbDeltakerOver30VedStartdato, avtale]);

    return (
        <div className={cls.className}>
            <AvtaleStatus />
            <Innholdsboks>
                <Container fluid={true}>
                    <Row className={cls.element('rad')}>
                        <Column md="12">
                            <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                            <VarighetIngress tiltakstype={avtale.tiltakstype} className={cls.className} />
                        </Column>
                    </Row>

                    <VarighetInfoVeileder erNavAnsatt={innloggetBruker.erNavAnsatt} className={cls.className} />
                    <Row className={cls.element('rad')}>
                        <Column md="6">
                            <Datovelger datoFelt="startDato" label="Startdato" />
                        </Column>
                        <Column md="6">
                            <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                        </Column>
                    </Row>
                    <VarighetTilbakeTidAlert
                        startDato={startDato}
                        sluttDato={sluttDato}
                        erArbeidsgiverOgUfordelt={erArbeidsgiverOgUfordelt}
                        className={cls.className}
                        sommerjobbDeltakerOver30VedStartdato={sommerjobbDeltakerOver30VedStartdato}
                    />
                    <VarighetInputfelt className={cls.className} />
                    <LagreKnapp
                        lagre={lagreAvtale}
                        suksessmelding={'Avtale lagret'}
                        className={cls.element('lagre-knapp')}
                    >
                        Lagre
                    </LagreKnapp>
                </Container>
            </Innholdsboks>
        </div>
    );
};

export default VarighetSteg;
