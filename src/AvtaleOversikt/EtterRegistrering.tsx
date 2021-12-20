import React, {FunctionComponent, useState} from 'react'
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import Modal from 'nav-frontend-modal';
import {Knapp} from "nav-frontend-knapper";
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import HorizontalSpacer from "@/komponenter/layout/HorizontalSpacer";
import * as RestService from '@/services/rest-service';
import {Element, Normaltekst} from "nav-frontend-typografi";
import {Avtale} from '@/types/avtale'

import {Feilkode, Feilmeldinger} from "@/types/feilkode";
import {AlertStripeFeil, AlertStripeInfo} from "nav-frontend-alertstriper";
import BEMHelper from "@/utils/bem";
import './EtterRegistrering.less'


const EtterRegistrering : FunctionComponent= () => {

    const cls = BEMHelper('etterRegistrering');

    const [open, setOpen] = useState(false);
    const [feilmelding, setFeilmelding]  = useState<string | undefined>(undefined);

    const [avtaleInfo, setAvtaleInfo] = useState<Avtale>({} as Avtale)

    const hentAvtaleInfo = async (avtaleNr : number) => {
        try{
            const response = await RestService.hentAvtaleInfo(avtaleNr)
            setAvtaleInfo(response)
        }
        catch(error : any){
            setFeilmelding(Feilmeldinger[(error as string).toString().split(':')?.[1].trim()  as Feilkode]);
            setAvtaleInfo({} as Avtale)
        }
    }

    const navnPåTiltakstype = {
        ARBEIDSTRENING: 'Arbeidstrening',
        MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
        VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
        MENTOR: 'Mentor',
        SOMMERJOBB: 'Sommerjobb',
    };

    const AvtaleKanEtterrgistreres = async () => {
        if(avtaleInfo.id){
           const data =  await RestService.setOmAvtalenKanEtterregistreres(avtaleInfo.id);
            setAvtaleInfo(data);
        }
    }

    return (
        <div className={cls.className}>
            <VerticalSpacer rem={1}/>
            <Knapp onClick={() => setOpen(!open)}>Etterregistrering</Knapp>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div className={cls.element('modal')} >

                <h2>Etterrgistrering</h2>
                <Element>Skriv inn avtalenummeret du vil søke på</Element>
                <VerticalSpacer rem={0.5}/>
                <SøkeInput
                    maxLength={5}
                    utførSøk={(søkeord) => hentAvtaleInfo(Number(søkeord))}
                    valider={(verdi: string) => verdi.match(/^[0-9]{1,5}$/) ? undefined : 'Avtalenummer kan kun inneholde tall, maks fem tegn'}
                    // onChange={(e) => setAvtaleInfo({...avtaleInfo, avtaleNr: Number(e.target.value)})}
                    onChange={(event) => console.log(event.target.value)}
                    placeholder={'Skriv et avtalenummer'}
                />
                {avtaleInfo.avtaleNr &&
                <div>
                    <HorizontalSpacer rem={1}/>
                    <div>
                        <h3>Avtale {avtaleInfo.avtaleNr}</h3>
                    </div>
                    <VerticalSpacer rem={1}/>
                    <div>
                        <Element>Bedrift Navn:</Element>
                        <Normaltekst>{avtaleInfo.bedriftNavn}</Normaltekst>
                        <VerticalSpacer rem={1}/>
                        <Element>Bedriftsnummer:</Element>
                        <Normaltekst>{avtaleInfo.bedriftNr}</Normaltekst>
                        <VerticalSpacer rem={1}/>
                        <Element>Navn:</Element>
                        <Normaltekst>{avtaleInfo.deltakerFornavn} {avtaleInfo.deltakerEtternavn}</Normaltekst>
                    </div>
                    <VerticalSpacer rem={1}/>
                    <div>
                        <Element>TiltaksType:</Element>
                        <Normaltekst>{navnPåTiltakstype[avtaleInfo.tiltakstype]}</Normaltekst>
                        <VerticalSpacer rem={2}/>
                    </div>
                    {avtaleInfo.erGodkjentForEtterregistrering && (
                        <>
                            <AlertStripeInfo>Avtalen er godkjent for etterregistrering</AlertStripeInfo>
                            <VerticalSpacer rem={1}/>
                        </>

                     )}
                    <div>
                        <Knapp onClick={() => AvtaleKanEtterrgistreres()}>
                            {avtaleInfo.erGodkjentForEtterregistrering ? 'Fjern Etterregistrering' : 'Godkjen for etterregistrering'}
                        </Knapp>
                    </div>
                    <HorizontalSpacer rem={1}/>
                </div>
                }
                {feilmelding && <AlertStripeFeil>{feilmelding}</AlertStripeFeil>}
                </div>
            </Modal>
        </div>
    );
}
export default EtterRegistrering;
