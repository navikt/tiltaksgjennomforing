import ValutaInput from '@/komponenter/form/ValutaInput';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import { ChangeEvent, FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift[];
    leggTilTilskuddsutgift: (beløp: number, type: InkluderingstilskuddsutgiftType) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
    totalBeløp: number;
};

const OpprettEnTilskuddsutgift: FunctionComponent<Props> = (props) => {
    const [leggertilTilskuddsutgift, setLeggertilTilskuddsutgift] = useState(false);

    const [beløp, setBeløp] = useState<number | undefined>();
    const [type, setType] = useState<InkluderingstilskuddsutgiftType>();
    const [beløpFeil, setBeløpFeil] = useState<string | undefined>();
    const [typeFeil, setTypeFeil] = useState<string | undefined>();

    const ÅRLIG_MAX_BELØP = 136700;
    const gjenståendeMaxBeløp = ÅRLIG_MAX_BELØP - props.totalBeløp;

    const leggTil = async () => {
        if (!type) {
            setTypeFeil('Vennligst velg en type utgift');
            return;
        } else {
            setTypeFeil(undefined);
        }
        if (!beløp) {
            // set en feil - noe mangler
            setBeløpFeil('Vennligst oppgi et kostnadsoverslag');
            return;
        }
        if (beløp > gjenståendeMaxBeløp) {
            setBeløpFeil(`Det totale beløpet overskrider det maksimale beløpet på ${formatterPenger(ÅRLIG_MAX_BELØP)}`);
            return;
        } else {
            setBeløp(undefined);
        }
        props.leggTilTilskuddsutgift(beløp, type);
        setLeggertilTilskuddsutgift(false);
        props.setIRedigeringsmodus(false);
        setBeløp(undefined);
        setType(undefined);
    };

    return (
        <div>
            <Systemtittel>Legg til utgift</Systemtittel>
            <VerticalSpacer rem={2} />

            {leggertilTilskuddsutgift ? (
                <div>
                    <Select
                        feil={typeFeil}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setType(e.currentTarget.value as InkluderingstilskuddsutgiftType);
                            setTypeFeil(undefined);
                        }}
                        label="Hva skal tilskuddet dekke?"
                    >
                        <option value="">Velg type utgift</option>
                        {props.ledigeInkluderingstilskuddtyper.map((currentType: InkluderingstilskuddsutgiftType) => (
                            <option key={currentType} value={currentType}>
                                {inkluderingstilskuddtypeTekst[currentType]}
                            </option>
                        ))}
                    </Select>
                    <VerticalSpacer rem={1} />
                    <ValutaInput
                        feil={beløpFeil}
                        name="beløp"
                        bredde="M"
                        label="Kostnadsoverslag"
                        value={beløp}
                        onChange={(event) => {
                            const value = parseFloat(event.target.value);
                            setBeløp(value);
                            setBeløpFeil(undefined);
                        }}
                        min={0}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        {/* <Hovedknapp onClick={leggTil}>Legg til utgift</Hovedknapp> */}
                        <LagreKnapp label="Legg til utgift" lagre={leggTil} />

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
                        props.setIRedigeringsmodus(true);
                        setLeggertilTilskuddsutgift(true);
                    }}
                >
                    + Legg til ny utgift
                </Knapp>
            )}
        </div>
    );
};

export default OpprettEnTilskuddsutgift;
