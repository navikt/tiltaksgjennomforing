import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import { avtaleTittel } from '@/messages';
import { pathTilOversikt } from '@/paths';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/hentAvtaleSteg';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import VarselModal from './VarselModal/VarselModal';
import './AvtaleSide.less';
import Dialog from '@/komponenter/brukerdialog/Dialog';

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
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [aktivtSteg, setAktivtSteg] = useState<StegInfo | undefined>();
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    let avtaleSteg: StegInfo[] = hentAvtaleSteg[avtale.tiltakstype];
    if (innloggetBruker.rolle === 'MENTOR') avtaleSteg = hentAvtaleSteg.MENTOR_INNSYN;
    const navigate = useNavigate();
    const { stegPath } = useParams<any>();

    const erDesktop = windowSize > 768;
    const godkjentAvVeileder = avtale.godkjentAvVeileder !== null;
    const erAvtaleLaast =
        godkjentAvVeileder ||
        avtale.avbrutt ||
        avtale.annullertTidspunkt ||
        innloggetBruker.rolle === 'DELTAKER' ||
        innloggetBruker.rolle === 'MENTOR';
    const sideTittel = avtaleTittel[avtale.tiltakstype];

    const handleWindowSize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    useEffect(() => {
        const getFilterType = () => (!erAvtaleLaast ? stegPath : 'godkjenning');
        setAktivtSteg(avtaleSteg.find((steg) => steg.id === getFilterType()) || avtaleSteg[0]);
    }, [stegPath, avtaleSteg, erAvtaleLaast]);
    return aktivtSteg ? (
        <>
            <Dokumenttittel tittel={sideTittel} />
            <VarselModal />
            <Banner
                undertittel={'Avtalenummer: ' + avtale.avtaleNr}
                byttetOrg={(org) => {
                    if (avtale.bedriftNr !== org.OrganizationNumber) {
                        navigate({
                            pathname: pathTilOversikt,
                            search: window.location.search,
                        });
                    }
                }}
                tekst={sideTittel}
            />
            <div className="avtaleside">
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
                    <MobilAvtaleSide avtaleId={avtale.id} avtaleSteg={avtaleSteg} rolle={innloggetBruker.rolle} />
                )}
                <Dialog id={avtale.id} />
            </div>
        </>
    ) : null;
};

export default AvtaleSide;
