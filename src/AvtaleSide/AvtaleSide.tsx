import { Context, medContext } from '@/AvtaleContext';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AvbrytAvtaleModal from '@/komponenter/modal/AvbrytAvtaleModal';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/stegUtils';
import moment from 'moment';
import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AvbryteAvtalen from './AvbryteAvtalen/AvbryteAvtalen';
import AvtaleFetcher from './AvtaleFetcher';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';
import GjenopprettModal from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettModal';

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
    const [avbrytModalIsOpen, setAvbrytModalIsOpen] = useState<boolean>(false);
    const [apneGjenopprett, setApneGjenopprett] = useState<boolean>(false);
    const erVeileder = props.rolle === 'VEILEDER';
    const avtaleAvbrutt = props.avtale.avbrutt;
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

    const varsler: JSX.Element[] = props.varsler
        .filter(v => !v.lest)
        .map(v => (
            <VarselKomponent
                kanLukkes={true}
                onLukkVarsel={() => props.settVarselTilLest(v.id)}
                type={'info'}
                key={v.id}
                className={cls.element('varsel')}
            >
                <div>
                    <div className={cls.element('varsel__tekst')}>{v.varslingstekst}</div>
                    {v.tidspunkt && <div className={cls.element('svak')}>{moment(v.tidspunkt).fromNow()}</div>}
                </div>
            </VarselKomponent>
        ));

    const tilbakeTilOversiktKlikk = async () => {
        if (props.harUlagredeEndringer()) {
            try {
                await props.lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    props.visFeilmelding(error.message);
                } else {
                    throw error;
                }
            }
        }
    };

    const lukkeModal = () => {
        setAvbrytModalIsOpen(false);
    };

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
                            <div className="tilbaketiloversikt">
                                <TilbakeTilOversiktLenke />
                                {erVeileder && avtaleAvbrutt && (
                                    <GjenopprettAvtalen apneModal={() => setApneGjenopprett(true)} />
                                )}
                                {erVeileder && !avtaleAvbrutt && (
                                    <AvbryteAvtalen avbrytOnclick={() => setAvbrytModalIsOpen(true)} />
                                )}
                            </div>
                            <VerticalSpacer sixteenPx={true} />
                            {varsler}
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
                            varsler={varsler}
                            avbrytAvtale={props.avbryt}
                            tilbakeTilOversiktKlikk={tilbakeTilOversiktKlikk}
                        />
                    );
                } else {
                    innhold = (
                        <MobilAvtaleSide
                            avtaleSteg={avtaleSteg}
                            rolle={props.rolle}
                            varsler={varsler}
                            tilbakeTilOversiktKlikk={tilbakeTilOversiktKlikk}
                        />
                    );
                }

                return (
                    <>
                        <Banner tekst={sideTittel} />
                        <div className="avtaleside">{innhold}</div>
                        <AvbrytAvtaleModal
                            isOpen={avbrytModalIsOpen}
                            lukkModal={lukkeModal}
                            avbrytAvtale={props.avbryt}
                        />
                        <GjenopprettModal
                            avtaleId={props.avtale.id}
                            isOpen={apneGjenopprett}
                            lukkModal={() => setApneGjenopprett(false)}
                        />
                    </>
                );
            }}
        />
    );
};

export default medContext(AvtaleSide);
