import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { messages } from '@/messages';
import { oppdatereMålInformasjon } from '@/services/rest-service';
import { Maalkategori } from '@/types/maalkategorier';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useMål } from './maalUtils';

type Props = {};

const OpprettMaal: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);

    const [leggertilMål, setLeggertilMål] = useState(false);

    const { ledigeMålkategorier, leggTilMål, målListe } = useMål(avtaleContext.avtale.maal);

    const [beskrivelse, setBeskrivelse] = useState<string | undefined>();
    const [kategori, setKategori] = useState<Maalkategori>();

    const lagreMål = async () => {
        if (!beskrivelse || !kategori) {
            //set en feil - noe mangler
            return;
        }
        leggTilMål(beskrivelse, kategori);
        //oppdatereMålInformasjon(avtaleContext.avtale, målListe).then(() => setLeggertilMål(false));
    };

    useEffect(() => {
        if (målListe.find(mal => mal.kategori === kategori)) {
            oppdatereMålInformasjon(avtaleContext.avtale, målListe).then(() => setLeggertilMål(false));
        }
    }, [målListe]);

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
                        {ledigeMålkategorier.sort().map(kat => (
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
                        <Flatknapp style={{ marginLeft: '1rem' }} onClick={() => setLeggertilMål(false)}>
                            Avbryt
                        </Flatknapp>
                    </div>
                </div>
            ) : (
                <Knapp onClick={() => setLeggertilMål(true)}>+ Legg til nytt mål</Knapp>
            )}
        </Innholdsboks>
    );
};

export default OpprettMaal;
