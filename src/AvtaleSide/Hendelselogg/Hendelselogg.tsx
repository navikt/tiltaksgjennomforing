import { ReactComponent as ArkIkon } from '@/assets/ikoner/ark.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/avbrutt-avtale.svg';
import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { ReactComponent as EndretIkon } from '@/assets/ikoner/endret.svg';
import { ReactComponent as LastOppIkon } from '@/assets/ikoner/hengelas-apen.svg';
import { ReactComponent as OpphevetIkon } from '@/assets/ikoner/opphevet-godkjenninger.svg';
import { ReactComponent as GodkjentIkon } from '@/assets/ikoner/sirkel-check.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hendelseTekst } from '@/messages';
import { hentHendelselogg } from '@/services/rest-service';
import { Hendelse, HendelseType } from '@/types/hendelse';
import BEMHelper from '@/utils/bem';
import { formatterDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import 'nav-frontend-tabell-style';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Hendelselogg.less';

const cls = BEMHelper('hendelselogg');

const Hendelselogg: FunctionComponent = () => {
    const [hendelseLoggModalApen, setHendelseLoggModalApen] = useState(false);
    const [hendelser, setHendelser] = useState<Hendelse[]>([]);
    const { avtaleId } = useParams();

    useEffect(() => {
        //Hent nye hendelser når loggen åpnes.
        if (hendelseLoggModalApen) hentHendelselogg(avtaleId).then(setHendelser);
    }, [avtaleId, hendelseLoggModalApen]);

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
                {hendelser.length ? (
                    <table className="tabell">
                        <thead>
                            <tr>
                                <th>Tidspunkt</th>
                                <th>Hendelse</th>
                                <th>Utført av</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hendelser.map(h => (
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
                ) : (
                    <NavFrontendSpinner type="XL" className={cls.element('spinner')} />
                )}
            </Modal>
        </>
    );
};

export default Hendelselogg;
