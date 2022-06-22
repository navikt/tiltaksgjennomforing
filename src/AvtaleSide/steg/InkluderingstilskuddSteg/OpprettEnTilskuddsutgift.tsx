import ValutaInput from '@/komponenter/form/ValutaInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { inkluderingstilskuddtypeTekst, messages } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { Hovedknapp, Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift[];
    leggTilTilskuddsutgift: (beløp: number, type: InkluderingstilskuddsutgiftType) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
};

const OpprettEnTilskuddsutgift: FunctionComponent<Props> = (props) => {
    const [leggertilTilskuddsutgift, setLeggertilTilskuddsutgift] = useState(false);

    const [beløp, setBeløp] = useState<number | undefined>();
    const [type, setType] = useState<InkluderingstilskuddsutgiftType>();

    const leggTil = async () => {
        if (!beløp || !type) {
            //set en feil - noe mangler
            return;
        }
        props.leggTilTilskuddsutgift(beløp, type);
        setLeggertilTilskuddsutgift(false);
        props.setIRedigeringsmodus(false);
        setBeløp(undefined);
        setType(undefined);
    };

    return (
        <div>
            <Systemtittel>Opprett mål</Systemtittel>
            <VerticalSpacer rem={2} />

            {leggertilTilskuddsutgift ? (
                <div>
                    <Select
                        onChange={(e) => setType(e.currentTarget.value as InkluderingstilskuddsutgiftType)}
                        label="Hva er målet med arbeidstreningen?"
                    >
                        <option value="">Velg mål</option>
                        {props.ledigeInkluderingstilskuddtyper.map((type) => (
                            <option key={type} value={type}>
                                {inkluderingstilskuddtypeTekst[type]}
                            </option>
                        ))}
                    </Select>
                    <VerticalSpacer rem={1} />
                    <ValutaInput
                        name="beløp"
                        bredde="M"
                        label="Beløp"
                        value={beløp}
                        onChange={(event) => setBeløp(parseFloat(event.target.value))}
                        min={0}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <Hovedknapp onClick={leggTil}>Legg til utgift</Hovedknapp>
                        <Flatknapp
                            style={{ marginLeft: '1rem' }}
                            onClick={() => {
                                props.setIRedigeringsmodus(false);
                                setLeggertilTilskuddsutgift(false);
                            }}
                        >
                            Avbryt
                        </Flatknapp>
                    </div>
                </div>
            ) : (
                <Knapp
                    disabled={props.iRegideringsmodus}
                    onClick={() => {
                        props.setIRedigeringsmodus(false);
                        setLeggertilTilskuddsutgift(false);
                    }}
                >
                    + Legg til nytt mål
                </Knapp>
            )}
        </div>
    );
};

export default OpprettEnTilskuddsutgift;
