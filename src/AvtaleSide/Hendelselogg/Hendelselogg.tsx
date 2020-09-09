import { ReactComponent as ArkIkon } from '@/assets/ikoner/ark.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/avbrutt-avtale.svg';
import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { ReactComponent as EndretIkon } from '@/assets/ikoner/endret.svg';
import { ReactComponent as LastOppIkon } from '@/assets/ikoner/hengelas-apen.svg';
import { ReactComponent as OpphevetIkon } from '@/assets/ikoner/opphevet-godkjenninger.svg';
import { ReactComponent as GodkjentIkon } from '@/assets/ikoner/sirkel-check.svg';
import { ReactComponent as GjenopprettIkon } from '@/assets/ikoner/synchronize-4.svg';
import { AvtaleContext } from '@/AvtaleContext';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hendelseTekst } from '@/messages';
import { hentHendelselogg } from '@/services/rest-service';
import { Hendelse, HendelseType } from '@/types/hendelse';
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
    const [hendelseLoggModalApen, setHendelseLoggModalApen] = useState(false);
    const [hendelser, setHendelser] = useState<Nettressurs<Hendelse[]>>({ status: Status.IkkeLastet });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setHendelser({ status: Status.LasterInn });
        //Hent nye hendelser når loggen åpnes.
        if (hendelseLoggModalApen)
            hentHendelselogg(avtaleContext.avtale.id)
                .then((data: any) => setHendelser({ status: Status.Lastet, data }))
                .catch((error: any) => setHendelser({ status: Status.Feil, error: error.message }));
    }, [avtaleContext.avtale.id, hendelseLoggModalApen]);

    const hendelsesIkon: { [key in HendelseType]: JSX.Element } = {
        ENDRET: <EndretIkon />,
        OPPRETTET: <ArkIkon />,
        GODKJENT_AV_ARBEIDSGIVER: <GodkjentIkon />,
        GODKJENT_AV_DELTAKER: <GodkjentIkon />,
        GODKJENT_AV_VEILEDER: <GodkjentIkon />,
        GODKJENT_PAA_VEGNE_AV: <GodkjentIkon />,
        LÅST_OPP: <LastOppIkon />,
        AVBRUTT: <AvbruttIkon />,
        GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER: <OpphevetIkon />,
        GODKJENNINGER_OPPHEVET_AV_VEILEDER: <OpphevetIkon />,
        DELT_MED_ARBEIDSGIVER: <></>,
        DELT_MED_DELTAKER: <></>,
        SMS_VARSLING_FEILET: <></>,
        GJENOPPRETTET: <GjenopprettIkon />,
    };

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
            <Lenke onClick={() => setHendelseLoggModalApen(true)} href="#" className={cls.element('menylenke')}>
                <BurgerMenyIkon className={cls.element('burger-ikon')} />
                Hendelselogg
            </Lenke>

            <Modal
                isOpen={hendelseLoggModalApen}
                onRequestClose={() => setHendelseLoggModalApen(false)}
                closeButton={true}
                contentLabel="Hendelseloggmodal"
                className={cls.element('modal')}
            >
                <Systemtittel>Hendelselogg</Systemtittel>
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
                    <table className="tabell">
                        <thead>
                            <tr>
                                <th>Tidspunkt</th>
                                <th>Hendelse</th>
                                <th>Utført av</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hendelser.data.map(h => (
                                <tr>
                                    <td>{formaterTid(h.tidspunkt)}</td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <span className={cls.element('hendelse-ikon')}>
                                                {hendelsesIkon[h.hendelse]}
                                            </span>
                                            {hendelseTekst[h.hendelse]}
                                        </div>
                                    </td>
                                    <td>{storForbokstav(h.utførtAv)}</td>
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
