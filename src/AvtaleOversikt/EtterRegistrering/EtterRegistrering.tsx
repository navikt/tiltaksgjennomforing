import React, { FunctionComponent, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import * as RestService from '@/services/rest-service';
import { Element, Ingress, Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '@/types/avtale';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import BEMHelper from '@/utils/bem';
import './EtterRegistrering.less';
import InfoRad from '@/AvtaleOversikt/EtterRegistrering/InfoRad';

interface EtterRegistreringInfo {
    open: boolean;
    feilmelding: string | undefined;
    avtaleInfo: Avtale;
    spinner: boolean;
}

const EtterRegistrering: FunctionComponent = () => {
    const cls = BEMHelper('etterRegistrering');

    const [info, setInfo] = useState<EtterRegistreringInfo>({
        open: false,
        feilmelding: undefined,
        avtaleInfo: {} as Avtale,
        spinner: false,
    });

    const hentAvtaleInfo = async (avtaleNr: number): Promise<void> => {
        setInfo({ ...info, spinner: true });
        try {
            const response = await RestService.hentAvtaleInfo(avtaleNr);
            setInfo({ ...info, avtaleInfo: response });
            setTimeoutOnFunction(() => setInfo({ ...info, avtaleInfo: response, spinner: false }));
        } catch (error: any) {
            setInfo({
                ...info,
                feilmelding: Feilmeldinger[(error as string).toString().split(':')?.[1].trim() as Feilkode],
                spinner: false,
            });
        }
    };

    const navnPåTiltakstype = {
        ARBEIDSTRENING: 'Arbeidstrening',
        MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
        VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
        MENTOR: 'Mentor',
        SOMMERJOBB: 'Sommerjobb',
    };

    const AvtaleKanEtterrgistreres = async (): Promise<void> => {
        if (info.avtaleInfo.id) {
            const data = await RestService.setOmAvtalenKanEtterregistreres(info.avtaleInfo.id);
            setInfo({ ...info, avtaleInfo: data });
        }
    };

    const setTimeoutOnFunction = (callback: () => void) => {
        setTimeout(() => {
            callback();
        }, 1500);
    };

    const transitionAvtaleInfoWrapper = (): string =>
        info.avtaleInfo.avtaleNr ? cls.element('avtale-info-wrapper') : cls.element('avtale-info-wrapper', 'skjule');

    return (
        <div className={cls.className}>
            <Knapp onClick={() => setInfo({ ...info, open: !info.open })}>Etterregistrering</Knapp>
            <Modal
                isOpen={info.open}
                onRequestClose={() => {
                    setInfo({ ...info, open: false, avtaleInfo: {} as Avtale, feilmelding: undefined, spinner: false });
                }}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div className={cls.element('modal')}>
                    <Systemtittel className={cls.element('header')}>
                        Søk opp avtalenr for godkjenning av etterregistrering.
                    </Systemtittel>
                    <Element className={cls.element('sokfelt-tag')}>Skriv inn avtalenummeret du vil søke på</Element>
                    <div className={cls.element('input-sok')}>
                        <SøkeInput
                            maxLength={5}
                            utførSøk={(søkeord) => {
                                setInfo({ ...info, spinner: true });
                                hentAvtaleInfo(Number(søkeord));
                            }}
                            valider={(verdi: string) =>
                                verdi.match(/^[0-9]{1,5}$/)
                                    ? undefined
                                    : 'Avtalenummer kan kun inneholde tall, maks fem tegn'
                            }
                            onChangeCallback={() =>
                                setInfo({ ...info, avtaleInfo: {} as Avtale, feilmelding: undefined })
                            }
                            placeholder={'Skriv et avtalenummer'}
                            buttonSpinner={info.spinner}
                        />
                    </div>

                    <div className={transitionAvtaleInfoWrapper()}>
                        <Ingress className={cls.element('ingress')}>Avtale-nr {info.avtaleInfo.avtaleNr}</Ingress>
                        <InfoRad
                            klasseNavn={cls.element('rad-info')}
                            radInfo="Bedrift Navn:"
                            radVerdi={info.avtaleInfo.bedriftNavn}
                        />
                        <InfoRad
                            klasseNavn={cls.element('rad-info')}
                            radInfo="Bedriftsnummer:"
                            radVerdi={info.avtaleInfo.bedriftNr}
                        />
                        <InfoRad
                            klasseNavn={cls.element('rad-info')}
                            radInfo="Navn:"
                            radVerdi={`${info.avtaleInfo.deltakerFornavn} ${info.avtaleInfo.deltakerEtternavn}`}
                        />
                        <InfoRad
                            klasseNavn={cls.element('rad-info')}
                            radInfo="TiltaksType:"
                            radVerdi={navnPåTiltakstype[info.avtaleInfo.tiltakstype]}
                        />

                        {info.avtaleInfo.erGodkjentForEtterregistrering && (
                            <AlertStripeInfo>Avtalen er godkjent for etterregistrering</AlertStripeInfo>
                        )}
                        <div>
                            <Knapp onClick={() => AvtaleKanEtterrgistreres()}>
                                {info.avtaleInfo.erGodkjentForEtterregistrering
                                    ? 'Fjern Etterregistrering'
                                    : 'Godkjen for etterregistrering'}
                            </Knapp>
                        </div>
                    </div>

                    {info.feilmelding && <AlertStripeFeil>{info.feilmelding}</AlertStripeFeil>}
                </div>
            </Modal>
        </div>
    );
};
export default EtterRegistrering;
