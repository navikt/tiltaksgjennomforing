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

const cls = BEMHelper('instruks');

interface Props {
    avtale: Avtale;
}

const VeilederInstruks = (props: Props) => {
    const { tiltakstype, opphav } = props.avtale;

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
                <ArbeidstreningVeilederTekst tiltakstype={tiltakstype} opphav={opphav} />
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
