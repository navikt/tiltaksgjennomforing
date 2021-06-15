import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';

type Props = {
    setskalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvDeltaker: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);
    const [godkjennPaVegneAvDeltaker, setGodkjennPaVegneAvDeltaker] = useState(false);
    const godkjennPaVegneLabel = godkjennPaVegneAvDeltaker
        ? 'Jeg skal godkjenne på vegne av deltakeren, fordi deltakeren'
        : 'Jeg skal godkjenne på vegne av deltakeren';

    const [ikkeBankId, setIkkeBankId] = useState(false);
    const [reservert, setReservert] = useState(false);
    const [digitalKompetanse, setDigitalKompetanse] = useState(false);

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<SkjemaelementFeil | undefined>();
    const [deltakerInformert, setDeltakerInformert] = useState(false);
    const [feilDeltakerInformert, setFeilDeltakerInformert] = useState<SkjemaelementFeil | undefined>();

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunn = ikkeBankId || reservert || digitalKompetanse;
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
        return avtaleContext.godkjennPaVegne({ digitalKompetanse, ikkeBankId, reservert });
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
                        <SkjemaGruppe feil={feilmeldingGrunn}>
                            <Checkbox
                                label="ikke BankID"
                                checked={ikkeBankId}
                                onChange={event => setIkkeBankId(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="har reservert seg mot digitale tjenester"
                                checked={reservert}
                                onChange={event => setReservert(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="mangler digital kompetanse"
                                checked={digitalKompetanse}
                                onChange={event => setDigitalKompetanse(event.currentTarget.checked)}
                            />
                        </SkjemaGruppe>
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
            <VerticalSpacer rem={1} />
        </>
    );
};

export default GodkjennPaVegneAvDeltaker;
