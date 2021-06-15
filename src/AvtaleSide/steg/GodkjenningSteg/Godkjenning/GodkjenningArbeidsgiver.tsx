import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { UfullstendigError } from '@/types/errors';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../Oppsummering/instruks/GodkjenningInstruks';

const GodkjenningArbeidsgiver: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const erLønnstilskudd = ['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(
        avtaleContext.avtale.tiltakstype
    );

    const [bekreftetArbeidsAvtale, setBekreftetArbeidsAvtale] = useState<boolean>(false);
    const [bekreftetGodkjennerInnholdet, setBekreftetGodkjennerInnholdet] = useState(false);

    const feilmeldingManglerBekreftelse = () => {
        if (!bekreftetGodkjennerInnholdet && !bekreftetArbeidsAvtale) {
            return 'Det må bekreftes at arbeidsavtale er inngått og at du forstår kravene før du kan godkjenne.';
        } else if (!bekreftetArbeidsAvtale) {
            return 'Du må bekrefte at det er inngått arbeidsavtale';
        } else {
            return 'Du må bekrefte at du forstår kravene før du kan godkjenne.';
        }
    };

    const sjekkOmLønnstilskuddprosentErfyltUt = () => {
        const felterSomIkkeErFyltUt = avtaleContext.avtale.felterSomIkkeErFyltUt;
        if (felterSomIkkeErFyltUt.length === 1 && felterSomIkkeErFyltUt[0] === 'lonnstilskuddProsent') {
            throw new UfullstendigError(
                'Før du kan godkjenne må veileder sette lønnstilskuddprosent. Avtalen er tilgjengelig for veileder nå.'
            );
        }
    };

    const godkjennAvtalen = () => {
        sjekkOmLønnstilskuddprosentErfyltUt();

        if (bekreftetGodkjennerInnholdet && bekreftetArbeidsAvtale) {
            return avtaleContext.godkjenn();
        } else {
            throw new UfullstendigError(feilmeldingManglerBekreftelse());
        }
    };

    return (
        <Innholdsboks className="godkjenning" ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            {erLønnstilskudd && (
                <BekreftCheckboksPanel
                    onChange={() => setBekreftetArbeidsAvtale(!bekreftetArbeidsAvtale)}
                    checked={bekreftetArbeidsAvtale}
                    label="Jeg bekrefter at det en inngått arbeidsavtale"
                />
            )}

            <BekreftCheckboksPanel
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
