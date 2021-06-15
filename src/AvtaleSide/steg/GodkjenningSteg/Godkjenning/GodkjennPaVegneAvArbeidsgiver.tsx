import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';

type Props = {
    setskalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvArbeidsgiver: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);

    const [godkjennPaVegneAvArbeidsgiver, setGodkjennPaVegneAvArbeidsgiver] = useState(false);

    const godkjennPaVegneLabel = godkjennPaVegneAvArbeidsgiver
        ? 'Jeg skal godkjenne på vegne av arbeidsgiver, fordi arbeidsgiveren'
        : 'Jeg skal godkjenne på vegne av arbeidsgiver';

    const [klarerIkkeGiFaTilgang, setKlarerIkkeGiFaTilgang] = useState(false);
    const [vetIkkeHvemSomKanGiTilgang, setVetIkkeHvemSomKanGiTilgang] = useState(false);
    const [farIkkeTilgangPersonvern, setFarIkkeTilgangPersonvern] = useState(false);

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<SkjemaelementFeil | undefined>();
    const [feilArbeidsgiverInformert, setFeilArbeidsgiverInformert] = useState<SkjemaelementFeil | undefined>();
    const [arbeidsgiverInformert, setArbeidsgiverInformert] = useState(false);

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunn = klarerIkkeGiFaTilgang || vetIkkeHvemSomKanGiTilgang || farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunn) {
            setFeilmeldingGrunn({ feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver' });
            return;
        } else {
            setFeilmeldingGrunn(undefined);
        }
        if (!arbeidsgiverInformert) {
            setFeilArbeidsgiverInformert({
                feilmelding: 'Arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            return;
        } else {
            setFeilArbeidsgiverInformert(undefined);
        }
        return avtaleContext.godkjennPaVegneAvArbeidsgiver({
            farIkkeTilgangPersonvern,
            klarerIkkeGiFaTilgang,
            vetIkkeHvemSomKanGiTilgang,
        });
    };

    return (
        <>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={godkjennPaVegneAvArbeidsgiver}
                onChange={e => {
                    props.setskalGodkjennesPaVegne(e.currentTarget.checked);
                    setGodkjennPaVegneAvArbeidsgiver(e.currentTarget.checked);
                }}
            />

            {godkjennPaVegneAvArbeidsgiver && (
                <>
                    <div style={{ marginLeft: '1rem' }}>
                        <SkjemaGruppe feil={feilmeldingGrunn}>
                            <Checkbox
                                label="klarer ikke få eller gi tilgang"
                                checked={klarerIkkeGiFaTilgang}
                                onChange={event => setKlarerIkkeGiFaTilgang(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="vet ikke hvem som kan gi tilgang"
                                checked={vetIkkeHvemSomKanGiTilgang}
                                onChange={event => setVetIkkeHvemSomKanGiTilgang(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="får ikke tilgang på grunn av personvern"
                                checked={farIkkeTilgangPersonvern}
                                onChange={event => setFarIkkeTilgangPersonvern(event.currentTarget.checked)}
                            />
                        </SkjemaGruppe>
                    </div>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilArbeidsgiverInformert}>
                        <Checkbox
                            label="Deltakeren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={arbeidsgiverInformert}
                            onChange={() => setArbeidsgiverInformert(!arbeidsgiverInformert)}
                        />
                    </SkjemaGruppe>
                </>
            )}
            <VerticalSpacer rem={1} />

            {godkjennPaVegneAvArbeidsgiver && <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
            <VerticalSpacer rem={1} />
        </>
    );
};

export default GodkjennPaVegneAvArbeidsgiver;
