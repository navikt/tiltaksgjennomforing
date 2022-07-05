import {
    mentorGodkjennTaushetserklæring
} from '@/services/rest-service';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import BEMHelper from '@/utils/bem';
import Modal from 'nav-frontend-modal';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import './Taushetserklæring.less';
import {Avtale} from "@/types/avtale";
import {Normaltekst} from "nav-frontend-typografi";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";

interface TaushetserklæringProps {
    open: boolean,
    avtale: Avtale,
    togglesetTaushetserklæringForMentorAvtale: (avtale:Avtale) =>void
}


const Taushetserklæring: FunctionComponent<TaushetserklæringProps> = ({ open,  avtale,togglesetTaushetserklæringForMentorAvtale}) => {
    const cls = BEMHelper('etterRegistrering');
    const [bekrefterGodkjennerTaushetserklæring, setBekrefterGodkjennerTaushetserklæring] = useState<boolean>(false);

    const godkjennTaushetserklæring = async () => {
        if (bekrefterGodkjennerTaushetserklæring) {
            const avtaleTilbake = await mentorGodkjennTaushetserklæring(avtale)
            window.location.href = "avtale/"+ avtaleTilbake.id;
        }
    };

    console.log(open);
    return (
            <Modal
                isOpen={open}
                onRequestClose={() => {
                    togglesetTaushetserklæringForMentorAvtale(avtale)
                }}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div className={cls.element('modal')}>
                    <Systemtittel className={cls.element('header')}>Signer taushetserklæring</Systemtittel>
                    <p>
                        Som mentor må du signere en taushetserklæring.
                    </p>
                    <VerticalSpacer rem={2}/>
                        <Systemtittel>Taushetsplikt for avtale</Systemtittel>
                        <p>
                            Forvaltningsloven, arbeids- og velferdsforvaltningsloven og lov om sosiale tjenester i
                            arbeids- og velferdsforvaltningen inneholder strenge regler om taushetsplikt. Det skal
                            bevares taushet om alle opplysninger en i medfør av arbeid for NAV får om noens personlige
                            forhold. Taushetsplikten gjelder også opplysninger som fødested, fødselsdato, personnummer,
                            statsborgerforhold, sivilstand, yrke, bosted og arbeidssted. I tillegg vil taushetsplikten
                            kunne omfatte opplysninger om drifts- eller forretningsforhold som det vil være av
                            konkurransemessig betydning å hemmeligholde av hensyn til den opplysningen gjelder.
                        </p>
                        <p>
                            Taushetsplikten innebærer både at man skal unnlate å avsløre opplysninger for andre og
                            aktivt hindre at uvedkommende får tilgang eller kjennskap til taushetsbelagte opplysninger.
                            Taushetsplikten gjelder også overfor andre som utfører arbeid for NAV med mindre det
                            foreligger tjenstlige behov.
                        </p>
                        <p>
                            Taushetsplikten gjelder både i arbeidet og i fritiden. Taushetsplikten består også etter at
                            tjeneste eller arbeid er utført. Opplysninger som er underlagt taushetsplikt, kan heller
                            ikke utnyttes i egen virksomhet eller i tjeneste eller arbeid for andre.
                        </p>
                        <p>
                            Reglene om taushetsplikt gjelder alle som utfører arbeid for NAV. Alle plikter derfor å
                            sette seg inn i reglene om taushetsplikt.
                        </p>
                        <p>
                            Alle som utfører arbeid for NAV, skal videre hindre at opplysninger om sikkerhetsrutiner og
                            sikkerhetsinstrukser som regulerer NAVs sikkerhet gjøres kjent for uvedkommende.
                        </p>
                        <p>
                            Brudd på taushetsplikten kan medføre konsekvenser for det relevante kontraktuelle forhold og
                            straffeansvar etter straffeloven §§ 209 og 210.
                        </p>
                        <div style={{padding:"1rem", lineHeight:"0.5rem", fontSize:"0.9rem"}}>
                            <Systemtittel>Hva sier regelverket?</Systemtittel>
                            <p><a href={""}>ARBEIDS- OG VELFERDSFORVALTNINGSLOVEN § 7</a></p>
                            <p><a href={""}>Lenke til FORVALTNINGSLOVEN § 13-13E OG 13G</a></p>
                            <p> <a href={""}>STRAFFELOVEN §§ 209 OG 210</a></p>
                            <p><a href={""}>LOV OM SOSIALE TJENESTER I ARBEIDS OG VELFERDSFORVALTNINGEN § 44</a></p>
                        </div>
                        <BekreftCheckboksPanel
                            key={"Taushetserklæring-BekreftCheckboksPanel" + avtale.id}
                            label="Jeg bekrefter jeg å ha lest og forstått min taushetsplikt og har gjort meg kjent med de lovbestemmelsene som er listet opp over"
                            checked={bekrefterGodkjennerTaushetserklæring}
                            onChange={() =>
                                setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)
                            }
                        />
                        <LagreKnapp className={"etterRegistrering__lagreKnapp"} label={'Signer Taushetserklæring'} lagre={godkjennTaushetserklæring} />
                </div>
            </Modal>
    );
};
export default Taushetserklæring;
