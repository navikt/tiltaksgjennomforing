import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import EtterregistreringInstruks from '@/AvtaleSide/steg/VarighetSteg/EtterregistreringInstruks';
import InfoArenaOppryddingAlert from '@/AvtaleSide/steg/VarighetSteg/InfoArenaOppryddingAlert';
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
import { addYears, differenceInDays } from 'date-fns';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './varighetSteg.less';
import { Alert } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const VarighetSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { deltakerFnr, tiltakstype, erRyddeAvtale, opphav } = avtale;
    const { startDato } = avtale.gjeldendeInnhold;
    const cls = BEMHelper('varighetsteg');

    // Under migrering til nytt system vil avtalen gjenåpnes, og da kan
    // alle felter endres, men vi ønsker å forhindre at startdato kan endres
    // på disse avtalene, på samme måte som vi ikke tillater endring av startdato
    // når avtaler er signert og godkjent.
    const skalIkkeKunneEndreStartdato = avtale.erOpprettetEllerEndretAvArena;

    const skalViseEtterregistreringsinstruks =
        opphav !== 'ARENA' && innloggetBruker.erNavAnsatt && !skalIkkeKunneEndreStartdato;

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
                    {skalViseEtterregistreringsinstruks && <EtterregistreringInstruks className={cls.className} />}
                    {skalIkkeKunneEndreStartdato && (
                        <>
                            <Row>
                                <Column md="12">
                                    <Alert variant="info" size="small">
                                        Avtalen er {avtale.opphav === 'ARENA' ? 'importert fra ' : 'synkronisert med '}
                                        gammel løsning, og oppstartsdato kan derfor ikke endres.
                                    </Alert>
                                </Column>
                            </Row>
                            <VerticalSpacer rem={2} />
                        </>
                    )}
                    <Row className={cls.element('rad')}>
                        <Column md="12">
                            {startDato !== undefined && (
                                <InfoArenaOppryddingAlert
                                    tiltakstype={tiltakstype}
                                    startDato={startDato}
                                    erRyddeAvtale={erRyddeAvtale}
                                    erNavAnsatt={innloggetBruker.erNavAnsatt}
                                    opphav={opphav}
                                    className={cls.className}
                                />
                            )}
                        </Column>
                        <Column md="6">
                            <Datovelger readOnly={skalIkkeKunneEndreStartdato} datoFelt="startDato" label="Startdato" />
                        </Column>
                        <Column md="6">
                            <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                        </Column>
                    </Row>
                    <VarighetTilbakeTidAlert
                        startDato={startDato}
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
