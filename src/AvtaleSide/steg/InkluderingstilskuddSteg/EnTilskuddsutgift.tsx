import ValutaInput from '@/komponenter/form/ValutaInput';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { BodyShort, Button, Select } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift;
    slett: () => void;
    endre: (beløp: number, type: InkluderingstilskuddsutgiftType) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
    skalKunneSlette: boolean;
};

const EnTilskuddsutgift: FunctionComponent<Props> = (props) => {
    const [endrerTilskuddsutgift, setEndrerTilskuddsutgift] = useState(false);

    const [beløp, setBeløp] = useState<number>(props.tilskuddsutgift.beløp);
    const [type, setType] = useState<InkluderingstilskuddsutgiftType>(props.tilskuddsutgift.type);

    const slettTilskuddsutgift = () => {
        props.slett();
    };
    const endreTilskuddsutgift = () => {
        props.endre(beløp, type);
        props.setIRedigeringsmodus(false);
        setEndrerTilskuddsutgift(false);
    };

    const kanUtgiftSlettes = () => {
        if (props.skalKunneSlette) {
            return true;
        } else {
            return props.tilskuddsutgift.id === undefined;
        }
    };

    return (
        <>
            {endrerTilskuddsutgift ? (
                <>
                    <Select
                        onChange={(e) => setType(e.currentTarget.value as InkluderingstilskuddsutgiftType)}
                        label="Velg hva tilskuddet er knyttet til:"
                        value={type}
                    >
                        <option value={type}>{inkluderingstilskuddtypeTekst[type]}</option>
                        {props.ledigeInkluderingstilskuddtyper.sort().map((type) => (
                            <option key={type} value={type}>
                                {inkluderingstilskuddtypeTekst[type]}
                            </option>
                        ))}
                    </Select>
                    <VerticalSpacer rem={1} />
                    <ValutaInput
                        name="beløp"
                        width="M"
                        label="Kostnadsoverslag"
                        value={beløp}
                        onChange={(event) => setBeløp(parseFloat(event.target.value))}
                        min={0}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <Button variant="primary" onClick={endreTilskuddsutgift}>
                            Ok
                        </Button>
                        <Button
                            variant="tertiary"
                            onClick={() => {
                                setEndrerTilskuddsutgift(false);
                                props.setIRedigeringsmodus(false);
                            }}
                            style={{ marginLeft: '1rem' }}
                        >
                            Avbrytrett
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <tr>
                        <td>
                            <BodyShort size="small">
                                {inkluderingstilskuddtypeTekst[props.tilskuddsutgift.type]}
                            </BodyShort>
                        </td>
                        <td>
                            <BodyShort size="small">{formatterPenger(props.tilskuddsutgift.beløp)}</BodyShort>
                        </td>
                        <td>
                            {kanUtgiftSlettes() && (
                                <KnappMedIkon onClick={slettTilskuddsutgift} label="Slett" ikonType="soppelkasse" />
                            )}
                        </td>
                    </tr>
                    {props.iRegideringsmodus !== true && <div style={{ display: 'flex' }}></div>}
                </>
            )}
        </>
    );
};

export default EnTilskuddsutgift;
