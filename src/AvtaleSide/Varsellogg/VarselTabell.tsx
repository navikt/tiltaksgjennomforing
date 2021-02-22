import HendelseIkon from '@/komponenter/HendelseIkon';
import { Varsel } from '@/types/varsel';
import { formatterDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { Checkbox } from 'nav-frontend-skjema';

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

const UtgråetTekst: FunctionComponent<{ grå: boolean }> = ({ children, grå }) => (
    <span style={{ color: grå ? 'grey' : undefined }}>{children}</span>
);

const VarselTabell: FunctionComponent<Props> = props => {
    const [komprimer, setKomprimer] = useState(true);

    const sortertListe = props.varsler
        .map(v => ({ ...v, antallLike: 1, skjules: false }))
        .sort((a, b) => {
            if (a.tidspunkt < b.tidspunkt) {
                return -1;
            }
            if (a.tidspunkt > b.tidspunkt) {
                return 1;
            }
            return 0;
        });

    let finnesMinstEnSomSkjules = false;
    for (let i = 1; i < sortertListe.length; i++) {
        const forrigeVarsel = sortertListe[i - 1];
        const gjeldendeVarsel = sortertListe[i];

        if (
            forrigeVarsel.hendelseType === gjeldendeVarsel.hendelseType &&
            forrigeVarsel.utførtAv === gjeldendeVarsel.utførtAv
        ) {
            gjeldendeVarsel.antallLike = forrigeVarsel.antallLike + 1;
            forrigeVarsel.skjules = true;
            finnesMinstEnSomSkjules = true;
        }
    }

    return (
        <>
            {finnesMinstEnSomSkjules && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Checkbox
                        label="Vis alle hendelser"
                        checked={!komprimer}
                        onClick={() => setKomprimer(!komprimer)}
                    />
                </div>
            )}
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
                        .filter(v => !v.skjules || !komprimer)
                        .map(varsel => (
                            <tr key={varsel.id} role="row">
                                <td role="cell" aria-labelledby="tidspunkt">
                                    <UtgråetTekst grå={varsel.skjules}>{formaterTid(varsel.tidspunkt)}</UtgråetTekst>
                                </td>
                                <td role="cell">
                                    <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                        <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                            <HendelseIkon hendelse={varsel.hendelseType} />
                                        </span>
                                        <UtgråetTekst grå={varsel.skjules}>{varsel.tekst}</UtgråetTekst>
                                    </div>
                                </td>
                                <td role="cell" aria-labelledby="utført_av">
                                    <UtgråetTekst grå={varsel.skjules}>{storForbokstav(varsel.utførtAv)}</UtgråetTekst>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default VarselTabell;
