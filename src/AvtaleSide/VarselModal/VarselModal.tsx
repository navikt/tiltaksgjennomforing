import { AvtaleContext } from '@/AvtaleProvider';
import HendelseIkon from '@/komponenter/HendelseIkon';
import IkonModal from '@/komponenter/IkonModal/IkonModal';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import * as RestService from '@/services/rest-service';
import { settAlleVarselerTilLest } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './VarselModal.less';
import { Varsel } from '@/types/varsel';

const cls = BEMHelper('varsel-modal');

const VarselModal: FunctionComponent = () => {
    const [varselModalApen, setVarselModalApen] = useState(false);
    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { avtale } = useContext(AvtaleContext);

    useEffect(() => {
        RestService.hentAvtaleVarsler(avtale.id).then(hentedeVarsler => {
            const varselSomSkalIModal = hentedeVarsler
                .filter(varsel => varsel.varslbarStatus === 'VARSEL')
                .filter(varsel => !varsel.lest);
            if (varselSomSkalIModal.length > 0) {
                setVarselModalApen(true);
            }
            setVarsler(varselSomSkalIModal);
        });
    }, [avtale.id]);

    const lukkOgLesVarsler = async () => {
        const varselIder = varsler.map(v => v.id);
        await settAlleVarselerTilLest(varselIder);
        setVarselModalApen(false);
    };
    const lukkeOgSeHendelselogg = async () => {
        await lukkOgLesVarsler();
        document.getElementById('hendelselogglenke')?.click();
    };

    return (
        <IkonModal
            isOpen={varselModalApen}
            closeButton={true}
            contentLabel="varselmodal"
            onRequestClose={lukkOgLesVarsler}
            className={cls.element('modal')}
        >
            <Systemtittel>Det har skjedd endringer i avtalen</Systemtittel>
            <VerticalSpacer rem={2} />
            <table className="tabell">
                <tbody>
                    {varsler.map(v => (
                        <tr key={v.id}>
                            <td>
                                <div style={{ display: 'flex' }}>
                                    <span className={cls.element('hendelse-ikon')}>
                                        <HendelseIkon hendelse={v.varslbarHendelseType} />
                                    </span>
                                    {v.varslingstekst}
                                </div>
                            </td>
                            <td style={{ textAlign: 'end' }}>{moment(v.tidspunkt).fromNow()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <VerticalSpacer rem={2} />
            <div>
                <Hovedknapp style={{ marginRight: '1rem' }} onClick={lukkOgLesVarsler}>
                    Lukk
                </Hovedknapp>
                <Knapp onClick={lukkeOgSeHendelselogg}>Se alle endringer</Knapp>
            </div>
        </IkonModal>
    );
};

export default VarselModal;
