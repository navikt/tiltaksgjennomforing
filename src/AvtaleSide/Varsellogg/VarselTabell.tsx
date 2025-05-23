import HendelseIkon from '@/komponenter/HendelseIkon';
import { Varsel } from '@/types/varsel';
import { formaterDato, tidSidenTidspunktEllerDato } from '@/utils/datoUtils';
import { storForbokstav } from '@/utils/stringUtils';
import { Table } from '@navikt/ds-react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { FunctionComponent, PropsWithChildren, useState } from 'react';

type Props = {
    varsler: Varsel[];
};

const UtgråetTekst: FunctionComponent<PropsWithChildren<{ grå: boolean; title?: string }>> = ({
    children,
    grå,
    title,
}) => (
    <span title={title} style={{ color: grå ? 'grey' : undefined, whiteSpace: 'pre-wrap' }}>
        {children}
    </span>
);

const VarselTabell: FunctionComponent<Props> = (props) => {
    const [komprimer, setKomprimer] = useState<string[]>(['']);

    const sortertListe = props.varsler
        .map((v) => ({ ...v, antallLike: 1, skjules: false }))
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {finnesMinstEnSomSkjules && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CheckboxGroup legend="" onChange={(value: any[]) => setKomprimer(value)}>
                        <Checkbox value="ikke_komprimer">Vis alle hendelser</Checkbox>
                    </CheckboxGroup>
                </div>
            )}
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col"> Tidspunkt </Table.HeaderCell>
                        <Table.HeaderCell scope="col"> Hendelse </Table.HeaderCell>
                        <Table.HeaderCell scope="col"> Utført av </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortertListe
                        .filter((v) => !v.skjules || komprimer.includes('ikke_komprimer'))
                        .map((varsel) => (
                            <Table.Row key={varsel.id} role="row">
                                <Table.DataCell role="cell" aria-labelledby="tidspunkt">
                                    <UtgråetTekst title={formaterDato(varsel.tidspunkt)} grå={varsel.skjules}>
                                        {tidSidenTidspunktEllerDato(varsel.tidspunkt)}
                                    </UtgråetTekst>
                                </Table.DataCell>
                                <Table.DataCell role="cell">
                                    <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                        <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                            <HendelseIkon hendelse={varsel.hendelseType} />
                                        </span>
                                        <UtgråetTekst grå={varsel.skjules}>{varsel.tekst}</UtgråetTekst>
                                    </div>
                                </Table.DataCell>
                                <Table.DataCell role="cell" aria-labelledby="utført_av">
                                    <UtgråetTekst grå={varsel.skjules}>{storForbokstav(varsel.utførtAv)}</UtgråetTekst>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default VarselTabell;
