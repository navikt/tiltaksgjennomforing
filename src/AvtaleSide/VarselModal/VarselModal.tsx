import { AvtaleContext } from '@/AvtaleProvider';
import IkonModal from '@/komponenter/IkonModal/IkonModal';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import * as RestService from '@/services/rest-service';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import VarselTabell from '../Varsellogg/VarselTabell';
import './VarselModal.less';

const cls = BEMHelper('varsel-modal');

const VarselModal: FunctionComponent = () => {
    const [varselModalApen, setVarselModalApen] = useState(false);
    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const { avtale } = useContext(AvtaleContext);

    const harOpprettetHendelse =
        varsler.find(v => v.hendelseType === 'OPPRETTET' || v.hendelseType === 'OPPRETTET_AV_ARBEIDSGIVER') !==
        undefined;

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
            <Systemtittel>{harOpprettetHendelse ? 'Hendelselogg' : 'Nye hendelser'}</Systemtittel>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                {harOpprettetHendelse
                    ? 'Tabellen under viser hendelser som har skjedd på avtalen. '
                    : 'Tabellen under viser hendelser som har skjedd siden sist gang du åpnet avtalen. '}
                Hendelseloggen finner du igjen under menyen på toppen av avtalen.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <VarselTabell varsler={varsler} />
            <VerticalSpacer rem={2} />
            <div>
                <LagreKnapp lagre={lukkOgLesVarsler} label="Lukk" />
                {!harOpprettetHendelse && (
                    <Knapp style={{ marginLeft: '1rem' }} onClick={lukkeOgSeHendelselogg}>Se alle hendelser for denne avtalen</Knapp>
                )}
            </div>
        </IkonModal>
    );
};

export default VarselModal;
