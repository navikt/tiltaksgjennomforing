import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { messages } from '@/messages';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { Heading, Button, Select } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigermodus: (iModus: boolean) => void;
    iRedigermodus: boolean;
    målListe: Maal[];
    leggTilMål: (beskrivelse: string, kategori: Maalkategori) => void;
    ledigeMålkategorier: Maalkategori[];
};

const OpprettMaal: FunctionComponent<Props> = (props) => {
    const [leggertilMål, setLeggertilMål] = useState(false);

    const [beskrivelse, setBeskrivelse] = useState<string | undefined>();
    const [kategori, setKategori] = useState<Maalkategori>();

    const lagreMål = async () => {
        if (!beskrivelse || !kategori) {
            //set en feil - noe mangler
            return;
        }
        props.leggTilMål(beskrivelse, kategori);
        setLeggertilMål(false);
        props.setIRedigermodus(false);
        setBeskrivelse(undefined);
        setKategori(undefined);
    };

    return (
        <div>
            <Heading level="2" size="medium">Opprett mål</Heading>
            <VerticalSpacer rem={2} />

            {leggertilMål ? (
                <div>
                    <Select
                        onChange={(e) => setKategori(e.currentTarget.value as Maalkategori)}
                        label="Hva er målet med arbeidstreningen?"
                    >
                        <option value="">Velg mål</option>
                        {props.ledigeMålkategorier.map((kat) => (
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
                        <Button size="small" onClick={lagreMål}>
                            Lagre mål
                        </Button>
                        <Button
                            size="small"
                            variant="tertiary"
                            style={{ marginLeft: '1rem' }}
                            onClick={() => {
                                props.setIRedigermodus(false);
                                setLeggertilMål(false);
                            }}
                        >
                            Avbryt
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    variant="secondary"
                    disabled={props.iRedigermodus}
                    onClick={() => {
                        props.setIRedigermodus(true);
                        setLeggertilMål(true);
                    }}
                >
                    + Legg til nytt mål
                </Button>
            )}
        </div>
    );
};

export default OpprettMaal;
