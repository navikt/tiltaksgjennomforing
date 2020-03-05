import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Rolle } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Avtale, GodkjentPaVegneGrunner } from '@/types/avtale';
import ArbeidsgiverInstruks from './Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './Oppsummering/instruks/DeltakerInstruks';
import './Godkjenning.less';
import VeilederInstruks from './Oppsummering/instruks/VeilederInstruks';
import GodkjennPaVegneAv from './Oppsummering/GodkjennPaVegneAv/GodkjennPaVegneAv';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { UfullstendigError } from '@/types/errors';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    endreGodkjenning: (godkjent: boolean) => Promise<any>;
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

const Godkjenning: FunctionComponent<Props> = props => {
    const [bekreftet, setBekreftet] = useState(false);
    const [godkjentPaVegneAv, setGodkjentPaVegneAv] = useState(false);
    const [godkjentPaVegneGrunn, setGodkjentPaVegneGrunn] = useState(initState);
    const [paVegneDeltakerInformert, setPaVegneDeltakerInformert] = useState(false);

    const [feilIngenGrunn, setFeilIngenGrunn] = useState<SkjemaelementFeil | undefined>(undefined);
    const [feilDeltakerInformert, setfeilDeltakerInformert] = useState<SkjemaelementFeil | undefined>(undefined);

    const paVegneState = {
        godkjentPaVegneAv: godkjentPaVegneAv,
        setGodkjentPaVegneAv: setGodkjentPaVegneAv,
        setGodkjentPaVegneGrunn: setGodkjentPaVegneGrunn,
        feilIngenGrunn: feilIngenGrunn,
        setFeilIngenGrunn: setFeilIngenGrunn,
        feilDeltakerInformert: feilDeltakerInformert,
        setfeilDeltakerInformert: setfeilDeltakerInformert,
        paVegneDeltakerInformert: paVegneDeltakerInformert,
        setPaVegneDeltakerInformert: setPaVegneDeltakerInformert,
    };

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
        if (!kanLagres) {
            throw new UfullstendigError();
        }
    };
    return (
        <Innholdsboks className="godkjenning">
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            {instruks(props.rolle, props.avtale)}
            {props.rolle !== 'VEILEDER' && (
                <BekreftCheckboksPanel
                    label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                    checked={bekreftet}
                    onChange={() => setBekreftet(!bekreftet)}
                />
            )}
            {props.rolle === 'VEILEDER' && !props.avtale.godkjentAvDeltaker && (
                <GodkjennPaVegneAv godkjentPaVegneGrunn={godkjentPaVegneGrunn} moderState={paVegneState} />
            )}
            <LagreKnapp
                lagre={() => {
                    if (bekreftet || props.rolle === 'VEILEDER') {
                        if (godkjentPaVegneAv) {
                            validerGodkjentPaVegne();
                            return props.godkjennPaVegne(godkjentPaVegneGrunn);
                        }
                        return props.endreGodkjenning(true);
                    } else {
                        throw new UfullstendigError('Du må bekrefte at du forstår kravene før du kan godkjenne.');
                    }
                }}
                label="Godkjenn avtalen"
            />
        </Innholdsboks>
    );
};

export default Godkjenning;
