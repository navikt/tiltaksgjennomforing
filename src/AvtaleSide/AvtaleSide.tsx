import { Context, medContext } from '@/AvtaleContext';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/stegUtils';
import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
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
    const erDesktop = windowSize > 767;

    const handleWindowSize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    useEffect(() => {
        setAktivtSteg(avtaleSteg.find(steg => steg.id === props.match.params.stegPath) || avtaleSteg[0]);
    }, [props.match.params.stegPath, avtaleSteg]);

    const titler = {
        ARBEIDSTRENING: 'Avtale om arbeidstrening',
        MIDLERTIDIG_LONNSTILSKUDD: 'Avtale om midlertidig lønnstilskudd',
        VARIG_LONNSTILSKUDD: 'Avtale om varig lønnstilskudd',
        MENTOR: 'Avtale om tilskudd til mentor',
    };
    const sideTittel = titler[props.avtale.tiltakstype] !== undefined ? titler[props.avtale.tiltakstype] : 'Avtale';

    return (
        <AvtaleFetcher
            avtaleId={props.match.params.avtaleId}
            render={() => {
                let innhold: ReactNode;
                if (!aktivtSteg) {
                    return null;
                } else if (props.avtale.erLaast || props.avtale.avbrutt || props.rolle === 'DELTAKER') {
                    setAktivtSteg(avtaleSteg.find(steg => steg.id === 'godkjenning'));
                    innhold = (
                        <div className={cls.element('innhold')}>
                            <OppgaveLinje enableScreenSizeCheck={false} />
                            <VerticalSpacer sixteenPx={true} />
                            <VerticalSpacer sixteenPx={true} />
                            {aktivtSteg.komponent}
                        </div>
                    );
                } else if (erDesktop) {
                    innhold = (
                        <DesktopAvtaleSide
                            avtaleSteg={avtaleSteg}
                            aktivtSteg={aktivtSteg}
                            rolle={props.rolle}
                            avtale={props.avtale}
                        />
                    );
                } else {
                    innhold = <MobilAvtaleSide avtaleSteg={avtaleSteg} rolle={props.rolle} />;
                }
                return (
                    <>
                        <VarselModal />
                        <Banner tekst={sideTittel} />
                        <div className="avtaleside">{innhold}</div>
                    </>
                );
            }}
        />
    );
};

export default medContext(AvtaleSide);
