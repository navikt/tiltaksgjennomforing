import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilOversikt } from '@/paths';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/stegUtils';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import VarselModal from './VarselModal/VarselModal';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

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
    | 'mentoren';

export interface StegInfo {
    komponent: React.ReactNode;
    label: string;
    id: StegId;
}

const AvtaleSide: FunctionComponent = props => {
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [aktivtSteg, setAktivtSteg] = useState<StegInfo | undefined>();
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const avtaleSteg: StegInfo[] = hentAvtaleSteg[avtale.tiltakstype];
    const history = useHistory();
    const { stegPath } = useParams();

    const titler = {
        ARBEIDSTRENING: 'Avtale om arbeidstrening',
        MIDLERTIDIG_LONNSTILSKUDD: 'Avtale om midlertidig lønnstilskudd',
        VARIG_LONNSTILSKUDD: 'Avtale om varig lønnstilskudd',
        MENTOR: 'Avtale om tilskudd til mentor',
    };

    const erDesktop = windowSize > 767;
    const erAvtaleLaast = avtale.erLaast || avtale.avbrutt || innloggetBruker.rolle === 'DELTAKER';
    const sideTittel = titler[avtale.tiltakstype] !== undefined ? titler[avtale.tiltakstype] : 'Avtale';

    const handleWindowSize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    useEffect(() => {
        const getFilterType = () => (!erAvtaleLaast ? stegPath : 'godkjenning');
        setAktivtSteg(avtaleSteg.find(steg => steg.id === getFilterType()) || avtaleSteg[0]);
    }, [stegPath, avtaleSteg, erAvtaleLaast]);

    return aktivtSteg ? (
        <>
            <VarselModal />
            <Banner
                byttetOrg={org => {
                    if (avtale.bedriftNr !== org.OrganizationNumber) {
                        history.push({
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
                        <OppgaveLinje enableScreenSizeCheck={false} />
                        <VerticalSpacer sixteenPx={true} />
                        <VerticalSpacer sixteenPx={true} />
                        {aktivtSteg.komponent}
                    </div>
                )}
                {!erAvtaleLaast && erDesktop && (
                    <DesktopAvtaleSide
                        avtaleSteg={avtaleSteg}
                        aktivtSteg={aktivtSteg}
                        rolle={innloggetBruker.rolle}
                        avtale={avtale}
                    />
                )}
                {!erAvtaleLaast && !erDesktop && (
                    <MobilAvtaleSide avtaleSteg={avtaleSteg} rolle={innloggetBruker.rolle} />
                )}
            </div>
        </>
    ) : null;
};

export default AvtaleSide;
