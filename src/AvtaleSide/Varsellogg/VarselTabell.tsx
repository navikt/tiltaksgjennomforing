import HendelseIkon from '@/komponenter/HendelseIkon';
import { Varsel } from '@/types/varsel';
import { formatterDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { NedChevron, OppChevron } from 'nav-frontend-chevron';

type Props = {
    varsler: Varsel[];
};

const formaterTid = (tidspunkt: string) => {
    const antallTimerSiden = moment(moment()).diff(tidspunkt, 'hours');
    if (antallTimerSiden > 12) {
        return formatterDato(tidspunkt);
    } else {
        return moment(tidspunkt).fromNow();
    }
};

const VarselTabell: FunctionComponent<Props> = props => {
    const [komprimer, setKomprimer] = useState(true);

    const sortertListe = props.varsler
        .map(v => ({ ...v, antallLike: 1, skalSkjules: false }))
        .sort((a, b) => {
            if (a.tidspunkt < b.tidspunkt) {
                return -1;
            }
            if (a.tidspunkt > b.tidspunkt) {
                return 1;
            }
            return 0;
        });

    for (let i = 1; i < sortertListe.length; i++) {
        const forrigeVarsel = sortertListe[i - 1];
        const gjeldendeVarsel = sortertListe[i];

        if (
            forrigeVarsel.hendelseType === gjeldendeVarsel.hendelseType &&
            forrigeVarsel.utførtAv === gjeldendeVarsel.utførtAv
        ) {
            gjeldendeVarsel.antallLike = forrigeVarsel.antallLike + 1;
            forrigeVarsel.skalSkjules = true;
        }
    }

    return (
        <>
            {/*<Knapp onClick={() => setKomprimer(!komprimer)}>Vis alt</Knapp>*/}
            <table className="tabell" aria-label="tabell" aria-labelledby="Varsellogg tabell" role="table">
                <thead>
                    <tr role="row">
                        <th scope="col" role="columnheader" id="tidspunkt">
                            Tidspunkt
                        </th>
                        <th scope="col" role="columnheader" id="varsel">
                            Hendelse
                        </th>
                        <th scope="col" role="columnheader" id="utført_av">
                            Utført av
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortertListe
                        .filter(v => !v.skalSkjules || !komprimer)
                        .map((varsel, index) => (
                            <tr key={index} role="row">
                                <td role="cell" aria-labelledby="tidspunkt">
                                    {formaterTid(varsel.tidspunkt)}
                                </td>
                                <td role="cell">
                                    <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                        <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                            <HendelseIkon hendelse={varsel.hendelseType} />
                                        </span>
                                        {varsel.tekst} &nbsp;
                                        {varsel.antallLike > 1 && komprimer && (
                                            <em onClick={() => setKomprimer(!komprimer)}>
                                                ({varsel.antallLike} ganger <OppChevron />)
                                            </em>
                                        )}
                                        {varsel.antallLike > 1 && !varsel.skalSkjules && !komprimer && (
                                            <em onClick={() => setKomprimer(!komprimer)}>
                                                (Skjul like hendelser <NedChevron />)
                                            </em>
                                        )}
                                    </div>
                                </td>
                                <td role="cell" aria-labelledby="utført_av">
                                    {storForbokstav(varsel.utførtAv)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default VarselTabell;
