import { AvtaleContext } from '@/AvtaleProvider';
import IkonModal from '@/komponenter/IkonModal/IkonModal';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import * as RestService from '@/services/rest-service';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import VarselTabell from '../Varsellogg/VarselTabell';
import './VarselModal.less';

const cls = BEMHelper('varsel-modal');

const VarselModal: FunctionComponent = () => {
    const [varselModalApen, setVarselModalApen] = useState(false);
    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { avtale } = useContext(AvtaleContext);

    useEffect(() => {
        RestService.hentUlesteBjelleVarslerForAvtale(avtale.id).then(hentedeVarsler => {
            if (hentedeVarsler.length > 0) {
                setVarselModalApen(true);
            }
            setVarsler(hentedeVarsler);
        });
    }, [avtale.id]);

    const lukkOgLesVarsler = async () => {
        const varselIder = varsler.map(v => v.id);
        await RestService.settAlleVarselerTilLest(varselIder);
        setVarselModalApen(false);
    };
    const lukkeOgSeHendelselogg = async () => {
        await lukkOgLesVarsler();
        document.getElementById('varsellogglenke')?.click();
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
            <VarselTabell varsler={varsler} />
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
