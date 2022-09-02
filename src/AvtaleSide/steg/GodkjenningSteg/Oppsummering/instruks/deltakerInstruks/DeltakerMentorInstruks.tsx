import { ReactComponent as Passport } from '@/assets/ikoner/passport.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useContext } from 'react';

const DeltakerMentorInstruks: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    return (
        <>
            {!erLåst && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavleIkon>
                <IkonTekstRad
                    svgIkon={<Passport width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Behandling av personopplysninger' }}
                >
                    <p>
                        Du kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost. Skal
                        du gi beskjed om endringer som har betydning for saken og oppfølgingen din fra NAV, kan du bruke{' '}
                        <EksternLenke href="https://www.nav.no/person/dittnav/">Ditt NAV</EksternLenke>
                        eller{' '}
                        <EksternLenke href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss">
                            Skriv til oss
                        </EksternLenke>
                        .
                    </p>
                    <p>Personopplysninger om deg i avtalen lagres i henhold til arkivloven.</p>
                    <p>
                        <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvernerklaering-for-arbeids-og-velferdsetaten">
                            NAVs personvernerklæring
                        </EksternLenke>{' '}
                        forteller mer om hvordan NAV behandler personopplysninger og hvilke rettigheter du har.
                    </p>
                    <p>12 uker etter avsluttet tiltak vil arbeidsgiver ikke lenger har tilgang til avtalen.</p>
                </IkonTekstRad>
            </VeilederpanelMedUtklippstavleIkon>
        </>
    );
};

export default DeltakerMentorInstruks;
