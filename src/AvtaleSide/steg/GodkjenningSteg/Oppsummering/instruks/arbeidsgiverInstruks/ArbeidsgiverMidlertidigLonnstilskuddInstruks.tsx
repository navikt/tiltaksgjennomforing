import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useContext } from 'react';
import Arbeidsmiljøloven from './tekster/Arbeidsmiljøloven';
import BehandlingAvPersonopplysninger from './tekster/BehandlingAvPersonopplysninger';
import FolketrygdlovenEgenmeldingOgSykmelding from './tekster/FolketrygdlovenEgenmeldingOgSykmelding';
import HvaSierRegelverket from './tekster/HvaSierRegelverket';
import OppfølgingOgVarighet from './tekster/OppfølgingOgVarighet';
import Refusjon from './tekster/Refusjon';
import TilskuddsperiodeOgRefusjon from './tekster/TilskuddsperiodeOgRefusjon';
import YrkesskadeforsikringOgSkadeerstatning from './tekster/YrkesskadeforsikringOgSkadeerstatning';

type Props = {
    erPilot: boolean;
};

const ArbeidsgiverMidlertidigLonnstilskuddInstruks: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);
    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const cls = BEMHelper('instruks');

    const tiltakstype: TiltaksType = 'MIDLERTIDIG_LONNSTILSKUDD';

    return (
        <>
            {erLåst && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Element>Som arbeidsgiver må du</Element>
                </div>
                <VerticalSpacer rem={2} />
                <OppfølgingOgVarighet
                    eksternLenke="https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9"
                    tiltakstype={tiltakstype}
                />
                <Arbeidsmiljøloven tiltakstype={tiltakstype} />
                <YrkesskadeforsikringOgSkadeerstatning tiltakstype={tiltakstype} />
                <FolketrygdlovenEgenmeldingOgSykmelding tiltakstype={tiltakstype} />
                <BehandlingAvPersonopplysninger />
                <TilskuddsperiodeOgRefusjon tiltakstype={tiltakstype} erPilot={props.erPilot} />
                <Refusjon tiltakstype={tiltakstype} />
                <HvaSierRegelverket tiltakstype={tiltakstype} href="hehe" />

                {/* <IkonTekstRad
                    svgIkon={<Law width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Hva sier regelverket?', typografiType: 'undertittel' }}
                >
                    <div className={cls.element('kravomrefusjonlinker')}>
                        <EksternLenke href="https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9">
                            Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                        </EksternLenke>

                        <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10'}>
                            Utfyllende regler til forskriften
                        </EksternLenke>
                    </div>
                </IkonTekstRad> */}
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverMidlertidigLonnstilskuddInstruks;
