import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { UfullstendigError } from '@/types/errors';
import { ConfirmationPanel } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../../Oppsummering/instruks/GodkjenningInstruks';
import BEMHelper from '@/utils/bem';

const GodkjenningArbeidsgiver: FunctionComponent = () => {
    const { avtale, godkjenn } = useContext(AvtaleContext);
    const cls = BEMHelper('godkjenning');
    const erLønnstilskuddEllerSommerjobb = ['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'SOMMERJOBB'].includes(
        avtale.tiltakstype
    );

    const [bekreftetArbeidsAvtale, setBekreftetArbeidsAvtale] = useState<boolean>(false);
    const [bekreftetGodkjennerInnholdet, setBekreftetGodkjennerInnholdet] = useState(false);

    const feilmeldingManglerBekreftelse = () => {
        if (!erLønnstilskuddEllerSommerjobb) {
            if (!bekreftetGodkjennerInnholdet) {
                return 'Du må bekrefte at du forstår kravene før du kan godkjenne.';
            }
        } else {
            if (!bekreftetGodkjennerInnholdet || !bekreftetArbeidsAvtale) {
                return 'Det må bekreftes at arbeidsavtale er inngått og at du forstår kravene før du kan godkjenne.';
            }
        }

        return '';
    };

    const sjekkOmLønnstilskuddprosentErfyltUt = () => {
        const felterSomIkkeErFyltUt = avtale.felterSomIkkeErFyltUt;
        if (felterSomIkkeErFyltUt.length === 1 && felterSomIkkeErFyltUt[0] === 'lonnstilskuddProsent') {
            throw new UfullstendigError(
                'Før du kan godkjenne må veileder sette lønnstilskuddprosent. Avtalen er tilgjengelig for veileder nå.'
            );
        }
    };

    const godkjennAvtalen = () => {
        sjekkOmLønnstilskuddprosentErfyltUt();
        const feilmelding = feilmeldingManglerBekreftelse();
        if (!feilmelding) {
            return godkjenn();
        } else {
            throw new UfullstendigError(feilmelding);
        }
    };

    return (
        <Innholdsboks className={cls.className} ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            {erLønnstilskuddEllerSommerjobb && (
                <ConfirmationPanel
                    onChange={() => setBekreftetArbeidsAvtale(!bekreftetArbeidsAvtale)}
                    checked={bekreftetArbeidsAvtale}
                    label="Jeg bekrefter at det en inngått arbeidsavtale"
                />
            )}
            <VerticalSpacer rem={1.5} />
            <ConfirmationPanel
                label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                checked={bekreftetGodkjennerInnholdet}
                onChange={() => setBekreftetGodkjennerInnholdet(!bekreftetGodkjennerInnholdet)}
            />
            <VerticalSpacer rem={1.5} />

            <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />
        </Innholdsboks>
    );
};

export default GodkjenningArbeidsgiver;
