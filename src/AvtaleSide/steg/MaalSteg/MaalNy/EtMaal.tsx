import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { messages } from '@/messages';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useMål } from './maalUtils';

type Props = {
    maal: Maal;
};

const EtMaal: FunctionComponent<Props> = props => {
    const [endrerMaal, setEndrerMaal] = useState(false);

    const avtaleContext = useContext(AvtaleContext);
    const { ledigeMålkategorier } = useMål(avtaleContext.avtale.maal);

    const [beskrivelse, setBeskrivelse] = useState<string | undefined>(props.maal.beskrivelse);
    const [kategori, setKategori] = useState<Maalkategori>(props.maal.kategori);

    const sorteMaalkategorier = ledigeMålkategorier;
    sorteMaalkategorier.push(kategori);
    sorteMaalkategorier.sort();

    return (
        <Innholdsboks>
            {endrerMaal ? (
                <>
                    <Select
                        onChange={e => setKategori(e.currentTarget.value as Maalkategori)}
                        label="Hva er målet med arbeidstreningen?"
                        value={kategori}
                    >
                        {sorteMaalkategorier.map(kat => (
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
                        <Hovedknapp>Lagre</Hovedknapp>
                        <Flatknapp onClick={() => setEndrerMaal(false)} style={{ marginLeft: '1rem' }}>
                            Avbryt
                        </Flatknapp>
                    </div>
                </>
            ) : (
                <div>
                    <Undertittel>{messages[props.maal.kategori]}</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>Beskrivelse av mål</Normaltekst>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>{props.maal.beskrivelse}</Normaltekst>
                    <VerticalSpacer rem={1} />
                    <div style={{ borderTop: '1px solid #C6C2BF' }} />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <KnappMedIkon onClick={() => setEndrerMaal(true)} label="Endre" ikonType="blyant" />
                        <KnappMedIkon onClick={() => null} label="Slett" ikonType="soppelkasse" />
                    </div>
                </div>
            )}
        </Innholdsboks>
    );
};

export default EtMaal;
