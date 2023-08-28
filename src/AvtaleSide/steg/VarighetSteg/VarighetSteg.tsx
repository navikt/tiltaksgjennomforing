import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { genererFnrdatostringFraFnr, VellykketGenerertIsoDatoString } from '@/utils/fnrUtils';
import moment from 'moment';
import 'moment/locale/nb';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import Datovelger from '@/komponenter/datovelger/Datovelger';
import BEMHelper from '@/utils/bem';
import VarighetIngress from '@/AvtaleSide/steg/VarighetSteg/VarighetIngress';
import VarighetInfoVeileder from '@/AvtaleSide/steg/VarighetSteg/VarighetInfoVeileder';
import InfoArenaOppryddingAlert from '@/AvtaleSide/steg/VarighetSteg/InfoArenaOppryddingAlert';
import VarighetTilbakeTidAlert from '@/AvtaleSide/steg/VarighetSteg/VarighetTilbakeTidAlert';
import VarighetInputfelt from '@/AvtaleSide/steg/VarighetSteg/VarighetInputfelt';
import './varighetSteg.less';
import DatovelgerRange from '@/komponenter/datovelgerRange/DatovelgerRange';

const VarighetSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { deltakerFnr, tiltakstype, erRyddeAvtale } = avtale;
    const { startDato, sluttDato } = avtale.gjeldendeInnhold;
    const cls = BEMHelper('varighetsteg');

    const erArbeidsgiverOgUfordelt = !innloggetBruker.erNavAnsatt && avtale.erUfordelt;
    const [sommerjobbDeltakerOver30VedStartdato, setSommerjobbDeltakerOver30VedStartdato] = useState(false);

    useEffect(() => {
        if (tiltakstype === 'SOMMERJOBB' && startDato) {
            const isoDato: VellykketGenerertIsoDatoString = genererFnrdatostringFraFnr(deltakerFnr);
            if (isoDato.vellykketgenerering) {
                if (moment(startDato).diff(moment(isoDato.isoDatostring).add(30, 'years').format('YYYY-MM-DD')) >= 0) {
                    return setSommerjobbDeltakerOver30VedStartdato(true);
                }
                return setSommerjobbDeltakerOver30VedStartdato(false);
            }
        }
    }, [startDato, deltakerFnr, tiltakstype, sommerjobbDeltakerOver30VedStartdato, avtale]);

    return (
        <div className={cls.className}>
            <Innholdsboks utfyller="veileder_og_arbeidsgiver">
                <Container fluid={true}>
                    <Row className={cls.element('rad')}>
                        <Column md="12">
                            <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                            <VarighetIngress tiltakstype={avtale.tiltakstype} className={cls.className} />
                        </Column>
                    </Row>

                    <VarighetInfoVeileder erNavAnsatt={innloggetBruker.erNavAnsatt} className={cls.className} />
                    <Row className={cls.element('rad')}>
                        <Column md="12">
                            <InfoArenaOppryddingAlert
                                tiltakstype={tiltakstype}
                                startDato={startDato}
                                erRyddeAvtale={erRyddeAvtale}
                                erNavAnsatt={innloggetBruker.erNavAnsatt}
                                className={cls.className}
                            />
                        </Column>
                        <Column md="6">
                            <Datovelger datoFelt="startDato" label="Startdato" />
                        </Column>
                        <Column md="6">
                            <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                        </Column>
                        <Column md="12">
                            <DatovelgerRange/>
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
                        label={'Lagre'}
                        lagre={lagreAvtale}
                        suksessmelding={'Avtale lagret'}
                        className={cls.element('lagre-knapp')}
                    />
                </Container>
            </Innholdsboks>
        </div>
    );
};

export default VarighetSteg;
