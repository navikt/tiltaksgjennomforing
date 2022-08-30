import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/lov.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Bandage } from '@navikt/ds-icons';
import { Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useContext } from 'react';

const DeltakerArbeidstreningInstruks: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;

    return (
        <>
            {!erLåst && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavleIkon>
                <>
                    <VerticalSpacer rem={2} />
                    <IkonTekstRad
                        svgIkon={<RettighetsHammerIkon />}
                        headerTekst={{
                            tekst: 'Ditt forhold til arbeidsmiljøloven',
                        }}
                    >
                        <VerticalSpacer rem={0.5} />

                        <>
                            Når du deltar på arbeidstrening regnes du som en vanlig ansatt, som vil si at din
                            arbeidsgiver må følge de fleste av arbeidsmiljølovens regler. Arbeidsgiver må også forsikre
                            deg og arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                        </>
                    </IkonTekstRad>
                </>
                <IkonTekstRad
                    svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
                    headerTekst={{
                        tekst: 'Gi beskjed hvis du er borte fra jobb',
                    }}
                >
                    <VerticalSpacer rem={0.5} />
                    Du må melde fra til arbeidsgiver ved fravær. Ved egen eller barns sykdom gjelder ordinære regler for
                    bruk av egenmelding også for deg som er på arbeidstrening.
                </IkonTekstRad>
            </VeilederpanelMedUtklippstavleIkon>
        </>
    );
};

export default DeltakerArbeidstreningInstruks;
