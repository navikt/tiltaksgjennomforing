import HendelseIkon from '@/komponenter/HendelseIkon';
import { Varsel } from '@/types/varsel';
import { formatterDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import moment from 'moment';
import React, { FunctionComponent } from 'react';

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
    return (
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
                {props.varsler.map((varsel, index) => (
                    <tr key={index} role="row">
                        <td role="cell" aria-labelledby="tidspunkt">
                            {formaterTid(varsel.tidspunkt)}
                        </td>
                        <td role="cell">
                            <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                    <HendelseIkon hendelse={varsel.hendelseType} />
                                </span>
                                {varsel.tekst}
                            </div>
                        </td>
                        <td role="cell" aria-labelledby="utført_av">
                            {storForbokstav(varsel.utførtAv)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VarselTabell;
