import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import GodkjennPåVegneAvDeltakerCheckboxer from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjennPåVegneAvDeltakerCheckboxer';

type Props = {
    setskalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvDeltaker: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);
    const [godkjennPaVegneAvDeltaker, setGodkjennPaVegneAvDeltaker] = useState(false);
    const godkjennPaVegneLabel = godkjennPaVegneAvDeltaker
        ? 'Jeg skal godkjenne på vegne av deltakeren, fordi deltakeren'
        : 'Jeg skal godkjenne på vegne av deltakeren';

    const [godkjentPåVegneAvGrunner, setGodkjentPåVegneAvGrunner] = useState<GodkjentPaVegneAvDeltakerGrunner>({
        digitalKompetanse: false,
        reservert: false,
        ikkeBankId: false,
    });

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<SkjemaelementFeil>();
    const [deltakerInformert, setDeltakerInformert] = useState(false);
    const [feilDeltakerInformert, setFeilDeltakerInformert] = useState<SkjemaelementFeil>();

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunn =
            godkjentPåVegneAvGrunner.ikkeBankId ||
            godkjentPåVegneAvGrunner.reservert ||
            godkjentPåVegneAvGrunner.digitalKompetanse;
        if (!valgtMinstEnGrunn) {
            setFeilmeldingGrunn({ feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av deltaker' });
            return;
        } else {
            setFeilmeldingGrunn(undefined);
        }
        if (!deltakerInformert) {
            setFeilDeltakerInformert({
                feilmelding: 'Deltaker må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            return;
        } else {
            setFeilDeltakerInformert(undefined);
        }
        return avtaleContext.godkjennPaVegneAvDeltaker(godkjentPåVegneAvGrunner!);
    };

    return (
        <>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={godkjennPaVegneAvDeltaker}
                onChange={e => {
                    props.setskalGodkjennesPaVegne(e.currentTarget.checked);
                    setGodkjennPaVegneAvDeltaker(e.currentTarget.checked);
                }}
            />

            {godkjennPaVegneAvDeltaker && (
                <>
                    <div style={{ marginLeft: '1rem' }}>
                        <GodkjennPåVegneAvDeltakerCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunner}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunner}
                            feilmeldingGrunn={feilmeldingGrunn}
                            setFeilmeldingGrunn={setFeilmeldingGrunn}
                        />
                    </div>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilDeltakerInformert}>
                        <Checkbox
                            label="Deltakeren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={deltakerInformert}
                            onChange={() => setDeltakerInformert(!deltakerInformert)}
                        />
                    </SkjemaGruppe>
                </>
            )}
            {godkjennPaVegneAvDeltaker && <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
            <VerticalSpacer rem={1} />
        </>
    );
};

export default GodkjennPaVegneAvDeltaker;
