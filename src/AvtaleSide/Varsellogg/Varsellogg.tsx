import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import HendelseIkon from '@/komponenter/HendelseIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentAvtaleVarsler } from '@/services/rest-service';
import { Varsel } from '@/types/varsel';
import { Nettressurs, Status } from '@/types/nettressurs';
import BEMHelper from '@/utils/bem';
import { formatterDato } from '@/utils/datoUtils';
import moment from 'moment';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import 'nav-frontend-tabell-style';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Varsellogg.less';
import { storForbokstav } from '@/utils/stringUtils';

const cls = BEMHelper('varsellogg');

const Varsellogg: FunctionComponent = () => {
    const [varselLoggModalApen, setVarselLoggModalApen] = useState<boolean>(false);
    const [varsler, setVarsler] = useState<Nettressurs<Varsel[]>>({ status: Status.IkkeLastet });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setVarsler({ status: Status.LasterInn });
        // Hent nye varselr når loggen åpnes.
        if (varselLoggModalApen) {
            hentAvtaleVarsler(avtaleContext.avtale.id)
                .then((data: Varsel[]) => setVarsler({ status: Status.Lastet, data }))
                .catch((error: Error) => setVarsler({ status: Status.Feil, error: error }));
        }
    }, [avtaleContext.avtale.id, varselLoggModalApen]);

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
                id="varsellogglenke"
                onClick={() => setVarselLoggModalApen(true)}
                href="#"
                className={cls.element('menylenke')}
                role="menuitem"
            >
                <div aria-hidden={true}>
                    <BurgerMenyIkon className={cls.element('burger-ikon')} />
                </div>
                Varsellogg
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
                <Systemtittel role="heading" id="heading">
                    Varsellogg
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
                {varsler.status === Status.Lastet && varsler.data.length > 0 && (
                    <table className="tabell" aria-label="tabell" aria-labelledby="Varsellogg tabell" role="table">
                        <thead>
                            <tr role="row">
                                <th scope="col" role="columnheader" id="tidspunkt">
                                    Tidspunkt
                                </th>
                                <th scope="col" role="columnheader" id="varsel">
                                    Varsel
                                </th>
                                <th scope="col" role="columnheader" id="utført_av">
                                    Utført av
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {varsler.data.map((varsel, index) => (
                                <tr key={index} role="row">
                                    <td role="cell" aria-labelledby="tidspunkt">
                                        {formaterTid(varsel.tidspunkt)}
                                    </td>
                                    <td role="cell">
                                        <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                            <span className={cls.element('varsel-ikon')} aria-hidden="true">
                                                <HendelseIkon hendelse={varsel.varslbarHendelseType} />
                                            </span>
                                            {varsel.varslingstekst}
                                        </div>
                                    </td>
                                    <td role="cell" aria-labelledby="utført_av">
                                        {storForbokstav(varsel.utførtAv)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {varsler.status === Status.LasterInn && (
                    <NavFrontendSpinner type="XL" className={cls.element('spinner')} />
                )}
                {varsler.status === Status.Feil && (
                    <Normaltekst>Klarte ikke hente varsellogg. Prøv igjen senere.</Normaltekst>
                )}
            </Modal>
        </>
    );
};

export default Varsellogg;
