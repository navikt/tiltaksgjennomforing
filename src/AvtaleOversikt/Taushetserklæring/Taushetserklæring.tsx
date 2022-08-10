import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { pathTilAvtale } from '@/paths';
import { mentorGodkjennTaushetserklæring } from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Taushetserklæring.less';

interface TaushetserklæringProps {
    isOpen: boolean;
    lukkModal: () => void;
    avtale: Avtale;
}

const Taushetserklæring: FunctionComponent<TaushetserklæringProps> = (props) => {
    const cls = BEMHelper('etterRegistrering');
    const [bekrefterGodkjennerTaushetserklæring, setBekrefterGodkjennerTaushetserklæring] = useState<boolean>(false);
    const history = useHistory();

    const godkjennTaushetserklæring = async () => {
        if (bekrefterGodkjennerTaushetserklæring) {
            const avtale = await mentorGodkjennTaushetserklæring(props.avtale);
            history.push(pathTilAvtale(avtale.id))
        } else {
            throw new UfullstendigError('Du må bekrefte at du forstår kravene før du kan godkjenne.');
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.lukkModal()}
            closeButton={true}
            className={cls.element('modal-container')}
            contentLabel="Min modalrute"
        >
            <div className={cls.element('modal')}>
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>

                <Systemtittel className={cls.element('header')}>Signer taushetserklæring</Systemtittel>
                <p>Som mentor må du signere en taushetserklæring.</p>
                <VerticalSpacer rem={2} />
                <Systemtittel>Taushetsplikt for avtale</Systemtittel>
                <p>
                    Forvaltningsloven, arbeids- og velferdsforvaltningsloven og lov om sosiale tjenester i arbeids- og
                    velferdsforvaltningen inneholder strenge regler om taushetsplikt. Det skal bevares taushet om alle
                    opplysninger en i medfør av arbeid for NAV får om noens personlige forhold. Taushetsplikten gjelder
                    også opplysninger som fødested, fødselsdato, personnummer, statsborgerforhold, sivilstand, yrke,
                    bosted og arbeidssted. I tillegg vil taushetsplikten kunne omfatte opplysninger om drifts- eller
                    forretningsforhold som det vil være av konkurransemessig betydning å hemmeligholde av hensyn til den
                    opplysningen gjelder.
                </p>
                <p>
                    Taushetsplikten innebærer både at man skal unnlate å avsløre opplysninger for andre og aktivt hindre
                    at uvedkommende får tilgang eller kjennskap til taushetsbelagte opplysninger. Taushetsplikten
                    gjelder også overfor andre som utfører arbeid for NAV med mindre det foreligger tjenstlige behov.
                </p>
                <p>
                    Taushetsplikten gjelder både i arbeidet og i fritiden. Taushetsplikten består også etter at tjeneste
                    eller arbeid er utført. Opplysninger som er underlagt taushetsplikt, kan heller ikke utnyttes i egen
                    virksomhet eller i tjeneste eller arbeid for andre.
                </p>
                <p>
                    Reglene om taushetsplikt gjelder alle som utfører arbeid for NAV. Alle plikter derfor å sette seg
                    inn i reglene om taushetsplikt.
                </p>
                <p>
                    Alle som utfører arbeid for NAV, skal videre hindre at opplysninger om sikkerhetsrutiner og
                    sikkerhetsinstrukser som regulerer NAVs sikkerhet gjøres kjent for uvedkommende.
                </p>
                <p>
                    Brudd på taushetsplikten kan medføre konsekvenser for det relevante kontraktuelle forhold og
                    straffeansvar etter straffeloven §§ 209 og 210.
                </p>
                <div style={{ padding: '1rem', lineHeight: '0.5rem', fontSize: '0.9rem' }}>
                    <Systemtittel>Hva sier regelverket?</Systemtittel>
                    <div className={cls.element('lenker')}>
                        <Lenke
                            className={cls.element('lenke')}
                            href={'https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_2#%C2%A77'}
                        >
                            ARBEIDS- OG VELFERDSFORVALTNINGSLOVEN § 7
                        </Lenke>

                        <Lenke
                            className={cls.element('lenke')}
                            href={'https://lovdata.no/dokument/NL/lov/1967-02-10/KAPITTEL_3#%C2%A713e'}
                        >
                            Lenke til FORVALTNINGSLOVEN § 13-13E OG 13G
                        </Lenke>

                        <Lenke
                            className={cls.element('lenke')}
                            href={'https://lovdata.no/dokument/NL/lov/2005-05-20-28/KAPITTEL_2-6#%C2%A7209'}
                        >
                            STRAFFELOVEN §§ 209 OG 210
                        </Lenke>
                        <Lenke
                            className={cls.element('lenke')}
                            href={'https://lovdata.no/dokument/NL/lov/2009-12-18-131/KAPITTEL_5#%C2%A744'}
                        >
                            LOV OM SOSIALE TJENESTER I ARBEIDS OG VELFERDSFORVALTNINGEN § 44
                        </Lenke>
                    </div>
                </div>
                <BekreftCheckboksPanel
                    key={'Taushetserklæring-BekreftCheckboksPanel' + props.avtale.id}
                    label="Jeg bekrefter jeg å ha lest og forstått min taushetsplikt og har gjort meg kjent med de lovbestemmelsene som er listet opp over"
                    checked={bekrefterGodkjennerTaushetserklæring}
                    onChange={() => setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)}
                />
                <LagreKnapp
                    className={'etterRegistrering__lagreKnapp'}
                    label={'Signer Taushetserklæring'}
                    lagre={godkjennTaushetserklæring}
                />
            </div>
        </Modal>
    );
};
export default Taushetserklæring;
