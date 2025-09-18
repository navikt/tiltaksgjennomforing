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
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const navigate = useNavigate();
    const { steg } = useParams<{ steg?: string }>();

    const avtaleSteg: StegInfo[] =
        innloggetBruker.rolle === 'MENTOR' ? hentAvtaleSteg.MENTOR_INNSYN : hentAvtaleSteg[avtale.tiltakstype];

    const erAvtaleLaast =
        avtale.godkjentAvVeileder !== null ||
        avtale.annullertTidspunkt ||
        innloggetBruker.rolle === 'DELTAKER' ||
        innloggetBruker.rolle === 'MENTOR';

    const sideTittel = avtaleTittel[avtale.tiltakstype];
    const filterType = erAvtaleLaast ? 'godkjenning' : steg;

    const aktivtSteg = useMemo(
        () => avtaleSteg.find((steg) => steg.id === filterType) || avtaleSteg[0],
        [avtaleSteg, filterType],
    );

    const [valgtOrg, setValgtOrg] = useState<string>(avtale.bedriftNr);

    useEffect(() => {
        if (avtale.bedriftNr !== valgtOrg) {
            setValgtOrg(avtale.bedriftNr);
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('bedrift', avtale.bedriftNr);
            searchParams.delete('sokId');
            window.history.replaceState(null, '', window.location.pathname + '?' + searchParams.toString());
        }
    }, [avtale.bedriftNr, valgtOrg]);

    const byttBedrift = useCallback(
        (org: string) => {
            if (org !== valgtOrg) {
                setValgtOrg(org);
                navigate({ pathname: Path.OVERSIKT, search: `bedrift=${org}` });
            }
        },
        [valgtOrg, navigate],
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
                valgtOrganisasjon={valgtOrg}
            />

            <div className="avtaleside" role="main">
                {
                    <div className={erAvtaleLaast ? cls.element('innhold') : cls.element('')}>
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

const useWindowWidth = () => {
    const [windowWidth, setWidth] = useState(() => (typeof window === 'undefined' ? 0 : window.innerWidth));

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);

    return windowWidth;
};

export default AvtaleSide;
