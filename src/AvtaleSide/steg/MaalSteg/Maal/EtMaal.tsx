import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { messages } from '@/messages';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { BodyShort, Heading, Button, Select } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    maal: Maal;
    slett: () => void;
    endre: (beskrivelse: string, kategori: Maalkategori) => void;
    ledigeMålkategorier: Maalkategori[];
};

const EtMaal: FunctionComponent<Props> = (props) => {
    const [endrerMaal, setEndrerMaal] = useState(false);

    const [beskrivelse, setBeskrivelse] = useState<string>(props.maal.beskrivelse);
    const [kategori, setKategori] = useState<Maalkategori>(props.maal.kategori);

    const sorteMaalkategorier = props.ledigeMålkategorier;
    sorteMaalkategorier.sort();

    const slettMål = () => {
        props.slett();
    };
    const endreMål = () => {
        props.endre(beskrivelse, kategori);
        props.setIRedigeringsmodus(false);
        setEndrerMaal(false);
    };

    return (
        <Innholdsboks>
            {endrerMaal ? (
                <>
                    <Select
                        onChange={(e) => setKategori(e.currentTarget.value as Maalkategori)}
                        label="Hva er målet med arbeidstreningen?"
                        value={kategori}
                    >
                        <option value={kategori}>{messages[kategori]}</option>
                        {sorteMaalkategorier.map((kat) => (
                            <option key={kat} value={kat}>
                                {messages[kat]}
                            </option>
                        ))}
                    </Select>
                    <VerticalSpacer rem={1} />
                    <PakrevdTextarea
                        label="Beskriv målet"
                        maxLengde={1000}
                        verdi={beskrivelse}
                        settVerdi={(verdi) => setBeskrivelse(verdi)}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <Button size="small" onClick={endreMål}>
                            Ok
                        </Button>
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => {
                                setEndrerMaal(false);
                                props.setIRedigeringsmodus(false);
                            }}
                            style={{ marginLeft: '1rem' }}
                        >
                            Avbryt
                        </Button>
                    </div>
                </>
            ) : (
                <div>
                    <Heading level="3" size="small">
                        {messages[props.maal.kategori]}
                    </Heading>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">Beskrivelse av mål</BodyShort>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">{props.maal.beskrivelse}</BodyShort>
                    <VerticalSpacer rem={1} />
                    <div style={{ borderTop: '1px solid #C6C2BF' }} />
                    <VerticalSpacer rem={1} />
                    {props.iRegideringsmodus !== true && (
                        <div style={{ display: 'flex' }}>
                            <KnappMedIkon
                                onClick={() => {
                                    setEndrerMaal(true);
                                    props.setIRedigeringsmodus(true);
                                }}
                                label="Endre"
                                ikonType="blyant"
                            />
                            <KnappMedIkon onClick={slettMål} label="Slett" ikonType="soppelkasse" />
                        </div>
                    )}
                </div>
            )}
        </Innholdsboks>
    );
};

export default EtMaal;
