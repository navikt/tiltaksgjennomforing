import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentVarsellogg } from '@/services/rest-service';
import { Nettressurs, Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import 'nav-frontend-tabell-style';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Varsellogg.less';
import VarselTabell from './VarselTabell';

const cls = BEMHelper('varsellogg');

const Varsellogg: FunctionComponent = () => {
    const [varselLoggModalApen, setVarselLoggModalApen] = useState<boolean>(false);
    const [varsler, setVarsler] = useState<Nettressurs<Varsel[]>>({ status: Status.IkkeLastet });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setVarsler({ status: Status.LasterInn });
        // Hent nye varselr når loggen åpnes.
        if (varselLoggModalApen) {
            hentVarsellogg(avtaleContext.avtale.id)
                .then((data: Varsel[]) => setVarsler({ status: Status.Lastet, data }))
                .catch((error: Error) => setVarsler({ status: Status.Feil, error: error }));
        }
    }, [avtaleContext.avtale.id, varselLoggModalApen]);

    return (
        <>
            <Lenke
                id="varsellogglenke"
                onClick={() => setVarselLoggModalApen(true)}
                href="#"
                className={cls.element('menylenke')}
                role="menuitem"
            >
                <div aria-hidden={true}>
                    <BurgerMenyIkon className={cls.element('burger-ikon')} />
                </div>
                Hendelselogg
            </Lenke>

            <Modal
                isOpen={varselLoggModalApen}
                onRequestClose={() => setVarselLoggModalApen(false)}
                closeButton={true}
                contentLabel="Varselloggmodal"
                className={cls.element('modal')}
                aria={{
                    modal: varselLoggModalApen,
                    labelledby: 'heading',
                    describedby: 'varsellogg for endringsaktiviteter i applikasjonen',
                }}
                ariaHideApp={varselLoggModalApen}
            >
                <Systemtittel role="heading" id="heading" aria-level={1}>
                    Hendelselogg
                </Systemtittel>
                <VerticalSpacer rem={1} />
                {moment(avtaleContext.avtale.opprettetTidspunkt).isBefore('2020-09-10') && (
                    <>
                        <AlertStripeInfo>
                            Denne avtalen ble opprettet før hendelsesloggen ble innført og vil være mangelfull.
                        </AlertStripeInfo>
                        <VerticalSpacer rem={1} />
                    </>
                )}
                {varsler.status === Status.Lastet && varsler.data.length > 0 && <VarselTabell varsler={varsler.data} />}
                {varsler.status === Status.LasterInn && (
                    <NavFrontendSpinner type="XL" className={cls.element('spinner')} />
                )}
                {varsler.status === Status.Feil && (
                    <Normaltekst>Klarte ikke hente hendelselogg. Prøv igjen senere.</Normaltekst>
                )}
            </Modal>
        </>
    );
};

export default Varsellogg;
