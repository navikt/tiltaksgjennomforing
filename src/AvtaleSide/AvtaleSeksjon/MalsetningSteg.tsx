import KnappBase from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Maalsetninger, Malkategori, Malsetning } from '../Avtale';
import { EndreAvtale } from '../EndreAvtale';
import StegProps from '../StegProps';

const MalsetningKnapp = (props: {
    kategori: Malkategori;
    leggTilKategori: (kategori: Malkategori) => void;
}) => (
    <KnappBase
        type={'standard'}
        onClick={() => props.leggTilKategori(props.kategori)}
    >
        {props.kategori}
    </KnappBase>
);

const MalsetningBeskrivelsePanel = (props: {
    malsetning: Malsetning;
    endreBeskrivelse: (malsetning: Malsetning) => void;
    fjern: (malsetning: Malsetning) => void;
}) => (
    <div>
        <Undertittel>{props.malsetning.kategori}</Undertittel>
        <Lukknapp
            type={'standard'}
            onClick={() => props.fjern(props.malsetning)}
        >
            Fjern
        </Lukknapp>
        <Input
            label={'Beskrivelse'}
            defaultValue={props.malsetning.beskrivelse}
            onChange={(event: any) =>
                props.endreBeskrivelse({
                    kategori: props.malsetning.kategori,
                    beskrivelse: event.target.value,
                })
            }
        />
    </div>
);

const MalsetningSteg = (props: Maalsetninger & EndreAvtale & StegProps) => {
    const leggTilKategori = (kategori: Malkategori) => {
        const malsetninger = props.malsetninger;
        if (!malsetninger.find((m: Malsetning) => m.kategori === kategori)) {
            malsetninger.push({ kategori, beskrivelse: '' });
            props.endreVerdi('malsetninger', malsetninger);
        }
    };

    const fjernKategori = (malsetning: Malsetning) => {
        props.endreVerdi(
            'malsetninger',
            props.malsetninger.filter(
                (m: Malsetning) => m.kategori !== malsetning.kategori
            )
        );
    };

    const endreBeskrivelse = (malsetning: Malsetning) => {
        const malsetninger = props.malsetninger;
        const index = malsetninger.findIndex(
            (m: Malsetning) => m.kategori === malsetning.kategori
        );
        malsetninger[index] = malsetning;
        props.endreVerdi('malsetninger', malsetninger);
    };

    const beskrivelsesPaneler = props.malsetninger.map(
        (malsetning: Malsetning) => (
            <MalsetningBeskrivelsePanel
                key={malsetning.kategori}
                malsetning={malsetning}
                fjern={fjernKategori}
                endreBeskrivelse={endreBeskrivelse}
            />
        )
    );

    const kategorier: Malkategori[] = [
        'Avklaring',
        'Arbeidserfaring',
        'Oppnå fagbrev/kompetansebevis',
        'Språkopplæring',
        'Få jobb på arbeidstreningsplass',
    ];

    const kategoriKnapper = kategorier.map((kategori: Malkategori) => (
        <MalsetningKnapp
            key={kategori}
            kategori={kategori}
            leggTilKategori={leggTilKategori}
        />
    ));

    return (
        <PanelBase>
            {kategoriKnapper}
            {beskrivelsesPaneler}
        </PanelBase>
    );
};

export default MalsetningSteg;
