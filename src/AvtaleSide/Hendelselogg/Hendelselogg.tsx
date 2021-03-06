import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import HendelseIkon from '@/komponenter/HendelseIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hendelseTekst } from '@/messages';
import { hentHendelselogg } from '@/services/rest-service';
import { Hendelse } from '@/types/hendelse';
import { Nettressurs, Status } from '@/types/nettressurs';
import BEMHelper from '@/utils/bem';
import { formatterDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import moment from 'moment';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import 'nav-frontend-tabell-style';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Hendelselogg.less';

const cls = BEMHelper('hendelselogg');

const Hendelselogg: FunctionComponent = () => {
    const [hendelseLoggModalApen, setHendelseLoggModalApen] = useState<boolean>(false);
    const [hendelser, setHendelser] = useState<Nettressurs<Hendelse[]>>({ status: Status.IkkeLastet });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setHendelser({ status: Status.LasterInn });
        // Hent nye hendelser når loggen åpnes.
        if (hendelseLoggModalApen) {
            hentHendelselogg(avtaleContext.avtale.id)
                .then((data: Hendelse[]) => setHendelser({ status: Status.Lastet, data }))
                .catch((error: Error) => setHendelser({ status: Status.Feil, error: error }));
        }
    }, [avtaleContext.avtale.id, hendelseLoggModalApen]);

    const formaterTid = (tidspunkt: string) => {
        const antallTimerSiden = moment(moment()).diff(tidspunkt, 'hours');
        if (antallTimerSiden > 12) {
            return formatterDato(tidspunkt);
        } else {
            return moment(tidspunkt).fromNow();
        }
    };

    return (
        <>
            <Lenke
                id="hendelselogglenke"
                onClick={() => setHendelseLoggModalApen(true)}
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
                isOpen={hendelseLoggModalApen}
                onRequestClose={() => setHendelseLoggModalApen(false)}
                closeButton={true}
                contentLabel="Hendelseloggmodal"
                className={cls.element('modal')}
                aria={{
                    modal: hendelseLoggModalApen,
                    labelledby: 'heading',
                    describedby: 'hendelselogg for endringsaktiviteter i applikasjonen',
                }}
                ariaHideApp={hendelseLoggModalApen}
            >
                <Systemtittel role="heading" id="heading">
                    Hendelselogg
                </Systemtittel>
                <VerticalSpacer rem={1} />
                {moment(avtaleContext.avtale.opprettetTidspunkt).isBefore('2020-09-10') && (
                    <>
                        <AlertStripeInfo>
                            Denne avtalen ble opprettet før hendelssloggen ble innført og vil være mangelfull.
                        </AlertStripeInfo>
                        <VerticalSpacer rem={1} />
                    </>
                )}
                {hendelser.status === Status.Lastet && hendelser.data.length > 0 && (
                    <table className="tabell" aria-label="tabell" aria-labelledby="Hendelselogg tabell" role="table">
                        <thead>
                            <tr role="row">
                                <th scope="col" role="columnheader" id="tidspunkt">
                                    Tidspunkt
                                </th>
                                <th scope="col" role="columnheader" id="hendelse">
                                    Hendelse
                                </th>
                                <th scope="col" role="columnheader" id="utført_av">
                                    Utført av
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hendelser.data.map((hendelse, index) => (
                                <tr key={index} role="row">
                                    <td role="cell" aria-labelledby="tidspunkt">
                                        {formaterTid(hendelse.tidspunkt)}
                                    </td>
                                    <td role="cell">
                                        <div style={{ display: 'flex' }} aria-labelledby="hendelse">
                                            <span className={cls.element('hendelse-ikon')} aria-hidden="true">
                                                <HendelseIkon hendelse={hendelse.hendelse} />
                                            </span>
                                            {hendelseTekst[hendelse.hendelse]}
                                        </div>
                                    </td>
                                    <td role="cell" aria-labelledby="utført_av">
                                        {storForbokstav(hendelse.utførtAv)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {hendelser.status === Status.LasterInn && (
                    <NavFrontendSpinner type="XL" className={cls.element('spinner')} />
                )}
                {hendelser.status === Status.Feil && (
                    <Normaltekst>Klarte ikke hente hendelselogg. Prøv igjen senere.</Normaltekst>
                )}
            </Modal>
        </>
    );
};

export default Hendelselogg;
