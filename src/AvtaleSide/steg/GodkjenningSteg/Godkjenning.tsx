import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, GodkjentPaVegneGrunner } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import { Rolle } from '@/types/innlogget-bruker';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { FunctionComponent, useState } from 'react';
import './Godkjenning.less';
import GodkjennPaVegneAv from './Oppsummering/GodkjennPaVegneAv/GodkjennPaVegneAv';
import ArbeidsgiverInstruks from './Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './Oppsummering/instruks/DeltakerInstruks';
import VeilederInstruks from './Oppsummering/instruks/VeilederInstruks';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    godkjenn: () => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
}

const harGodkjentSelv = (avtale: Avtale, rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return avtale.godkjentAvDeltaker;
        case 'ARBEIDSGIVER':
            return avtale.godkjentAvArbeidsgiver;
        case 'VEILEDER':
            return avtale.godkjentAvVeileder;
        default:
            return false;
    }
};

const instruks = (rolle: Rolle, avtale: Avtale) => {
    switch (rolle) {
        case 'DELTAKER':
            return <DeltakerInstruks erLaast={avtale.erLaast} tiltakstype={avtale.tiltakstype} />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverInstruks erLaast={avtale.erLaast} tiltakstype={avtale.tiltakstype} />;
        case 'VEILEDER':
            return <VeilederInstruks tiltakstype={avtale.tiltakstype} />;
    }
};

const initState: GodkjentPaVegneGrunner = {
    digitalKompetanse: false,
    ikkeBankId: false,
    reservert: false,
};

const feilmeldinger = {
    arbeidsavtaleOgBekreftelseMangler:
        'Det må bekreftes at arbeidsavtale er inngått og at du forstår kravene før du kan godkjenne.',
    bekreftelse: 'Du må bekrefte at du forstår kravene før du kan godkjenne.',
    arbeidsavtaleMaInnga: 'Du må bekrefte at det er inngått arbeidsavtale',
};

const Godkjenning: FunctionComponent<Props> = props => {
    const slipperBekrefteArbeidsavtale =
        !(
            props.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
            props.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD'
        ) || props.rolle !== 'ARBEIDSGIVER';

    const erVeileder = props.rolle === 'VEILEDER';

    const [bekreftet, setBekreftet] = useState<boolean>(erVeileder);
    const [bekreftetArbeidsAvtale, setBekreftetArbeidsAvtale] = useState<boolean>(slipperBekrefteArbeidsavtale);
    const [godkjentPaVegneAv, setGodkjentPaVegneAv] = useState<boolean>(false);
    const [paVegneDeltakerInformert, setPaVegneDeltakerInformert] = useState<boolean>(false);
    const [godkjentPaVegneGrunn, setGodkjentPaVegneGrunn] = useState<GodkjentPaVegneGrunner>(initState);

    const [feilIngenGrunn, setFeilIngenGrunn] = useState<SkjemaelementFeil | undefined>(undefined);
    const [feilDeltakerInformert, setfeilDeltakerInformert] = useState<SkjemaelementFeil | undefined>(undefined);

    const paVegneState = {
        godkjentPaVegneAv,
        setGodkjentPaVegneAv,
        setGodkjentPaVegneGrunn,
        feilIngenGrunn,
        setFeilIngenGrunn,
        feilDeltakerInformert,
        setfeilDeltakerInformert,
        paVegneDeltakerInformert,
        setPaVegneDeltakerInformert,
    };

    const feilmeldingManglerBekreftelse = (): string =>
        !bekreftet && !bekreftetArbeidsAvtale
            ? feilmeldinger.arbeidsavtaleOgBekreftelseMangler
            : !bekreftetArbeidsAvtale
            ? feilmeldinger.arbeidsavtaleMaInnga
            : feilmeldinger.bekreftelse;

    if (harGodkjentSelv(props.avtale, props.rolle)) {
        return null;
    }
    const valgtEnGrunn = () => {
        if (!godkjentPaVegneGrunn) {
            return false;
        }
        return (
            godkjentPaVegneGrunn.ikkeBankId || godkjentPaVegneGrunn.reservert || godkjentPaVegneGrunn.digitalKompetanse
        );
    };

    const validerGodkjentPaVegne = () => {
        let kanLagres = true;
        if (!valgtEnGrunn()) {
            setFeilIngenGrunn({
                feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av deltaker',
            });
            kanLagres = false;
        }
        if (!paVegneDeltakerInformert) {
            setfeilDeltakerInformert({
                feilmelding: 'Deltaker må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            kanLagres = false;
        }
        return kanLagres;
    };
    return (
        <Innholdsboks className="godkjenning">
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            {instruks(props.rolle, props.avtale)}
            {!slipperBekrefteArbeidsavtale && (
                <BekreftCheckboksPanel
                    onChange={() => setBekreftetArbeidsAvtale(!bekreftetArbeidsAvtale)}
                    checked={bekreftetArbeidsAvtale}
                    label="Jeg bekrefter at det en inngått arbeidsavtale"
                />
            )}
            {!erVeileder && (
                <>
                    <BekreftCheckboksPanel
                        label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                        checked={bekreftet}
                        onChange={() => setBekreftet(!bekreftet)}
                    />
                    <VerticalSpacer rem={1.5} />
                </>
            )}
            {erVeileder && !props.avtale.godkjentAvDeltaker && (
                <GodkjennPaVegneAv godkjentPaVegneGrunn={godkjentPaVegneGrunn} moderState={paVegneState} />
            )}
            {props.rolle !== 'ARBEIDSGIVER' && props.avtale.harFamilietilknytning && (
                <>
                    <AlertStripeAdvarsel>
                        OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}
            <LagreKnapp
                lagre={() => {
                    if (
                        props.rolle === 'ARBEIDSGIVER' &&
                        props.avtale.felterSomIkkeErFyltUt.length === 1 &&
                        props.avtale.felterSomIkkeErFyltUt[0] === 'lonnstilskuddProsent'
                    ) {
                        throw new UfullstendigError(
                            'Før du kan godkjenne må veileder sette lønnstilskuddprosent. Avtalen er tilgjengelig for veileder nå.'
                        );
                    }
                    if (bekreftet && bekreftetArbeidsAvtale) {
                        if (godkjentPaVegneAv) {
                            if (!validerGodkjentPaVegne()) {
                                return;
                            }
                            return props.godkjennPaVegne(godkjentPaVegneGrunn);
                        }
                        return props.godkjenn();
                    } else {
                        throw new UfullstendigError(feilmeldingManglerBekreftelse());
                    }
                }}
                label=" Godkjenn avtalen"
            />
        </Innholdsboks>
    );
};

export default Godkjenning;
