import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';

type Props = {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvArbeidsgiver: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);

    const godkjennPaVegneLabel = props.skalGodkjennesPaVegne
        ? 'Jeg skal godkjenne på vegne av arbeidsgiver, fordi arbeidsgiveren'
        : 'Jeg skal godkjenne på vegne av arbeidsgiver';

    const [klarerIkkeGiFaTilgang, setKlarerIkkeGiFaTilgang] = useState(false);
    const [vetIkkeHvemSomKanGiTilgang, setVetIkkeHvemSomKanGiTilgang] = useState(false);
    const [farIkkeTilgangPersonvern, setFarIkkeTilgangPersonvern] = useState(false);

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<string | undefined>();
    const [feilArbeidsgiverInformert, setFeilArbeidsgiverInformert] = useState<string | undefined>();
    const [arbeidsgiverInformert, setArbeidsgiverInformert] = useState(false);

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunn = klarerIkkeGiFaTilgang || vetIkkeHvemSomKanGiTilgang || farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunn) {
            setFeilmeldingGrunn('Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver');
            return;
        } else {
            setFeilmeldingGrunn(undefined);
        }
        if (!arbeidsgiverInformert) {
            setFeilArbeidsgiverInformert('Arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.');
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
                checked={props.skalGodkjennesPaVegne}
                onChange={(e) => {
                    props.setSkalGodkjennesPaVegne(e.currentTarget.checked);
                }}
            />

            {props.skalGodkjennesPaVegne && (
                <>
                    <div style={{ marginLeft: '2rem' }}>
                        <SkjemaGruppe feil={feilmeldingGrunn}>
                            <Checkbox
                                label="klarer ikke få eller gi tilgang"
                                checked={klarerIkkeGiFaTilgang}
                                onChange={(event) => setKlarerIkkeGiFaTilgang(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="vet ikke hvem som kan gi tilgang"
                                checked={vetIkkeHvemSomKanGiTilgang}
                                onChange={(event) => setVetIkkeHvemSomKanGiTilgang(event.currentTarget.checked)}
                            />
                            <Checkbox
                                label="får ikke tilgang på grunn av personvern"
                                checked={farIkkeTilgangPersonvern}
                                onChange={(event) => setFarIkkeTilgangPersonvern(event.currentTarget.checked)}
                            />
                        </SkjemaGruppe>
                    </div>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilArbeidsgiverInformert}>
                        <Checkbox
                            label="Arbeidsgiveren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={arbeidsgiverInformert}
                            onChange={() => setArbeidsgiverInformert(!arbeidsgiverInformert)}
                        />
                    </SkjemaGruppe>
                </>
            )}
            <VerticalSpacer rem={1} />

            {props.skalGodkjennesPaVegne && <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
            <VerticalSpacer rem={1} />
        </>
    );
};

export default GodkjennPaVegneAvArbeidsgiver;
