import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import { avtaleTittel } from '@/messages';
import { Path } from '@/Router';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/hentAvtaleSteg';
import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import VarselModal from './VarselModal/VarselModal';
import { useMigreringSkrivebeskyttet } from '@/FeatureToggles';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert, Link } from '@navikt/ds-react';

const cls = BEMHelper('avtaleside');

export type StegId =
    | 'kontaktinformasjon'
    | 'maal'
    | 'arbeidsoppgaver'
    | 'arbeidstid'
    | 'oppfolging'
    | 'stilling'
    | 'varighet'
    | 'beregningtilskudd'
    | 'godkjenning'
    | 'mentoren'
    | 'inkluderingstilskudd';

export interface StegInfo {
    komponent: React.ReactNode;
    label: string;
    id: StegId;
}

const AvtaleSide: FunctionComponent = () => {
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const navigate = useNavigate();
    const { steg } = useParams<{ steg?: string }>();

    let avtaleSteg: StegInfo[] = hentAvtaleSteg[avtale.tiltakstype];
    if (innloggetBruker.rolle === 'MENTOR') {
        avtaleSteg = hentAvtaleSteg.MENTOR_INNSYN;
    }

    const erAvtaleLaast =
        avtale.godkjentAvVeileder !== null ||
        avtale.annullertTidspunkt ||
        innloggetBruker.rolle === 'DELTAKER' ||
        innloggetBruker.rolle === 'MENTOR' ||
        erSkrivebeskyttet(avtale);
    const sideTittel = avtaleTittel[avtale.tiltakstype];

    const aktivtSteg = useMemo(() => {
        const aktivtStegId = erAvtaleLaast ? 'godkjenning' : steg;
        return avtaleSteg.find((steg) => steg.id === aktivtStegId) ?? avtaleSteg[0];
    }, [avtaleSteg, erAvtaleLaast, steg]);

    const byttBedrift = useCallback(
        (org: string) => {
            if (org !== avtale.bedriftNr) {
                navigate(Path.OVERSIKT);
            }
        },
        [avtale.bedriftNr, navigate],
    );

    const erDesktop = useWindowWidth() > 768;

    return aktivtSteg ? (
        <>
            <Dokumenttittel tittel={sideTittel} />
            <VarselModal />
            <Banner
                undertittel={'Avtalenummer: ' + avtale.avtaleNr}
                byttetOrg={byttBedrift}
                tekst={sideTittel}
                valgtOrganisasjon={avtale.bedriftNr}
            />

            <div className="avtaleside" role="main">
                {
                    <div className={erAvtaleLaast ? cls.element('innhold') : cls.element('')}>
                        {innloggetBruker.rolle === 'ARBEIDSGIVER' && avtale.tiltakstype === 'MENTOR' && (
                            <>
                                <VerticalSpacer rem={1} />
                                <Alert variant="warning" className={cls.element('alert')}>
                                    <p>
                                        Vi har gjort tekniske oppdateringer i systemene våre og det kan forekomme
                                        endringer for de som har avtaler om tilskudd til mentor.
                                    </p>
                                    <p>
                                        Hvis dere opplever at noe ikke stemmer, så ta kontakt med veileder eller NKS på
                                        telefonen:{' '}
                                        <Link
                                            href="tel:55553336"
                                            aria-label="Telefon til NKS, telefonnummer 55 55 33 36"
                                        >
                                            55&nbsp;55&nbsp;33&nbsp;36
                                        </Link>
                                    </p>
                                </Alert>
                                <VerticalSpacer rem={1} />
                            </>
                        )}
                        {erAvtaleLaast && (
                            <div className={cls.element('innhold')}>
                                <BannerNAVAnsatt tekst={sideTittel} undertittel={`Avtalenummer: ${avtale.avtaleNr}`} />
                                <OppgaveLinje />
                                {aktivtSteg.komponent}
                            </div>
                        )}
                        {!erAvtaleLaast && erDesktop && (
                            <DesktopAvtaleSide
                                sidetittel={sideTittel}
                                avtaleSteg={avtaleSteg}
                                aktivtSteg={aktivtSteg}
                                rolle={innloggetBruker.rolle}
                                avtale={avtale}
                            />
                        )}
                        {!erAvtaleLaast && !erDesktop && (
                            <MobilAvtaleSide
                                avtaleId={avtale.id}
                                avtaleSteg={avtaleSteg}
                                rolle={innloggetBruker.rolle}
                            />
                        )}
                    </div>
                }
            </div>
        </>
    ) : null;
};

function useWindowWidth() {
    const [windowWidth, setWidth] = useState(() => (typeof window === 'undefined' ? 0 : window.innerWidth));

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);

    return windowWidth;
}

export default AvtaleSide;
