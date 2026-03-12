import { useAvtale } from '@/AvtaleProvider';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { Heading, Table } from '@navikt/ds-react';
import React from 'react';
import { BEMWrapper } from '@/utils/bem';
import { formaterProsent } from '@/utils/formaterProsent';
import { formaterPeriode } from '@/utils/datoUtils';

interface Props {
    cls: BEMWrapper;
}

const KvalifiseringsgruppeSats = (props: Props) => {
    const { cls } = props;
    const { avtale, settOgKalkulerBeregningsverdier } = useAvtale();
    const innloggetBruker = useInnloggetBruker();

    const erVarigLts = avtale.tiltakstype === 'VARIG_LONNSTILSKUDD';
    const erFirearigLts = avtale.tiltakstype === 'FIREARIG_LONNSTILSKUDD';

    if (innloggetBruker.erNavAnsatt && erVarigLts) {
        return (
            <div className={cls.element('kvalifiseringsgruppe')}>
                <div className={cls.element('tilskuddsprosent')}>
                    <Heading level="2" size="small" className={cls.element('tilskuddsprosent-heading')}>
                        Tilskuddsprosent
                    </Heading>
                    <ProsentInput
                        name="lonnstilskuddProsent"
                        width="S"
                        label=""
                        value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settOgKalkulerBeregningsverdier({
                                lonnstilskuddProsent: parseInt(event.target.value, 10),
                            });
                        }}
                        min={0}
                        max={75}
                    />
                </div>
            </div>
        );
    }

    if (avtale.gjeldendeInnhold.tilskuddstrinn.length) {
        return (
            <Table className={cls.element('tilskuddsprosent')}>
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
                            <Table.Row key={trinn.prosent}>
                                <Table.HeaderCell>
                                    {i + 1}
                                    {erFirearigLts ? '. år' : '. periode'}
                                </Table.HeaderCell>
                                <Table.DataCell>{formaterPeriode(trinn.start, trinn.slutt)}</Table.DataCell>
                                <Table.DataCell>{formaterProsent(trinn.prosent)}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        );
    }

    switch (avtale.tiltakstype) {
        case 'VARIG_LONNSTILSKUDD':
            return <>Her kan NAV sette en sats.</>;
        case 'MIDLERTIDIG_LONNSTILSKUDD':
            return <>Her kan NAV sette en sats på 40% eller 60%</>;
        case 'SOMMERJOBB':
            return <>Her kan NAV sette en sats på 50% eller 75%</>;
        default:
            return null;
    }
};
export default KvalifiseringsgruppeSats;
