import InfoRad from '@/AvtaleOversikt/EtterRegistrering/InfoRad';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { tiltakstypeTekst } from '@/messages';
import * as RestService from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Alert, Modal, Label, Heading, Ingress } from '@navikt/ds-react';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useState } from 'react';
import './EtterRegistrering.less';

const EtterRegistrering: FunctionComponent = () => {
    const cls = BEMHelper('etterRegistrering');

    const [open, setOpen] = useState(false);
    const [feilmelding, setFeilmelding] = useState<string>();
    const [avtale, setAvtale] = useState<Avtale>();
    const [spinner, setSpinner] = useState(false);

    const hentAvtaleInfo = async (avtaleNr: number): Promise<void> => {
        setSpinner(true);
        const response = await RestService.hentAvtalerForInnloggetBruker({ avtaleNr });
        if (response.length === 1) {
            setTimeoutOnFunction(() => {
                setAvtale(response[0]);
                setSpinner(false);
            });
        } else {
            setFeilmelding('Finner ingen avtale på det avtalenummeret');
            setSpinner(false);
        }
    };

    const AvtaleKanEtterrgistreres = async (): Promise<void> => {
        if (avtale) {
            const response = await RestService.setOmAvtalenKanEtterregistreres(avtale.id);
            setAvtale(response);
        }
    };

    const setTimeoutOnFunction = (callback: () => void) => {
        setTimeout(() => {
            callback();
        }, 1500);
    };

    const transitionAvtaleInfoWrapper = (): string =>
        avtale ? cls.element('avtale-info-wrapper') : cls.element('avtale-info-wrapper', 'skjule');

    return (
        <div className={cls.className}>
            <Knapp className={cls.element('etterregistrering-knapp')} onClick={() => setOpen(!open)}>
                Etterregistrering
            </Knapp>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setAvtale(undefined);
                    setFeilmelding(undefined);
                    setSpinner(false);
                }}
                closeButton={true}
                aria-label="Min modalrute"
            >
                <Modal.Content>
                    <div className={cls.element('modal')}>
                        <Heading size="medium" className={cls.element('header')}>
                            Søk opp avtalenummer for godkjenning av etterregistrering
                        </Heading>
                        <Label size="small" className={cls.element('sokfelt-tag')}>
                            Skriv inn avtalenummeret du vil søke på
                        </Label>
                        <div className={cls.element('input-sok')}>
                            <SøkeInput
                                className="etterRegistrering"
                                maxLength={5}
                                utførSøk={(søkeord) => {
                                    setSpinner(true);
                                    hentAvtaleInfo(Number(søkeord));
                                }}
                                valider={(verdi: string) =>
                                    verdi.match(/^\d{1,5}$/)
                                        ? undefined
                                        : 'Avtalenummer kan kun inneholde tall, maks fem tegn'
                                }
                                onChangeCallback={() => {
                                    setAvtale(undefined);
                                    setFeilmelding(undefined);
                                }}
                                placeholder={'Skriv et avtalenummer'}
                                buttonSpinner={spinner}
                            />
                        </div>
                        {avtale && (
                            <div className={transitionAvtaleInfoWrapper()}>
                                <Ingress className={cls.element('ingress')}>Avtalenummer {avtale.avtaleNr}</Ingress>
                                <InfoRad
                                    klasseNavn={cls.element('rad-info')}
                                    radInfo="Bedriftnavn:"
                                    radVerdi={avtale.gjeldendeInnhold.bedriftNavn}
                                />
                                <InfoRad
                                    klasseNavn={cls.element('rad-info')}
                                    radInfo="Virksomhetsnummer:"
                                    radVerdi={avtale.bedriftNr}
                                />
                                <InfoRad
                                    klasseNavn={cls.element('rad-info')}
                                    radInfo="Navn:"
                                    radVerdi={`${avtale.gjeldendeInnhold.deltakerFornavn} ${avtale.gjeldendeInnhold.deltakerEtternavn}`}
                                />
                                <InfoRad
                                    klasseNavn={cls.element('rad-info')}
                                    radInfo="Tiltak:"
                                    radVerdi={tiltakstypeTekst[avtale.tiltakstype]}
                                />

                                <div className={cls.element('lagreKnapp')}>
                                    <LagreKnapp
                                        lagre={() => AvtaleKanEtterrgistreres()}
                                        label={avtale.godkjentForEtterregistrering ? 'Fjern' : 'Godkjenn'}
                                        suksessmelding={
                                            avtale.godkjentForEtterregistrering
                                                ? 'Avtalen er godkjent for etterregistrering'
                                                : 'Fjernet etterregistrering på avtale'
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {feilmelding && (
                            <>
                                <VerticalSpacer rem={1} />
                                <Alert variant="error">{feilmelding}</Alert>
                            </>
                        )}
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
};
export default EtterRegistrering;
