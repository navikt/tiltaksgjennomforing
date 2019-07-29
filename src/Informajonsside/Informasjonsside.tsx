import React from 'react';
import Banner from '../komponenter/Banner/Banner';
import TilbakeTilOversiktLenke from '../AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import BEMHelper from '../utils/bem';
import Clipboard from './Clipboard';
import './informasjonsside.less';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import EkstbanderbartPanelRad from '../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import { ReactComponent as Keyboard } from './keyboard.svg';

const cls = BEMHelper('informasjonsside');

const Informasjonsside = () => {
    return (
        <div>
            <Banner tekst="Avtale om arbeidstrening" />
            <Innhold />
        </div>
    );
};

export default Informasjonsside;

const Innhold = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('container')}>
                <TilbakeTilOversiktLenke />
                <div className={cls.element('innhold')}>
                    <Clipboard cls="ClipBoardIkon" />
                    <div className={cls.element('innholdstittel')}>
                        <Innholdstittel>
                            Hvordan fungerer løsningen?
                        </Innholdstittel>
                    </div>
                    <div className={cls.element('ingress')}>
                        <Normaltekst>
                            Vi innfører en digital avtale om arbeidstrening. Her
                            får du en rask introduksjon til hvordan den nye
                            løsningen fungerer:
                        </Normaltekst>
                    </div>
                    <EkstbanderbartPanelRad svgIkon={<Keyboard />}>
                        Når deltageren, arbeidsgiveren og NAV har blitt enige om
                        å starte opp en arbeidstrening, oppretter NAV en digital
                        avtale. Deltager og arbeidsgiver vil få tilsendt en
                        lenke fra NAV når denne er klar til innlogging.
                    </EkstbanderbartPanelRad>
                </div>
            </div>
        </div>
    );
};
