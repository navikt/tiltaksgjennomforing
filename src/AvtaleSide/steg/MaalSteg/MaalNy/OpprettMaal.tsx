import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { messages } from '@/messages';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    målListe: Maal[];
    leggTilMål: (beskrivelse: string, kategori: Maalkategori) => void;
    ledigeMålkategorier: Maalkategori[];
};

const OpprettMaal: FunctionComponent<Props> = props => {
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
        props.setIRedigeringsmodus!(false);
        setBeskrivelse(undefined);
        setKategori(undefined);
    };

    return (
        <Innholdsboks>
            <Systemtittel>Opprett mål</Systemtittel>
            <VerticalSpacer rem={2} />

            {leggertilMål ? (
                <div>
                    <Select
                        onChange={e => setKategori(e.currentTarget.value as Maalkategori)}
                        label="Hva er målet med arbeidstreningen?"
                    >
                        <option value="">Velg mål</option>
                        {props.ledigeMålkategorier.sort().map(kat => (
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
                        settVerdi={verdi => setBeskrivelse(verdi)}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <Hovedknapp onClick={lagreMål}>Lagre mål</Hovedknapp>
                        <Flatknapp
                            style={{ marginLeft: '1rem' }}
                            onClick={() => {
                                props.setIRedigeringsmodus!(false);
                                setLeggertilMål(false);
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
                        props.setIRedigeringsmodus!(true);
                        setLeggertilMål(true);
                    }}
                >
                    + Legg til nytt mål
                </Knapp>
            )}
        </Innholdsboks>
    );
};

export default OpprettMaal;
