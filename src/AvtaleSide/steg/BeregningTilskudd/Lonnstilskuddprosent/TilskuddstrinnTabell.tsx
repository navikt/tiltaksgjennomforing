import { useAvtale } from '@/AvtaleProvider';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import { Table } from '@navikt/ds-react';
import { formaterProsent } from '@/utils/formaterProsent';
import { visPeriodeForTiltak } from '@/utils/datoUtils';
import { Avtale } from '@/types';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const getSatsIkkeSatt = (avtale: Avtale, erNavAnsatt: boolean) => {
    switch (avtale.tiltakstype) {
        case 'MIDLERTIDIG_LONNSTILSKUDD':
            return '40 % eller 60 % settes av veileder';
        case 'SOMMERJOBB':
            return '50 % eller 75 % settes av veileder';
        default:
            return !erNavAnsatt ? 'Settes av veileder i Nav' : '–';
    }
};

const TilskuddstrinnTabell = () => {
    const { avtale } = useAvtale();
    const innloggetBruker = useInnloggetBruker();

    const erFirearigLts = avtale.tiltakstype === 'FIREARIG_LONNSTILSKUDD';
    const erNavAnsatt = innloggetBruker.erNavAnsatt;

    if (!avtale.gjeldendeInnhold.tilskuddstrinn.length) {
        return null;
    }

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Varighet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tilskuddsprosent</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {avtale.gjeldendeInnhold.tilskuddstrinn.map((trinn, i) => {
                        return (
                            <Table.Row key={`${trinn.start}-${trinn.slutt}-${i}`}>
                                <Table.DataCell>
                                    {i + 1}
                                    {erFirearigLts ? '. år' : '. periode'}
                                </Table.DataCell>
                                <Table.DataCell>{visPeriodeForTiltak(trinn.start, trinn.slutt)}</Table.DataCell>
                                <Table.DataCell>
                                    {trinn.prosent != null
                                        ? formaterProsent(trinn.prosent)
                                        : getSatsIkkeSatt(avtale, erNavAnsatt)}
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <VerticalSpacer rem={2} />
        </>
    );
};
export default TilskuddstrinnTabell;
