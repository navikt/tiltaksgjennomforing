import React, {Dispatch, FunctionComponent, SetStateAction, useContext, useState} from "react";
import PakrevdInput from "@/komponenter/PakrevdInput/PakrevdInput";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import HorizontalSpacer from "@/komponenter/layout/HorizontalSpacer";
import BekreftelseModal from "@/komponenter/modal/BekreftelseModal";
import {AvtaleContext} from "@/AvtaleProvider";
import {TilskuddsPeriode} from "@/types/avtale";

interface Props {
    visAvslag: boolean;
    setVisAvslag: Dispatch<SetStateAction<boolean>>
    periode: TilskuddsPeriode;
}

const TilskuddsperiodeUbehandlet: FunctionComponent<Props> = ({ periode, visAvslag, setVisAvslag }: Props) => {
    const { avtale, godkjennTilskudd } = useContext(AvtaleContext);
    const { enhetOppfolging, enhetGeografisk } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState(false);
    const [enhetFeil, setEnhetFeil] = useState<string>();
    const [enhet, setEnhet] = useState(periode?.enhet || enhetOppfolging || enhetGeografisk || '');

    if(periode && periode.status !== 'UBEHANDLET') return null;

    return (
            <>
                <div>
                    <PakrevdInput
                        bredde="S"
                        label="Kostnadssted"
                        verdi={enhet}
                        settVerdi={(verdi) => setEnhet(verdi)}
                        maxLength={4}
                        feil={enhetFeil}
                    />
                    <VerticalSpacer rem={1} />
                    <Hovedknapp
                        onClick={() => {
                            if (!enhet.match(/\d{4}/)) {
                                setEnhetFeil('Enhet må bestå av 4 siffer');
                                return;
                            }
                            setGodkjennModalÅpen(true);
                        }}
                    >
                        Godkjenn
                    </Hovedknapp>
                    <HorizontalSpacer rem={1} />
                    <Knapp onClick={() => setVisAvslag(!visAvslag)}>Avslå</Knapp>

                </div>
                <BekreftelseModal
                    bekreftOnClick={async () => {
                        await godkjennTilskudd(enhet);
                        setGodkjennModalÅpen(false);
                    }}
                    modalIsOpen={godkjennModalÅpen}
                    oversiktTekst="Godkjenn tilskuddsperiode"
                    varselTekst="Du kan ikke gjøre endringer etter at du har godkjent tilskuddsperioden."
                    bekreftelseTekst="Godkjenn tilskuddsperiode"
                    avbrytelseTekst="Avbryt"
                    lukkModal={() => setGodkjennModalÅpen(false)}
                />
            </>
    )
}
export default TilskuddsperiodeUbehandlet;