import React from 'react';
import BEMHelper from '@/utils/bem';
import { Label } from '@navikt/ds-react';

import { Avtale } from '@/types/avtale';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';

import '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/instruks.less';

import GenerelVeilederTekst from './tekster/GenerelVeilederTekst';
import LonnstilskuddVeilederTekst from './tekster/LonnstilskuddVeilederTekst';
import SommerjobbVeilederTekst from './tekster/SommerjobbVeilederTekst';
import ArbeidstreningVeilederTekst from './tekster/ArbeidstreningVeilederTekst';
import VTAOVeilederTekst from './tekster/VTAOVeilederTekst';
import MentorVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/MentorVeilederTekst';

const cls = BEMHelper('instruks');

interface Props {
    avtale: Avtale;
}

const VeilederInstruks = (props: Props) => {
    const { tiltakstype } = props.avtale;

    if (tiltakstype === 'SOMMERJOBB') {
        return (
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Label>Hva skjer videre:</Label>
                </div>
                <SommerjobbVeilederTekst />
            </VeilederpanelMedUtklippstavle>
        );
    }

    if (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'VARIG_LONNSTILSKUDD') {
        return (
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Label>Hva skjer videre:</Label>
                </div>
                <LonnstilskuddVeilederTekst />
            </VeilederpanelMedUtklippstavle>
        );
    }

    if (tiltakstype === 'ARBEIDSTRENING') {
        return (
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Label>Hva skjer videre:</Label>
                </div>
                <ArbeidstreningVeilederTekst />
            </VeilederpanelMedUtklippstavle>
        );
    }

    if (tiltakstype === 'VTAO') {
        return (
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Label>Hva skjer videre:</Label>
                </div>
                <VTAOVeilederTekst />
            </VeilederpanelMedUtklippstavle>
        );
    }

    if (tiltakstype === 'MENTOR') {
        return (
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Label>Hva skjer videre:</Label>
                </div>
                <MentorVeilederTekst />
            </VeilederpanelMedUtklippstavle>
        );
    }
    return (
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader')}>
                <Label>Hva skjer videre:</Label>
            </div>
            <GenerelVeilederTekst tiltakstype={tiltakstype} />
        </VeilederpanelMedUtklippstavle>
    );
};

export default VeilederInstruks;
