import { Context, medContext } from '@/AvtaleContext';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/stegUtils';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AvtaleFetcher from './AvtaleFetcher';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import VarselModal from './VarselModal/VarselModal';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

const cls = BEMHelper('avtaleside');

type Props = RouteComponentProps<MatchProps> & Context;

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

const AvtaleSide: FunctionComponent<Props> = props => {
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [aktivtSteg, setAktivtSteg] = useState<StegInfo | undefined>();
    const avtaleSteg: StegInfo[] = hentAvtaleSteg[props.avtale.tiltakstype];

    const titler = {
        ARBEIDSTRENING: 'Avtale om arbeidstrening',
        MIDLERTIDIG_LONNSTILSKUDD: 'Avtale om midlertidig lønnstilskudd',
        VARIG_LONNSTILSKUDD: 'Avtale om varig lønnstilskudd',
        MENTOR: 'Avtale om tilskudd til mentor',
    };

    const erDesktop = windowSize > 767;
    const erAvtaleLaast = props.avtale.erLaast || props.avtale.avbrutt || props.rolle === 'DELTAKER';
    const sideTittel = titler[props.avtale.tiltakstype] !== undefined ? titler[props.avtale.tiltakstype] : 'Avtale';

    const handleWindowSize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    useEffect(() => {
        const getFilterType = () => (!erAvtaleLaast ? props.match.params.stegPath : 'godkjenning');
        setAktivtSteg(avtaleSteg.find(steg => steg.id === getFilterType()) || avtaleSteg[0]);
    }, [props.match.params.stegPath, avtaleSteg, erAvtaleLaast]);

    return aktivtSteg ? (
        <>
            <AvtaleFetcher avtaleId={props.match.params.avtaleId}>
                <>
                    <VarselModal />
                    <Banner tekst={sideTittel} />
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
                                rolle={props.rolle}
                                avtale={props.avtale}
                            />
                        )}
                        {!erAvtaleLaast && !erDesktop && (
                            <MobilAvtaleSide avtaleSteg={avtaleSteg} rolle={props.rolle} />
                        )}
                    </div>
                </>
            </AvtaleFetcher>
        </>
    ) : null;
};

export default medContext(AvtaleSide);
